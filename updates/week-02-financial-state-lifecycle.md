# Week 02 — From Financial-State Design to a Lifecycle Prototype

**Progress period:** 5–10 October 2026

**Focus:** Clarifying the lifecycle rules and translating the AssetAmplify concept into an illustrative prototype.

## What Changed This Week?

This week, AssetAmplify moved from a research-led product concept toward a more concrete illustration of how authenticated financial state could be represented and handled when an underlying Bank Guarantee changes.

### 1. Made the lifecycle problem more concrete

The core example is a Bank Guarantee whose amount changes after an authorised institutional amendment:

```text
BG V1 — ₹10 crore — ACTIVE
          ↓
Simulated authorised amendment
          ↓
BG V2 — ₹7 crore — ACTIVE
          ↓
Dependent capability assessment requires revalidation
```

The earlier state should remain part of the history. A new state version should not silently overwrite the prior record, and a material change should trigger review of any financial utility that depends on the previous state.

### 2. Added an illustrative browser prototype

A small static prototype was added on a separate branch and proposed through a draft pull request. It illustrates the BG V1-to-V2 amendment flow, preservation of prior state, a basic event history, and a revalidation flag.

This is a **mock demonstration**, not a production implementation. It has not been connected to a bank, NeSL, a lender, or a deployed Solana program. The amendment is simulated; the prototype does not cryptographically authenticate bank data or submit onchain transactions.

### 3. Refined the institutional trust boundary

AssetAmplify does not claim that a blockchain verifies the legal validity of a Bank Guarantee. The issuing institution remains the source of truth. A future implementation would require an authorised institutional data channel, authentication of incoming updates, controls against stale or replayed state, and reconciliation.

The design separates three concepts:

- **Financial State:** the current authenticated view of the underlying instrument.
- **Capability assessment:** a fresh assessment of what financial utility may be appropriate; face value alone does not determine borrowing capacity.
- **Facility or obligation:** a separate lender decision, subject to its own terms and controls.

### 4. Continued ecosystem research

We continued to consider how AssetAmplify's role differs from adjacent infrastructure:

- **NeSL e-BG:** institutional digital lifecycle information and API-based workflows.
- **ChainGuarantee:** an onchain Bank Guarantee representation connected to financing logic.
- **Fiserv / Roughrider Coin:** institutional digital-asset activity connected to existing banking workflows.
- **Metaplex MPL-3643:** work on permissioned tokenised-asset infrastructure.
- **Solana DvP:** infrastructure aimed at atomic settlement between counterparties.

These are research references, not AssetAmplify partnerships or integrations. They address different layers of financial infrastructure; AssetAmplify's focus remains the connection between authenticated institutional financial state and controlled programmable utility.

## What We Learned

The product cannot stop at representing an instrument once. It needs to account for changes to the underlying institutional state and identify when dependent utility must be reviewed.

> **The key design principle: preserve state history, recognise material changes, and require revalidation before relying on stale financial state.**

## What Comes Next

The next phase is to validate the lifecycle model and identify a realistic institutional integration path. Further implementation would need to define authorised data access, state-update authentication, version and replay controls, and the onchain program boundaries.

AssetAmplify remains at an early research and prototype stage. No live institutional or onchain integration is claimed.
