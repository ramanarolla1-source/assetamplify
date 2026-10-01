# AssetAmplify — Financial State

## 1. Definition

A **Financial State** is a structured representation of the current, authenticated condition of an existing financial instrument at a particular point in time.

It is the bridge between:

```text
Institutional Financial Reality
            ↓
      Bank Authentication
            ↓
       Financial State
            ↓
   Programmable Financial State
````

The Financial State does not replace the underlying financial instrument.

It represents the authenticated state of that instrument for use within authorised digital workflows.

The issuing bank or relevant authorised financial institution remains the source of truth for the underlying instrument.

---

## 2. Why Financial State Exists

Traditional financial instruments have state.

A Bank Guarantee can be:

```text
Issued
Active
Amended
Reduced
Extended
Invoked
Claimed
Settled
Cancelled
Expired
```

A digital representation that captures only the instrument's initial attributes can become stale when the underlying institutional state changes.

AssetAmplify therefore treats financial state as **dynamic, versioned and lifecycle-aware**.

The objective is:

> **Do not merely represent the financial instrument. Represent its authenticated financial state and maintain its relationship with the institutional source over time.**

---

## 3. Financial State Model

A Financial State consists of three conceptual layers:

```text
┌─────────────────────────────────────┐
│         Instrument Identity         │
│                                     │
│ ID / Type / Issuer / Parties        │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│            Current State            │
│                                     │
│ Amount / Status / Dates / Terms     │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│       Authentication & Version      │
│                                     │
│ Source / Verification / Version     │
│ Timestamp / Provenance              │
└─────────────────────────────────────┘
```

The model deliberately separates:

* what the instrument is;
* what its current state is;
* how that state was authenticated.

---

## 4. Core Attributes

A Financial State may contain attributes such as:

| Attribute             | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `instrument_id`       | Identifier for the underlying instrument                    |
| `instrument_type`     | BG, LC, SBLC or another supported instrument                |
| `issuer`              | Issuing institution                                         |
| `applicant`           | Business associated with the instrument                     |
| `beneficiary`         | Beneficiary or relevant counterparty                        |
| `amount`              | Current instrument amount                                   |
| `currency`            | Instrument currency                                         |
| `issue_date`          | Date of issuance                                            |
| `expiry_date`         | Applicable expiry date                                      |
| `status`              | Current institutional status                                |
| `conditions`          | Relevant instrument conditions                              |
| `amendments`          | Applicable amendments                                       |
| `verification_status` | Authentication status                                       |
| `state_version`       | Version of the Financial State                              |
| `timestamp`           | Time at which the state was recorded                        |
| `source_reference`    | Reference to the institutional source or verification event |

The exact schema will evolve as implementation and instrument-specific research progresses.

---

## 5. Current State vs Historical State

The system should distinguish between the **current state** and historical versions.

For example:

```text
BG V1
₹100 Cr
ACTIVE
Recorded: T1
        │
        │ Institutional amendment
        ▼
BG V2
₹70 Cr
ACTIVE
Recorded: T2
```

V1 remains part of the historical record.

V2 becomes the current known state.

This distinction is important because downstream actions may have been based on V1.

The system must therefore be able to answer:

> **Which financial state was used when this capability, allocation or facility was assessed?**

---

## 6. State Versioning

Every material change to the Financial State should result in a new state version.

Conceptually:

```text
V1 → V2 → V3 → V4
```

For example:

```text
V1
₹100 Cr
ACTIVE

V2
₹80 Cr
ACTIVE
Reason: Reduction

V3
₹80 Cr
EXTENDED
Reason: Extension

V4
₹80 Cr
CANCELLED
Reason: Cancellation
```

A version should be associated with:

* the underlying instrument;
* the previous version where applicable;
* the new state;
* the source of the update;
* the authentication status;
* the timestamp;
* the reason or event that caused the change.

---

## 7. State Lifecycle

The lifecycle is instrument-specific.

For the initial Bank Guarantee module, a conceptual lifecycle is:

```text
REQUESTED
    ↓
ISSUED
    ↓
BANK VERIFIED
    ↓
ACTIVE
    │
    ├── AMENDED
    │
    ├── REDUCED
    │
    ├── EXTENDED
    │
    ├── INVOKED
    │
    ├── CLAIMED
    │
    ├── SETTLED
    │
    ├── CANCELLED
    │
    └── EXPIRED
```

Not every transition will necessarily occur for every instrument.

The exact lifecycle rules belong to the relevant instrument module.

---

## 8. Source Hierarchy

The Financial State follows a clear source hierarchy:

```text
Underlying Instrument
        ↓
Issuing Institution
        ↓
Institutional Authentication
        ↓
Financial State
        ↓
Solana Programmable State
        ↓
Applications
```

This hierarchy prevents an important conceptual error:

> **The blockchain is not the authority that determines whether the underlying financial instrument is genuine or legally effective.**

The blockchain represents the authenticated state supplied through the authorised institutional process.

---

## 9. Bank Authentication

Authentication establishes that the Financial State has been derived from an authorised institutional source.

Preferred interpretation:

> **The issuing bank has authenticated and confirmed the current state of this instrument.**

Not:

> Blockchain verified the Bank Guarantee.

The distinction is fundamental.

Blockchain infrastructure can verify that a state transition was authorised according to the AssetAmplify protocol.

It cannot independently establish the legal truth of the underlying bank instrument.

---

## 10. Institutional Updates

Financial State is designed to accommodate authorised lifecycle updates.

An institutional update may indicate:

```text
Original State
     ↓
Amendment
     ↓
New Institutional State
     ↓
Authentication
     ↓
New Financial State Version
```

Potential update categories for a BG include:

* amendment;
* reduction;
* renewal/extension;
* invocation;
* claim;
* payment;
* cancellation;
* closure;
* expiry;
* other applicable lifecycle changes.

The exact events supported will depend on the institutional data source and instrument module.

---

## 11. Onchain Representation

Once an institutional state has been authenticated, the relevant Financial State can be represented within the programmable infrastructure.

Conceptually:

```text
Bank-Verified State
        ↓
Normalised Financial State
        ↓
State Validation
        ↓
Solana State Account
        ↓
Controlled Programmable Asset
```

Not every field needs to be publicly exposed onchain.

Sensitive information can remain offchain or be processed through confidential computation where appropriate.

The onchain representation should contain sufficient information to support the required programmable workflows without unnecessarily exposing confidential financial information.

---

## 12. Financial State and Programmable Asset

The relationship is:

```text
Financial State
      ↓
Programmable Representation
```

The programmable asset is therefore dependent on the Financial State.

It should not be treated as an independent financial reality.

If the underlying institutional state changes, the relationship between the programmable representation and the new state must be evaluated.

This is why state versioning and revalidation are central to the architecture.

---

## 13. Financial State and Capability

A capability assessment is tied to a particular Financial State.

For example:

```text
BG V1
₹100 Cr
ACTIVE
        ↓
Capability Assessment A1
        ↓
Illustrative Capability
₹20 Cr
```

If the BG subsequently changes:

```text
BG V1
₹100 Cr
        ↓
Bank-authorised reduction
        ↓
BG V2
₹70 Cr
```

the system should identify that Capability Assessment A1 was based on V1.

This does not automatically determine the outcome.

Instead:

```text
State Change
     ↓
Dependency Check
     ↓
Revalidation Required
     ↓
Institutional / Lender Decision
```

This preserves the distinction between **state change** and **financial decision**.

---

## 14. Financial State and Financial Obligation

A financial obligation can retain provenance to the state used in the relevant assessment.

For example:

```text
BG V1
   ↓
Capability A1
   ↓
Facility F1
   ↓
Obligation O1
```

The relationship can be represented as:

```text
Obligation
   ↓
Facility
   ↓
Capability
   ↓
Assessment State Version
   ↓
Financial State
   ↓
Underlying Instrument
```

This allows downstream users to establish the provenance of a financial decision.

It does not mean that the obligation becomes the underlying BG.

---

## 15. Continuous Revalidation

A core design principle is:

> **When authenticated financial state materially changes, dependent workflows should be identifiable for appropriate revalidation.**

The process is:

```text
Current State
     ↓
Institutional Change
     ↓
New State Version
     ↓
Compare Dependencies
     ↓
Identify Affected Workflows
     ↓
Revalidation
```

Possible outcomes depend on the relevant financial and contractual arrangement.

They may include:

```text
Continue
Modify
Reduce
Substitute
Restructure
Suspend
Other Applicable Action
```

AssetAmplify does not automatically:

* invoke a BG;
* cancel a BG;
* seize an asset;
* transfer an instrument;
* liquidate a facility.

Those actions remain subject to the applicable institutional, contractual and legal processes.

---

## 16. Observability and Reconciliation

Financial State exists across multiple layers.

A simplified model is:

```text
Institutional State
        ↕
Backend Representation
        ↕
Solana State
        ↕
Application View
```

AssetAmplify therefore requires reconciliation between these layers.

The observability principle is:

> **Use events for speed, accounts for state, and reconciliation for reliability.**

### Events

Events indicate that a state may have changed.

### Accounts

Accounts contain the current programmable state.

### Reconciliation

Reconciliation verifies that the programmable representation remains aligned with the authorised institutional state.

Conceptually:

```text
Event Detected
     ↓
Read Current State
     ↓
Check Institutional Source
     ↓
Compare
     ↓
Authenticate
     ↓
Update State Version
     ↓
Evaluate Dependencies
```

This prevents the system from treating an event alone as proof of the complete current state.

---

## 17. Provenance

Every Financial State should maintain sufficient provenance to understand where the state originated.

Conceptually:

```text
Financial State
      ↓
Authentication Reference
      ↓
Institutional Source
      ↓
Underlying Instrument
```

A downstream financial action can then maintain a relationship to:

```text
Instrument
    ↓
Financial State Version
    ↓
Assessment
    ↓
Financial Workflow
```

Provenance supports auditability and traceability.

It does not establish ownership.

---

## 18. Instrument-Specific State

The Financial State framework is common infrastructure.

The actual state machine is instrument-specific.

For example:

```text
Financial State Core
       │
       ├── Bank Guarantee Module
       │
       ├── Letter of Credit Module
       │
       └── SBLC Module
```

The initial implementation focuses on the Bank Guarantee.

Future LC and SBLC modules will be introduced only after their respective:

* terms and conditions;
* lifecycle;
* legal and commercial characteristics;
* verification requirements;
* institutional data availability;
* business workflows

have been separately evaluated.

The architecture therefore follows:

> **Common state infrastructure, instrument-specific lifecycle intelligence.**

---

## 19. Example: BG State Evolution

A simplified example:

### Version 1

```json
{
  "instrument_type": "BG",
  "amount": "1000000000",
  "currency": "INR",
  "status": "ACTIVE",
  "state_version": 1
}
```

The state is authenticated and may become an input into an authorised capability assessment.

### Version 2

The issuing institution subsequently confirms a reduction:

```json
{
  "instrument_type": "BG",
  "amount": "700000000",
  "currency": "INR",
  "status": "ACTIVE",
  "state_version": 2
}
```

The important event is not simply that the amount changed.

The system now knows:

```text
V1 → V2
₹100 Cr → ₹70 Cr
```

Any dependent financial workflow that relied on V1 can therefore be identified for appropriate review.

---

## 20. Design Invariants

The Financial State layer should preserve several core invariants.

### Authority

```text
Only an authorised institutional source can authenticate
the underlying financial state.
```

### Version Integrity

```text
A new material state must not silently overwrite
the historical state from which previous actions originated.
```

### Provenance

```text
Financial decisions should be traceable to the
relevant Financial State version.
```

### State Dependency

```text
A capability or financial workflow must identify
the Financial State on which it depends.
```

### Revalidation

```text
Material institutional state changes must be capable
of triggering dependency review.
```

### Separation

```text
Financial State ≠ Financial Capability
Financial Capability ≠ Financial Obligation
Financial Obligation ≠ Underlying Instrument
```

### Institutional Authority

```text
Blockchain state does not replace institutional authority
over the underlying financial instrument.
```

---

## 21. Machine-Readable Representation

The repository will maintain machine-readable examples and schemas alongside this document.

Initial examples:

```text
examples/
├── bg-state-v1.json
├── bg-state-v2.json
└── bg-lifecycle.json
```

Initial schema:

```text
schemas/
└── financial-state.schema.json
```

These artifacts will evolve with the product.

The objective is to ensure that the Financial State concept is not limited to documentation but can progressively become a concrete technical data model.

---

## 22. Core Principle

The Financial State layer exists to preserve the connection between:

```text
Institutional Financial Reality
            ↓
Bank Authentication
            ↓
Current Financial State
            ↓
Programmable Representation
            ↓
Authorised Financial / Business Workflow
```

The central principle is:

> **The programmable asset should remain connected to the authenticated state of the underlying financial instrument throughout its lifecycle.**

AssetAmplify therefore treats **state, versioning, provenance, authority and revalidation** as fundamental components of programmable financial infrastructure.

```

Once this is added, we will have the conceptual foundation for the first actual technical artifacts.

**Next after this:** `docs/adoption.md`, followed by the Week 1 research update and then the three JSON/schema files.
```

