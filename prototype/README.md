# AssetAmplify Financial State Demo

A small, browser-based demonstration of the AssetAmplify Bank Guarantee (BG) lifecycle concept.

## Run locally

No build tools or package installation are required.

1. Download or clone this repository.
2. Open `prototype/index.html` in a modern browser.
3. Click **Simulate Bank Amendment**.
4. Observe V1 (₹10 crore) preserved in history, V2 (₹7 crore) becoming current, and dependent capability being flagged for revalidation.
5. Click **Reset demo** to repeat the flow.

If your browser restricts local file access, serve the repository folder with any static HTTP server and open `prototype/index.html`.

## What this demonstrates

- A structured financial-state snapshot for a sample Bank Guarantee.
- A simulated institutional amendment with an instrument-ID and currency check.
- A versioned state transition from V1 to V2.
- Preservation of the previous version and basic provenance metadata.
- A revalidation flag when the underlying amount changes materially.
- A session-local event log.

## Explicit limitations

- All instrument data is fictional example data.
- The institutional response is hard-coded mock data in `app.js`; no bank, NeSL, lender, or external API is contacted.
- The app does not cryptographically authenticate a bank response.
- No Solana program, Token-2022 asset, wallet, or onchain transaction is implemented.
- The revalidation flag is a demonstration of workflow logic, not a credit assessment or approval.
- State history exists only in the current browser session and is not durable storage.

This prototype is an executable product-flow demonstration, not production financial infrastructure.
