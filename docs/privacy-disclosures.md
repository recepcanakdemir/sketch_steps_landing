# Website analytics: privacy disclosures to add (for the site owner)

> **Status: draft for review, not published.** Nothing here changes the live
> privacy policy. The site owner (and legal counsel where needed) must review
> and approve the wording before it is published.

## Current situation

- The consent banner and the site footer link to the Sketch Steps privacy
  policy on Notion ("Last updated: April 29, 2026").
- That policy covers **only the mobile app**. It does not mention the
  website (sketchsteps.app), Google Analytics 4, cookies, the consent banner,
  or how to withdraw consent.
- It lists the contact address `landmarkaiguide@gmail.com`; the website lists
  `support@sketchsteps.app`.

## Required disclosures

Add a "Website" section to the policy, or a separate website/cookie policy
linked from the banner, covering:

1. **Scope.** The policy applies to the website sketchsteps.app, in addition
   to the apps.
2. **Controller and contact.** Who is responsible for the website, and one
   consistent contact address for privacy requests.
3. **Google Analytics 4.**
   - Used only if the visitor clicks Accept in the cookie banner.
   - Provider: Google (Google Ireland Ltd. / Google LLC), acting as
     processor; link to Google's privacy policy.
   - Purpose: measuring visits, traffic sources, language versions and
     clicks on the App Store / Google Play buttons.
   - Data collected: pages viewed, referrer and campaign parameters (utm_*,
     gclid, fbclid, ttclid), device, browser and approximate location derived
     by Google, and these events: store button clicks, language changes,
     interactions with the drawing demo. No names, emails or account data.
   - Settings: Google signals and ad personalization are off; consent mode
     denies all advertising storage and use; GA4 does not log or store full
     IP addresses.
   - Retention: the data retention period configured in the GA4 property
     (to be set by the owner, e.g. 2 or 14 months).
   - International transfers: Google may process data in the USA (EU-US Data
     Privacy Framework / standard contractual clauses).
4. **Legal basis.** Consent (GDPR art. 6(1)(a); ePrivacy rules for cookies),
   and the equivalent opt-in for the UK and Switzerland.
5. **Cookies and similar storage.**
   | Name | Type | Purpose | Duration | Set when |
   |---|---|---|---|---|
   | `_ga` | Cookie (Google) | Distinguishes visitors for GA4 | about 2 years | After Accept |
   | `_ga_<ID>` | Cookie (Google) | Keeps GA4 session state | about 2 years | After Accept |
   | `sketchsteps.consent` | Local storage | Remembers Accept / Reject | Until cleared | When the visitor chooses |
   | `sketchsteps.locale` | Local storage | Remembers a language picked in the language switcher | Until cleared | When the visitor picks a language |
6. **Vercel Analytics.** Cookieless page view statistics from the hosting
   provider (Vercel); describe what it collects and the legal basis
   (typically legitimate interest; owner to confirm).
7. **Choices and withdrawal.** The "Cookie settings" link (on every page)
   reopens the banner. Rejecting or withdrawing stops GA4 and deletes its
   cookies. Visitors can also clear cookies and site data in their browser.
8. **Rights.** Access, deletion, objection, withdrawal of consent, complaint
   to a supervisory authority; how to exercise them.
9. **Changes.** Update the "Last updated" date when the website section is
   added.

## Before launch, the owner should also

- Set the GA4 data retention period (Admin → Data collection and
  modification → Data retention) and mention it in the policy.
- Confirm Google's data processing terms are accepted in the GA4 account.
- Decide on one contact address for privacy requests.
