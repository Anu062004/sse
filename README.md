<p align="center">
  <img src="assets/images/brand/sse-readme-banner.png" alt="SSE Hydraulic Solutions logo" width="720" />
</p>

# S S Engineering website

SSE is a product catalogue and enquiry website for S S Engineering, a hydraulic components and aftermarket spares business in Faridabad, India. Visitors find parts by machine, year and valve block, inspect fitment details, and contact the business through WhatsApp, phone or the quotation form. Prices and availability are confirmed by the business; there is no checkout or online payment.

## Project status

Handover updated **28 November 2026**, starting from application commit `aefe3c0`, with the cylinder and ram seal additions described below.

| Area | Current state |
| --- | --- |
| Website | Deployed on Vercel at [sse-rosy.vercel.app](https://sse-rosy.vercel.app) |
| Repository | [Anu062004/sse](https://github.com/Anu062004/sse), branch `main` |
| Catalogue | 34 product records across 8 categories; 32 records have images. Verify the deployed revision in Vercel when releasing catalogue updates |
| WhatsApp and calls | Correct business number configured in Vercel for Production, Preview and Development; live links verified on 28 November |
| Quotation email | Form, API and Resend integration implemented, but email delivery is **not activated**; production has no Resend API key or sender configuration |
| Custom domain | Discussed with the owner; no custom domain attached to the inspected production deployment |
| FormSubmit | Discussed as an alternative; **not integrated** |

The next release priority is activating and verifying quotation email delivery. See the [operations handover](docs/OPERATIONS.md) before treating the quote form as operational.

## Start locally

Use Node.js and npm. The handover workstation uses Node `24.18.0` and npm `11.16.0`; the repository does not pin a Node version. Check Vercel's configured runtime before changing versions. `package-lock.json` is the dependency installation source of truth.

```sh
git clone https://github.com/Anu062004/sse.git
cd sse
npm ci
cp .env.example .env.local
```

Edit `.env.local` before starting:

- Set `NEXT_PUBLIC_CONTACT_PHONE` to the owner's real international number, including country code. The all-zero example is not usable.
- Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local development. The domain in `.env.example` is an example, not evidence of a configured production domain.
- Leave `RESEND_API_KEY` empty when developing without email. Valid quote submissions will return a clear configuration error. If testing email, use a verified sender and a recipient you control.

```sh
npm run dev
```

Open [localhost:3000](http://localhost:3000). Never commit `.env.local`, API keys or Vercel credentials. The actual contact number is managed in environment settings rather than repeated in repository files.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependency versions |
| `npm run dev` | Start the local Next.js development server |
| `npm run typecheck` | Check TypeScript without emitting JavaScript |
| `npm run lint` | Run the configured Next.js lint command |
| `npm run build` | Build the production application |
| `npm start` | Serve an existing production build locally |

Run `node tests/catalog.cjs` for catalogue integrity, image references, new product descriptions and enquiry-link regression checks. There is no `npm test` script. Use the [release checks](docs/OPERATIONS.md#release-checks). Builds use `next/font/google` for Archivo and may need network access to fetch fonts.

## Read next

- [Developer guide](docs/DEVELOPER_GUIDE.md): architecture, routes, data, UI conventions and common changes.
- [Operations handover](docs/OPERATIONS.md): configuration, deployment, WhatsApp incident, quote email activation, domain setup, troubleshooting and remaining work.

The stack is Next.js `15.5.29` with the App Router, React `19.3.1`, TypeScript and Tailwind CSS `3.4.19`. Resend `6.39.0` provides the existing email integration, and Sharp supports image processing. See `package.json` and the lockfile for the full dependency set.

Keep these documents current when changing environment variables, deployment behavior, product fields or integration status. Record operational changes even when they require no Git commit, as happened with the WhatsApp fix.
