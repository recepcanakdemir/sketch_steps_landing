#!/usr/bin/env python3
"""SEO checks on a finished production build (`next build`).

    npx next build && python3 scripts/check-seo.py

Reads the static HTML and sitemap in .next/server/app (no server, no network)
and checks every built page:

- exactly one <h1>; a <title> and a meta description;
- a canonical URL on the production domain;
- every JSON-LD block parses;
- every <img> has an alt attribute; no raw message keys ("Home.") in the text;
- hreflang: each link points to a built, indexable page that links back;
- sitemap: lists exactly the indexable, self-canonical pages (no noindex
  pages, no drafts, no fixtures); blog URLs carry a <lastmod>;
- blog articles: BlogPosting + BreadcrumbList, no FAQPage, headline = <h1>,
  og:image and twitter:image present, no draft or fixture banner.

Exits with status 1 and a list of issues if anything fails. Standard library
only. See docs/DEPLOYMENT-CHECKLIST.md.
"""
import glob
import html
import json
import re
import sys

BASE = ".next/server/app"
ORIGIN = "https://sketchsteps.app"
issues = []


def first(text, pattern):
    m = re.search(pattern, text, re.S)
    return html.unescape(m.group(1)) if m else None


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


pages = {}
for f in glob.glob(BASE + "/**/*.html", recursive=True):
    rel = f[len(BASE):]
    if "_not-found" in rel or rel.endswith("_global-error.html"):
        continue
    with open(f, encoding="utf-8") as fh:
        pages[rel] = fh.read()
if not pages:
    sys.exit(f"No built pages in {BASE}. Run `npx next build` first.")

info = {}
for rel, t in sorted(pages.items()):
    title = first(t, r"<title>(.*?)</title>")
    desc = first(t, r'<meta name="description" content="([^"]*)"')
    canon = first(t, r'<link rel="canonical" href="([^"]*)"')
    robots = first(t, r'<meta name="robots" content="([^"]*)"') or ""
    hreflang = dict(re.findall(r'<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"', t))
    h1s = re.findall(r"<h1[\s>].*?</h1>", t, re.S)
    nodes = []
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        try:
            data = json.loads(block)
            nodes += data.get("@graph", [data]) if isinstance(data, dict) else data
        except ValueError as e:
            issues.append(f"{rel}: JSON-LD does not parse ({e})")
    info[rel] = dict(canon=canon, robots=robots, hreflang=hreflang, nodes=nodes)

    if len(h1s) != 1:
        issues.append(f"{rel}: {len(h1s)} <h1> elements")
    if not title:
        issues.append(f"{rel}: no <title>")
    if not desc:
        issues.append(f"{rel}: no meta description")
    if not canon or not canon.startswith(ORIGIN):
        issues.append(f"{rel}: canonical missing or off-domain ({canon})")
    if re.search(r"<img(?![^>]*\balt=)[^>]*>", t):
        issues.append(f"{rel}: <img> without alt")
    if "Home." in re.sub(r"<script.*?</script>", "", t, flags=re.S):
        issues.append(f"{rel}: raw message key in the page")

    if re.search(r"/blog/[^/]+\.html$", rel):
        types = {n.get("@type") for n in nodes}
        for needed in ("BlogPosting", "BreadcrumbList"):
            if needed not in types:
                issues.append(f"{rel}: no {needed} JSON-LD")
        if "FAQPage" in types:
            issues.append(f"{rel}: unexpected FAQPage JSON-LD")
        post = next((n for n in nodes if n.get("@type") == "BlogPosting"), {})
        if h1s and post.get("headline") != strip_tags(h1s[0]):
            issues.append(f"{rel}: BlogPosting headline differs from the <h1>")
        if post.get("url") != canon:
            issues.append(f"{rel}: BlogPosting url differs from the canonical")
        for prop in ('property="og:image"', 'name="twitter:image"'):
            if prop not in t:
                issues.append(f"{rel}: no {prop}")
        if "Local draft preview" in t or "local fixture" in t.lower():
            issues.append(f"{rel}: draft or fixture banner in a production build")

    print(f"{rel:42} h1={len(h1s)} title={len(title or '')} desc={len(desc or '')} "
          f"robots={robots or '-'} hreflang={','.join(sorted(hreflang)) or '-'}")

# Indexable, self-canonical pages (the ones that belong in the sitemap).
indexable = {}
for rel, i in info.items():
    if "noindex" in i["robots"] or not i["canon"]:
        continue
    if indexable.get(i["canon"]):  # a second page with the same canonical (e.g. /instagram)
        continue
    indexable[i["canon"]] = rel

for rel, i in info.items():
    if "noindex" in i["robots"]:
        continue
    for lang, url in i["hreflang"].items():
        target = indexable.get(url)
        if target is None:
            issues.append(f"{rel}: hreflang {lang} -> {url} is not a built, indexable page")
        elif i["canon"] not in info[target]["hreflang"].values():
            issues.append(f"{rel}: hreflang {lang} -> {url} has no return link")

try:
    with open(BASE + "/sitemap.xml.body", encoding="utf-8") as fh:
        sitemap = fh.read()
except FileNotFoundError:
    sitemap = ""
    issues.append("sitemap.xml.body not found in the build")
entries = re.findall(r"<url>(.*?)</url>", sitemap, re.S)
locs = []
for e in entries:
    loc = first(e, r"<loc>(.*?)</loc>")
    locs.append(loc)
    if "/blog" in (loc or "") and "<lastmod>" not in e:
        issues.append(f"sitemap: {loc} has no <lastmod>")
for loc in locs:
    if loc not in indexable:
        issues.append(f"sitemap: {loc} is not a built, indexable, self-canonical page")
    if "fixture-" in (loc or ""):
        issues.append(f"sitemap: fixture URL {loc}")
for url in indexable:
    if url not in locs:
        issues.append(f"sitemap: indexable page {url} is missing")
print(f"\nsitemap: {len(locs)} URLs")
for loc in locs:
    print("  ", loc)

if issues:
    print("\nISSUES:")
    for i in issues:
        print(" -", i)
    sys.exit(1)
print("\nISSUES: none")
