# Changelog

All notable changes to AssetAmplify are documented in this file.

---

## [2026-10-01] — Week 01: e-BG Infrastructure & Lifecycle Research

### Research

- Studied NeSL's electronic Bank Guarantee (e-BG) infrastructure and API-based lifecycle management.
- Reviewed NeSL's published materials covering electronic Bank Guarantee lifecycle events and institutional updates.
- Studied ChainGuarantee by NthMOMENT as an example of an onchain Bank Guarantee representation connected to a revolving credit facility.

### Key Insight

The initial product question was whether a Bank Guarantee needed to be digitised for AssetAmplify.

The research shifted the question toward:

> How can authenticated financial state become programmable while remaining connected to the institutional state of the underlying financial instrument?

### Product Direction

Established the initial importance of:

- Financial State
- State Versioning
- Financial Provenance
- Lifecycle Awareness
- Revalidation

The product direction moved from simple instrument tokenization toward maintaining a programmable representation connected to the authenticated state of the underlying financial instrument.

### Technical Artifacts Added

- `examples/bg-state-v1.json`
- `examples/bg-state-v2.json`
- `examples/bg-lifecycle.json`
- `schemas/financial-state.schema.json`
- `updates/week-01-nesl-chainguarantee.md`

### Repository Evolution

```text
Research
    ↓
Observation
    ↓
Product Insight
    ↓
Architecture Decision
    ↓
Technical Artifact
````

### Initial Scope

Bank Guarantee is the initial financial instrument used to develop and test the AssetAmplify Financial State model.

The architecture is intended to support additional financial instruments in the future, while recognising that each instrument requires its own lifecycle, legal characteristics, verification requirements and business rules.

```
```

