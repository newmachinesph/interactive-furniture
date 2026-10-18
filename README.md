# Interactive Furniture Estimator

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

A step-by-step web wizard that lets a customer pick rooms, set room sizes, adjust furniture quantities and pricing tiers ($ to $$$$), and see a running total estimate before leaving contact details.

This is a front-end demo: the contact step validates the email and shows a confirmation screen, but nothing is sent to a server.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

```
src/app/          Next.js App Router layout and page
src/components/   FurnitureWizard, WizardProgress, steps/, ui/
src/lib/          furnitureData.ts (rooms, items, price tiers, sizes)
```

## License

MIT, see [LICENSE](LICENSE).
