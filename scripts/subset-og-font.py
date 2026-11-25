"""
Builds the Japanese font files used by the social share image
(assets/fonts/m-plus-rounded-1c/), so `next build` never needs the network.

Source: the M PLUS Rounded 1c files that next/font already self-hosts after a
build (.next/static/media, mapped through .next/static/css). The font is under
the SIL Open Font License 1.1 with no Reserved Font Name, so a subset may be
redistributed with the licence (OFL.txt) and its copyright notice, which this
script keeps in the font's name table.

The subset covers ASCII, Latin-1 (accented letters, ñ, ¿ ¡: used by
the Spanish blog social card), Japanese punctuation, full-width forms, all kana and
every character in messages/ja.json. lib/social-image.tsx refuses to render
text containing a character outside coverage.txt, so after adding new kanji
to the Japanese share-image copy, run (after `npm run build`):

    python3 scripts/subset-og-font.py

Requires: pip install fonttools brotli
"""

import glob
import json
import os
import re
import sys

from fontTools.merge import Merger
from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "fonts", "m-plus-rounded-1c")
WEIGHTS = {"400": "Regular", "700": "Bold"}


def message_chars():
    with open(os.path.join(ROOT, "messages", "ja.json"), encoding="utf-8") as f:
        data = json.load(f)
    chars = set()

    def walk(value):
        if isinstance(value, dict):
            for v in value.values():
                walk(v)
        elif isinstance(value, list):
            for v in value:
                walk(v)
        elif isinstance(value, str):
            chars.update(value)

    walk(data)
    return chars


def required_codepoints():
    cps = set(range(0x20, 0x7F))  # ASCII
    cps |= set(range(0xA1, 0x100))  # Latin-1 (accents, ñ, ¿ ¡) for es/fr/de blog cards
    cps |= set(range(0x3000, 0x3040))  # CJK symbols and punctuation
    cps |= set(range(0x3041, 0x3100))  # hiragana + katakana
    cps |= set(range(0xFF01, 0xFF5F))  # full-width ASCII forms
    cps |= {0x00A0, 0x00A9, 0x2014, 0x2026, 0x2018, 0x2019, 0x201C, 0x201D, 0x30FB}
    cps |= {ord(c) for c in message_chars() if c not in "\n"}
    return cps


def slices_by_weight():
    faces = {}
    for css in glob.glob(os.path.join(ROOT, ".next", "static", "css", "*.css")):
        for block in re.findall(r"@font-face\{([^}]*)\}", open(css, encoding="utf-8").read()):
            family = re.search(r"font-family:([^;]+)", block)
            weight = re.search(r"font-weight:\s*(\d+)", block)
            src = re.search(r"url\(/_next/static/media/([^)]+)\)", block)
            if family and "PLUS" in family.group(1) and weight and src:
                faces.setdefault(weight.group(1), []).append(
                    os.path.join(ROOT, ".next", "static", "media", src.group(1))
                )
    return faces


def build(weight, files, codepoints):
    options = Options()
    options.layout_features = []  # the image renderer needs plain glyphs only
    options.name_IDs = ["*"]  # keep copyright, version and licence records
    options.notdef_outline = True
    parts = []
    for i, path in enumerate(sorted(files)):
        font = TTFont(path)
        present = codepoints & set(font.getBestCmap())
        if not present:
            continue
        subsetter = Subsetter(options)
        subsetter.populate(unicodes=present)
        subsetter.subset(font)
        font.flavor = None
        part = os.path.join(OUT_DIR, f".part-{weight}-{i}.ttf")
        font.save(part)
        parts.append(part)
    merged = Merger().merge(parts)
    for part in parts:
        os.remove(part)
    out = os.path.join(OUT_DIR, f"MPlusRounded1c-{WEIGHTS[weight]}.subset.ttf")
    merged.save(out)
    return out, set(merged.getBestCmap())


def main():
    faces = slices_by_weight()
    if not all(w in faces for w in WEIGHTS):
        sys.exit("No M PLUS Rounded 1c files in .next. Run `npm run build` first.")
    os.makedirs(OUT_DIR, exist_ok=True)
    wanted = required_codepoints()
    covered = None
    for weight in WEIGHTS:
        out, cps = build(weight, faces[weight], wanted)
        covered = cps if covered is None else covered & cps
        print(f"{os.path.relpath(out, ROOT)}: {len(cps)} characters, {os.path.getsize(out) // 1024} KB")
    missing = sorted(cp for cp in wanted - covered if cp >= 0x80)
    if missing:
        print("Not in the font (left out):", "".join(chr(cp) for cp in missing if cp > 0x20))
    with open(os.path.join(OUT_DIR, "coverage.txt"), "w", encoding="utf-8") as f:
        f.write("".join(chr(cp) for cp in sorted(covered) if cp >= 0x20))


if __name__ == "__main__":
    main()
