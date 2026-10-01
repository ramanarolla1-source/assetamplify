# Week 01 — The Bank Guarantee Is Already Digital. What Comes Next?

**Research focus:** NeSL e-BG infrastructure and ChainGuarantee

**Product question:**

> If a Bank Guarantee is already digitally represented and can also be represented onchain, what additional problem does AssetAmplify need to solve?

---

## 1. Why We Started With This Question

AssetAmplify begins with Bank Guarantees as its initial financial instrument module.

Before designing an onchain representation, we wanted to understand whether the Bank Guarantee itself is already becoming digital within India's financial infrastructure.

This led us to study two different approaches:

1. **NeSL's electronic Bank Guarantee infrastructure**, representing an institutional approach to digital BG issuance and lifecycle management.
2. **ChainGuarantee by NthMOMENT**, an onchain protocol that represents a Bank Guarantee through an NFT and connects it to an onchain revolving credit facility.

The two approaches address different parts of the problem.

That difference helped clarify the architectural question behind AssetAmplify.

---

## 2. What We Found in NeSL

NeSL's e-BG platform provides electronic Bank Guarantee infrastructure and API-based capabilities for managing e-BGs.

NeSL's published materials describe lifecycle activities including issuance, amendment, renewal, cancellation, invocation and closure, together with notifications relating to subsequent status changes.

Its published API documentation also identifies events including:

- issuance;
- amendment;
- partial invocation;
- invocation;
- cancellation;
- closure;
- renewal;
- court injunction.

The published documentation also provides for changes to the current BG amount following amendments and changes to outstanding amounts following events such as full invocation, cancellation or closure.

This is important for AssetAmplify.

A Bank Guarantee should not be treated as a static document whose relevant information is fixed at the moment of issuance.

There is an institutional digital lifecycle around the instrument.

---

## 3. What This Research Means for AssetAmplify

The research changed the question we are asking.

NeSL demonstrates that electronic Bank Guarantees can have structured, institutionally managed digital lifecycle information.

ChainGuarantee demonstrates that an onchain representation of a Bank Guarantee can be connected to financing logic.

These observations led to an AssetAmplify product question:

> **How can authenticated financial state become programmable while remaining connected to the institutional state of the underlying financial instrument?**

Our resulting product direction is:

```text
Bank Instrument
      ↓
Institutional Authentication
      ↓
Current Financial State
      ↓
Programmable Representation
      ↓
Authorised Business Utility
````

The objective is therefore not simply to recreate an existing Bank Guarantee as a blockchain token.

Instead, AssetAmplify explores how an authenticated representation of the instrument's current financial state can become useful within programmable financial and business workflows.

---

## 4. What We Found in ChainGuarantee

We also examined the publicly documented ChainGuarantee repository by NthMOMENT.

ChainGuarantee describes an onchain Bank Guarantee discounting protocol. Its architecture includes a CG NFT implemented as an ERC-721, a verifier/SME approval mechanism, and a revolving USDC credit facility.

The documented flow includes:

* minting the guarantee NFT;
* SME and verifier signatures;
* activation;
* opening a revolving facility;
* drawing;
* repayment;
* closure or default.

The repository therefore demonstrates another possible direction:

```text
Bank Guarantee
      ↓
Onchain Representation
      ↓
Credit Facility
      ↓
Draw / Repay / Default
```

This demonstrates that an onchain representation of a BG can be connected to financing logic.

---

## 5. The Lifecycle Question

The research also raised a lifecycle question for AssetAmplify.

A financial instrument can change after its initial digital or onchain representation.

For example:

```text
BG V1
₹100 Cr
ACTIVE
      ↓
Institutional Amendment
      ↓
BG V2
₹70 Cr
ACTIVE
```

The AssetAmplify research question is:

> **How should a programmable representation remain connected to the changing institutional state of the underlying guarantee?**

The documented ChainGuarantee repository describes the onchain guarantee, including value and expiry, together with the financing lifecycle around that representation.

In the repository materials reviewed for this research, we did not find a documented mechanism describing bank-driven synchronisation of subsequent institutional BG lifecycle changes with the CG NFT.

This observation is limited to the publicly documented material reviewed.

ChainGuarantee demonstrates one direction:

> **Onchain representation of a BG connected to financing.**

AssetAmplify explores another:

> **How can a programmable representation remain connected to authenticated financial state throughout the instrument's lifecycle?**

---

## 6. AssetAmplify's Architectural Response

This research led to four requirements for the initial AssetAmplify architecture.

### 1. Financial State

Represent the current authenticated condition of the instrument rather than only its original issuance data.

### 2. State Versioning

A material institutional change should produce a new state version.

```text
V1 → V2 → V3
```

### 3. Provenance

Downstream financial actions should be able to identify the Financial State version on which they depend.

```text
Obligation
    ↓
Facility
    ↓
Capability
    ↓
Financial State V1
    ↓
Bank Authentication
    ↓
Underlying BG
```

### 4. Revalidation

When the underlying institutional state materially changes, dependent financial workflows should be identifiable for appropriate review.

```text
Financial State V1
       ↓
Capability / Facility
       ↓
Institutional Change
       ↓
Financial State V2
       ↓
Dependency Check
       ↓
Revalidation
```

---

## 7. What We Added to the Repository

This research directly produced the first technical artifacts in the AssetAmplify repository.

### Financial State Examples

```text
examples/
├── bg-state-v1.json
├── bg-state-v2.json
└── bg-lifecycle.json
```

These demonstrate:

* an authenticated BG state;
* a subsequent state version;
* a material reduction;
* lifecycle progression;
* provenance between state versions.

### Financial State Schema

```text
schemas/
└── financial-state.schema.json
```

The schema provides the initial machine-readable structure for the Financial State model.

It deliberately does not yet contain Solana-specific fields, token addresses, wallets or financing facilities.

The first technical layer is the institutional financial state itself.

---

## 8. What This Changes in the Product

The research changed the product framing.

We are not building:

```text
Document
    ↓
Token
```

We are exploring:

```text
Institutional Instrument
        ↓
Bank Authentication
        ↓
Financial State
        ↓
Programmable Financial Asset
        ↓
Authorised Business Utility
```

The programmable asset should therefore remain connected to the authenticated state of the underlying financial instrument.

---

## 9. What We Are Not Claiming

This research does not establish that every bank exposes the same APIs or provides the same lifecycle information.

NeSL's infrastructure is used here as an institutional reference for API-driven e-BG lifecycle management, not as a claim of an AssetAmplify integration or partnership.

Likewise, the ChainGuarantee comparison is based on its publicly documented repository. We are not claiming that undocumented functionality cannot exist outside the material reviewed.

The conclusion from this research is limited to the following:

> **Existing institutional digital infrastructure demonstrates that financial instruments can have structured digital lifecycle information, while onchain protocols demonstrate that those instruments can also be represented within programmable financial workflows. AssetAmplify explores the connection between those two layers.**

---

## 10. The Research Conclusion

The most important conclusion from Week 01 is:

> **Tokenization is not enough.**

A useful programmable financial asset needs a relationship with the authenticated state of the underlying financial instrument.

The architecture therefore needs to consider:

```text
Authentication
     +
Current State
     +
Versioning
     +
Provenance
     +
Lifecycle
     +
Revalidation
```

This is the foundation on which the next AssetAmplify research and technical work will build.

```

**This is the only version you should put into `updates/week-01-nesl-chainguarantee.md`.**

After you replace the file, just tell me **“done.”** Then we will handle `CHANGELOG.md` as a **complete replacement file**, not as an incremental addition.
```
