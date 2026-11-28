# SSE operations and handover

Status date: **28 November 2026**. The production site is on Vercel; the catalogue and contact links are available. Quotation email delivery remains the principal unfinished integration. Read the [developer guide](DEVELOPER_GUIDE.md) for code-level behavior.

## Accounts and access

| Resource | Handover reference |
| --- | --- |
| Source | [github.com/Anu062004/sse](https://github.com/Anu062004/sse), `main` |
| Hosting | Vercel project `sse`, team slug `anubhavs-projects-cfe85683` |
| Public site | [sse-rosy.vercel.app](https://sse-rosy.vercel.app) |
| Business email in code | `mavi_65@yahoo.in`; confirm with the owner before activating quote delivery |
| Email service | Resend integration exists in source; credentials and sender remain to be configured |
| Domain registrar | Not established in this handover; the owner has discussed purchasing a domain separately |

A new maintainer needs repository access and access to the correct Vercel team/project. Email setup also needs the owner's chosen provider account and, for the Resend path, DNS access to a domain the owner controls. Transfer access through account invitations or an approved secret manager, not through committed files. `.vercel/` is ignored local project linkage and is not present in a fresh clone.

## Environment configuration

| Variable | Used by | Current fallback and setup |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Metadata, canonical URLs, sitemap and structured data | Defaults to `https://sse-rosy.vercel.app`; set to the final canonical origin when a custom domain is connected |
| `NEXT_PUBLIC_CONTACT_PHONE` | Footer, calls, WhatsApp and business schema | Required for usable contact links; missing/blank value becomes an all-zero placeholder |
| `RESEND_API_KEY` | Server-side quote API | Missing value returns `503`; keep secret and never prefix with `NEXT_PUBLIC_` |
| `QUOTE_TO_EMAIL` | Recipient of quote emails | Defaults to `site.email`, currently the business Yahoo address |
| `QUOTE_FROM_EMAIL` | Sender of quote emails | Defaults to `SSE Website <onboarding@resend.dev>`, a testing sender; configure an address on the verified sending domain for production |

Vercel environment names were checked at handover: only `NEXT_PUBLIC_CONTACT_PHONE` was configured, across Production, Preview and Development. Local `.env.local` also contained only the phone variable. `.env.example` is a template, not evidence that any setting is deployed.

`NEXT_PUBLIC_` values are public build configuration. Updating them requires rebuilding and redeploying; restarting a browser does not rewrite an old deployment. Server secrets must also be applied to a new deployment before relying on the updated configuration. Restart the local dev server after changing `.env.local`. See [Vercel environment variables](https://vercel.com/docs/environment-variables) for the current deployment and environment-scope rules.

Use Vercel's environment settings or the CLI. `vercel env ls` lists configuration without needing to print secret values. `vercel env pull .env.local` can replace local settings; preserve any local overrides first. Keep preview/test quote delivery directed to a test inbox so preview traffic does not create real sales enquiries.

## Deployment workflow

Vercel builds this as a Next.js application. Do not replace it with a static export: `/api/quote` needs a server runtime. There is no checked-in CI workflow or `vercel.json`; inspect project settings before assuming a particular Git-triggered deployment policy.

1. Pull the current branch and inspect `git status` before editing. Work on a branch when appropriate.
2. Install with `npm ci`; review code/data and environment changes together. Keep secrets out of the diff.
3. Run the relevant [release checks](#release-checks), then commit and push the reviewed changes.
4. Confirm the Vercel project is linked to the intended repository and production branch. If Git integration is enabled, inspect the deployment triggered by the push rather than assuming it succeeded.
5. For an environment-only change, rebuild the current deployed source with the command below. This does not deploy uncommitted local source changes.
6. Wait for Ready, verify the production alias and check the affected live journey. An accepted build is not an inbox-delivery test.

```sh
vercel env ls
vercel inspect https://sse-rosy.vercel.app
vercel redeploy https://sse-rosy.vercel.app --target production
```

On a new workstation, authenticate with `vercel login` and use `vercel link` to select the **existing** `sse` project in the correct team. Do not create a second production project accidentally. The CLI is not a project dependency; install/use the organization's approved CLI version separately.

For rollback, identify the last healthy deployment in Vercel and use its rollback/promotion workflow, then verify the alias. Older deployments contain their old build-time values: rolling back to a version before the phone fix can restore the zero-number links. Reconcile source and environment settings before the next release.

## WhatsApp fix

On 28 November 2026, the live site displayed and linked to an all-zero contact number. The real number existed in `.env.local` but Vercel had no environment variables. `lib/site.ts` therefore supplied its placeholder to every shared contact link.

The fix added the owner's provided international number as `NEXT_PUBLIC_CONTACT_PHONE` in Vercel Production, Preview and Development, then redeployed the existing production source. It required **no source-code change or Git commit**. A subsequent `git push origin main` reported everything up to date.

Live HTML was checked on `/`, `/contact`, `/quote` and `/products`: the footer number, all rendered WhatsApp destinations, floating WhatsApp button and call links matched the configured number. This checked rendered destinations, not delivery of a WhatsApp message. The exact business number remains in Vercel and the ignored local environment file rather than being duplicated here.

When this symptom reappears, inspect the relevant environment scope and deployment age first. The link helper is shared, so a missing build setting affects many buttons at once. Include the country code; stripping punctuation does not add one automatically.

## Activate quotation emails

The owner wants a submitted enquiry emailed to the business. The existing form already sends to `/api/quote`, which uses Resend. No customer confirmation email, quote PDF, inbox tracking or stored enquiry dashboard is implemented.

### Resend with an owned domain

This is the continuation of the existing integration. The website can remain hosted on Vercel while the owner buys a domain from a separate registrar. Connecting that domain to the website and verifying it for email are separate configuration tasks. The Vercel-provided `sse-rosy.vercel.app` address cannot serve as an owned Resend sending domain because the owner cannot publish the necessary DNS records for `vercel.app`.

1. Confirm the receiving owner email and who controls the Resend account and domain DNS.
2. Add the owned sending domain or subdomain in Resend and publish the exact verification records it provides. Preserve existing mail records used by other services.
3. Create a sending API key and save it privately as `RESEND_API_KEY` in Vercel. Set `QUOTE_FROM_EMAIL` to an address on the verified domain and `QUOTE_TO_EMAIL` to the agreed inbox. A Yahoo inbox can receive these emails; it does not need to be the sending domain.
4. Redeploy. Submit one clearly labelled test enquiry to an agreed test recipient, including a customer email you control. Check the provider event status and the recipient inbox/spam folder, then verify replying targets the customer.
5. Also test an enquiry without customer email, invalid fields, a provider failure and a missing key in a local/test environment. Confirm failure never displays “Request sent.”
6. Set the agreed production recipient, redeploy if it changed, and complete an owner-approved delivery check before marking this feature active.

The provider's free tier was discussed because expected traffic is low. Consult [Resend pricing](https://resend.com/pricing) and [account limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits) before activation rather than treating a historical allowance as a permanent guarantee. Each current successful form submission sends one email to one recipient. See the [Next.js integration guide](https://resend.com/docs/send-with-nextjs) and [testing-domain restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

### Alternative without buying a domain

[FormSubmit](https://formsubmit.co/) was discussed as a possible free form-to-email service. It has **not** been selected or integrated. Switching requires an implementation change, recipient activation and end-to-end testing; adding Resend environment variables does not enable FormSubmit. Review spam protection, privacy, current service limits and CSP requirements before changing the existing submission flow.

### Connect a custom website domain

After purchase, add the domain to the existing Vercel project and use the DNS values Vercel displays. Choose the primary hostname and redirect the alternative hostname consistently. Once DNS and HTTPS work, set `NEXT_PUBLIC_SITE_URL` to that primary HTTPS origin and rebuild. Verify canonical tags, social URLs, sitemap and robots output. The example domain in `.env.example` is not a configured domain and must not be adopted without confirming ownership.

Vercel hosting and domain registration can remain with different providers. Domain renewal is separate from the email provider's free tier. Use the current [Vercel domain setup guide](https://vercel.com/docs/domains/working-with-domains/add-a-domain) for DNS instructions rather than copying old IP addresses into this document.

## Release checks

Run `npm run typecheck` and `npm run build` for application/data releases. There is also an existing `npm run lint` command. Run `node tests/catalog.cjs` for catalogue and enquiry-link regression checks. There is no browser automation suite; build success alone does not prove the visitor journey.

| Area | Manual verification |
| --- | --- |
| Layout | Homepage, navigation and footer at narrow mobile and desktop widths; keyboard focus and menu behavior |
| Search | Header quick search, keyboard selection, no-results state and full-results link |
| Catalogue | Category/machine/valve combinations, spool-finder year, shared URL reload and clear filters |
| Product | Known slug loads, unknown slug returns 404, thumbnails/swiping work, AI labels and notes remain visible |
| Enquiry | Product quote prefill, required-field errors, optional email and correct state after submission |
| Contact | Footer, floating WhatsApp, product WhatsApp text and phone links match the configured international number |
| Email | Provider acceptance and actual inbox receipt; reply-to behavior; failure path using a test environment |
| SEO | Canonical URL, sitemap, robots and social preview use the chosen production origin |
| Accessibility | Keyboard use, gallery close/Escape behavior, labels and reduced-motion preference |

To check validation locally without sending an email, start the dev server and submit an empty object. It should return `422` before reaching Resend:

```sh
curl -i http://localhost:3000/api/quote \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000' \
  --data '{}'
```

After the cylinder and ram seal additions, TypeScript, the catalogue regression check and the production build passed. Local production HTTP checks verified both detail pages, all eight image assets, category/text search, WhatsApp destinations, product quote prefilling and sitemap entries. The generated views were visually reviewed. No interactive browser test or real quotation email was performed. These checks were performed locally before the release push. Check the resulting Vercel deployment and live pages before considering the new catalogue changes published.

## Troubleshooting

| Symptom | Where to look and what to do |
| --- | --- |
| Zero or stale phone number | Check `NEXT_PUBLIC_CONTACT_PHONE` in the correct Vercel scope, then rebuild. Verify rendered links rather than only the settings screen. |
| WhatsApp opens the wrong chat | Inspect the `wa.me` digits, complete country code and `lib/links.ts`; confirm the number is registered with WhatsApp. |
| Quote API returns `503` | Add the missing Resend API key to the deployment environment. |
| Quote API returns `502` | Inspect Vercel function logs and Resend send errors; check key, sender verification, recipient restrictions and provider quota. |
| “Request sent” but no email | Check provider delivery events/spam and recipient configuration. A filled honeypot intentionally returns success without sending. API acceptance does not prove delivery. |
| Customer reply reaches the wrong address | Check whether the customer supplied an email and whether `replyTo` was set; otherwise contact them by phone. |
| Quote API returns `403` | Inspect Origin and Host handling through the active domain/proxy. |
| Quote API returns `429` | Wait for `Retry-After`; inspect repeated submissions. The application's limiter is per process, not a global provider-quota guard. |
| New product returns 404 | Confirm slug/data entry and rebuild; product routes use generated static parameters. |
| Photo missing or stale | Check the path under `public/` and filename case. Image caching is configured for 2,678,400 seconds; version changed asset filenames when necessary. |
| Unexpected search results | Check exact category/machine/valve options, multiword matching and null year semantics in `lib/filters.ts`. |
| Wrong canonical domain | Set `NEXT_PUBLIC_SITE_URL` and rebuild; a domain alias alone does not change generated metadata. |
| Build cannot fetch Archivo | Check build network access to Google Fonts; browser fonts are served through Next.js after the build. |
| Local Safari tries HTTPS | Check development CSP handling in `next.config.ts`; production uses HTTPS-upgrade headers. |

## Remaining work and limits

1. **Before relying on quote enquiries:** complete the provider/domain decision, confirm the recipient, configure production email, and prove actual delivery. Failed enquiries are currently not stored anywhere by the application.
2. **If buying a domain:** connect it to Vercel, verify the email sending domain separately, update the canonical origin and record renewal/account ownership with the owner.
3. **Email correctness:** make the template's reply instruction conditional on customer email; consider handling unexpected provider exceptions explicitly. Neither change is included in this handover.
4. **Catalogue completion:** `mahindra-loader-valve-block-seal-kit` and `cat-424-excavator-seal-kit` have no images; add owner-approved photos when available. Preserve disclosures on generated images and confirm pack/variant notes and the 70+ marketing figure with the owner.
5. **Operational resilience when needed:** the in-memory limiter resets across instances/restarts, there is no persistent quote queue, and provider failures are not retried. Add durable handling or stronger throttling when the business needs those guarantees.
6. **Repeatable development:** pin the team's agreed Node runtime and add appropriate automated checks as maintenance expands. There is currently no checked-in CI; the catalogue check runs directly with Node.

## Change history worth preserving

| Reference | Result |
| --- | --- |
| `bd9e4f5` | Initial SSE website |
| `656a2cc` | Site redesign |
| `3f71419` | Business copy aligned to S S Engineering |
| `4460363` | Product photos extracted from the client catalogue |
| `373b9c1` | Header quick search |
| `35c75f0` | Security headers, quote API and dependency hardening |
| `d28bb72` | Shared phone/WhatsApp number moved to environment configuration |
| `9f2edca`, `9d3b92d`, `aefe3c0` | Labelled generated product views, expanded galleries and catalogue visual refinements |
| 28 November 2026 operational change | Contact environment configured in Vercel and production redeployed; no code diff |
| 28 November 2026 catalogue additions | Two supplied-photo listings for cylinders and ram seals, with three labelled AI views each, descriptions, category/search integration and regression checks |
| Email and domain discussions | Implementation options clarified; email activation and domain connection remain pending |

Use `git log` and the relevant commit diff for implementation history. Update this handover after completing pending work so the next developer does not repeat configuration or mistake a proposed feature for a deployed one.
