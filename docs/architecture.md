# AssetAmplify — Architecture

## 1. Architecture Overview

AssetAmplify is designed as a programmable financial-state infrastructure layer around existing institutional financial systems.

The architecture does not attempt to replace the issuing bank, lender, payment infrastructure or underlying financial instrument.

Instead, it connects authenticated institutional financial state with programmable digital infrastructure.

The high-level architecture is:

```text
┌─────────────────────────────────────────────┐
│        Institutional Financial Reality      │
│                                             │
│  Bank-issued BG / LC / other instrument    │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│   Institutional Integration / API Layer     │
│                                             │
│   Authorised institutional data,
   authentication, lifecycle and updates
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│             Financial State Layer           │
│                                             │
│  Current state + version + provenance      │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│        Solana Programmable State Layer      │
│                                             │
│  State accounts + authorised transitions   │
│  Controlled programmable asset              │
└──────────────────────┬──────────────────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
┌──────────────────────┐ ┌──────────────────────┐
│ Confidential         │ │ Business / Financial │
│ Computation          │ │ Workflows            │
│                      │ │                      │
│ Arcium               │ │ Capability           │
│ Private inputs       │ │ Verification         │
│ Confidential results │ │ Financing            │
└──────────────────────┘ │ Trade / Procurement  │
                         │ Enterprise workflows │
                         └──────────────────────┘
````

The core architectural principle is:

> **Banks authenticate financial reality. AssetAmplify makes that authenticated state programmable.**

---

## 2. Source of Truth and Trust Boundaries

AssetAmplify separates the underlying financial reality from its programmable representation.

The trust hierarchy is:

```text
Underlying Financial Instrument
            ↓
Issuing Institution
            ↓
Bank Authentication
            ↓
Financial State
            ↓
Solana Programmable State
            ↓
Applications and Workflows
```

The issuing institution remains authoritative for the underlying instrument.

Blockchain state does not independently establish:

* whether a BG legally exists;
* whether an LC is legally operative;
* whether an instrument has been amended by the issuing bank;
* whether an instrument has been invoked;
* whether an obligation is legally enforceable.

Those matters depend on the relevant institutional and legal framework.

The blockchain provides a programmable representation of authenticated state.

---

## 3. System Actors

AssetAmplify involves multiple actors with different responsibilities.

### Issuing Bank

The issuing bank or relevant financial institution is authoritative for the underlying financial instrument.

It may provide authorised information relating to:

* issuance;
* current status;
* amendments;
* reductions;
* extensions;
* invocation;
* claims;
* cancellation;
* closure;
* expiry;
* other applicable lifecycle events.

### Business / Applicant

The business associated with the underlying instrument can initiate authorised workflows and requests.

Examples include:

* verification;
* financing requests;
* commercial workflows;
* allocation requests;
* enterprise integrations.

### Beneficiary / Counterparty

A beneficiary or authorised counterparty may receive or verify relevant information according to the permissions of the workflow.

### Lender

A lender independently evaluates financing requests.

AssetAmplify does not automatically determine that a business should receive financing.

### AssetAmplify Infrastructure

The product coordinates:

* financial-state representation;
* permissions;
* workflow orchestration;
* state transitions;
* provenance;
* reconciliation;
* revalidation.

### Arcium

Arcium can provide confidential computation where capability or eligibility calculations require protected inputs.

### Solana

Solana provides the programmable state layer for authorised state representation and transitions.

---

## 4. Authority Model

A wallet address alone does not establish institutional authority.

The architecture therefore separates:

```text
Institution
    ↓
Role
    ↓
Permissions
    ↓
Credential / Authorised Account
    ↓
Action
```

Examples:

```text
Issuing Bank
    ↓
Issuer
    ↓
Update Financial State
    ↓
Authorised institutional credential
```

```text
Lender
    ↓
Financing Institution
    ↓
Create / update approved facility
    ↓
Authorised lender credential
```

```text
Business
    ↓
Applicant
    ↓
Request assessment / initiate workflow
    ↓
Authorised business credential
```

This separation is important because financial-state transitions should be performed only by actors authorised to perform them.

---

## 5. Financial State Layer

The Financial State layer is the bridge between institutional financial reality and programmable infrastructure.

A state record can conceptually contain:

```text
Instrument ID
Instrument Type
Issuing Institution
Applicant
Beneficiary
Amount
Currency
Issue Date
Expiry Date
Status
Amendments
Verification Status
State Version
Timestamp
Conditions
Source / Reference
```

The exact schema can evolve as implementation proceeds.

The important architectural properties are:

* authenticated;
* structured;
* versioned;
* traceable;
* lifecycle-aware.

The state should represent the **current known institutional position**, while historical versions preserve how that position changed.

---

## 6. State Versioning

Financial state is versioned so that downstream workflows can identify which institutional state was used for an action.

For example:

```text
BG V1
₹100 Cr
ACTIVE
       ↓
Capability Assessment
       ↓
Facility Established
       ↓
Bank Amendment
       ↓
BG V2
₹70 Cr
ACTIVE
```

The capability or facility can therefore retain a reference to the state version from which it originated.

A simplified relationship is:

```text
Capability
    ↓
Assessment State Version
    ↓
Financial State V1
    ↓
Bank Authentication
    ↓
Underlying Instrument
```

When the current state becomes V2, the system can determine whether the earlier capability or facility requires revalidation.

This prevents a critical architectural problem:

> **A financial decision should not silently remain based on an outdated institutional state.**

---

## 7. Instrument-Specific Modules

AssetAmplify uses a common Financial State foundation with instrument-specific modules.

The initial module is:

```text
Bank Guarantee
```

Future modules may include:

```text
Letter of Credit
Standby Letter of Credit
Other Eligible Financial Instruments
```

The architecture does not assume that all instruments have the same lifecycle.

Instead:

```text
                 Financial State Core
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
         BG             LC             SBLC
      Lifecycle      Lifecycle       Lifecycle
      Rules          Rules           Rules
```

Each module can define:

* instrument-specific states;
* lifecycle transitions;
* verification requirements;
* relevant conditions;
* business rules;
* data requirements.

This allows the infrastructure to remain reusable without incorrectly standardising distinct financial instruments.

---

## 8. Bank and Institutional Integration

AssetAmplify is designed to consume authorised institutional information rather than treating the blockchain as the source of financial truth.

Conceptually:

```text
Issuing Bank
     │
     │ Authorised API / Institutional Channel
     ▼
Integration Layer
     │
     ▼
Financial State Service
     │
     ├── State validation
     ├── Versioning
     ├── Provenance
     └── Reconciliation
     │
     ▼
Solana
```

Institutional infrastructure may expose different levels of data and functionality.

Therefore, the architecture does not assume that every bank provides identical APIs or lifecycle information.

Where a recognised institutional e-BG or API infrastructure provides authorised lifecycle information, AssetAmplify can use that type of information as an integration model.

NeSL's e-BG infrastructure provided an important research reference for this architecture. Its published materials demonstrate how issuing-bank-controlled e-BG lifecycle information can be communicated and updated through secure API-based infrastructure. AssetAmplify does not assume integration with NeSL; rather, this demonstrates that the institutional-to-programmable connection can be designed around existing authorised financial data channels instead of recreating the underlying instrument onchain.

The bank remains authoritative.

---

## 9. Solana's Role

Solana is intended to provide the programmable state layer.

Its role includes:

* maintaining programmable financial-state accounts;
* enforcing authorised state transitions;
* maintaining relationships between state and dependent records;
* supporting controlled digital asset representations;
* emitting state-change events;
* enabling application composability.

Conceptually:

```text
Financial State Program
        ↓
Business logic
        ↓
Authorised transitions
        ↓
Programmable Financial Asset
```

The programmable asset is not intended to be an unrestricted transferable token.

Transferability, permissions and other behaviour must be explicitly defined according to the relevant financial and commercial workflow.

---

## 10. Token Representation

Where tokenisation is used, the token represents a controlled digital relationship with authenticated financial state.

It should not automatically be interpreted as:

* ownership of the underlying BG;
* assignment of the bank's obligation;
* unrestricted collateral;
* freely transferable financial value;
* legal substitution for the underlying instrument.

The implementation can use Solana's Token-2022 framework where appropriate.

The exact extension set and transfer controls will be determined during implementation based on the required financial-state and permission model.

The architectural distinction is:

```text
Financial State Program
        ↓
State and business logic

Token Representation
        ↓
Controlled digital representation
```

---

## 11. Confidential Computation

Some financial decisions require information that should not become public blockchain data.

Examples include:

* internal lender limits;
* other financial exposures;
* confidential eligibility parameters;
* private KYC/KYB information;
* sensitive commercial information.

AssetAmplify therefore separates public programmable state from confidential computation.

Conceptually:

```text
Public / Authorised State
        │
        ├───────────────┐
        │               │
        ▼               ▼
   Solana State     Private Inputs
                        │
                        ▼
               Arcium Confidential
                  Computation
                        │
                        ▼
               Confidential Result
                        │
                        ▼
                 Authorised State
```

Arcium is responsible for confidential computation.

It is not responsible for establishing the truth of the underlying financial instrument.

---

## 12. Backend and Orchestration

The backend coordinates offchain processes that should not be forced into a blockchain program.

Potential responsibilities include:

* institutional API integration;
* authentication;
* data normalisation;
* state comparison;
* event processing;
* reconciliation;
* workflow orchestration;
* notifications;
* monitoring;
* enterprise integration;
* audit support.

The blockchain should enforce deterministic financial-state rules, while offchain infrastructure handles integration and operational complexity.

This creates a separation between:

```text
Onchain
→ Programmable state and authorised transitions

Offchain
→ Institutional integration, orchestration and reconciliation
```

---

## 13. Events, Accounts and Reconciliation

AssetAmplify follows a simple observability principle:

> **Use events for speed, accounts for state, and reconciliation for reliability.**

### Events

Events indicate that something may have changed.

They are useful for:

* triggering workflows;
* notifications;
* monitoring;
* downstream processing.

### Accounts

Accounts represent the current programmable state.

They should be treated as the authoritative current state of the AssetAmplify onchain layer.

### Reconciliation

Reconciliation compares the relevant layers and resolves differences.

Conceptually:

```text
Event
  ↓
"Something may have changed"
  ↓
Read current state
  ↓
Compare with institutional source
  ↓
  ↓
Retrieve / confirm authorised institutional state
        ↓
Validate
Validate
  ↓
Update / reconcile
  ↓
New Financial State Version
```

Therefore:

> **WebSocket tells us that something may have changed. RPC tells us what the current onchain state is. The backend reconciles the programmable state with the authorised institutional state.**

---

## 14. Financial Provenance

Financial provenance connects downstream financial actions to the state from which they originated.

A simplified chain is:

```text
Financial Obligation
        ↑
Facility
        ↑
Capability
        ↑
Allocation
        ↑
Financial State
        ↑
Bank Authentication
        ↑
Underlying Instrument
```

A facility can therefore reference:

* the capability assessment;
* the Financial State version;
* the relevant allocation;
* the underlying instrument identifier.

This enables a downstream user or authorised institution to understand the origin of a financial decision.

Provenance provides traceability.

It does not by itself establish legal ownership.

---

## 15. Capability and Obligation Separation

The architecture deliberately separates capability from actual financial obligation.

```text
Financial State
      ↓
Authorised Request
      ↓
Capability Assessment
      ↓
Lender Decision
      ↓
Facility
      ↓
Financial Obligation
      ↓
Utilisation
```

A capability is an assessment output.

A facility is an authorised financial arrangement.

An obligation is the actual enforceable commitment.

These should not be represented as the same state or object.

This distinction prevents the system from implying that verification automatically creates credit.

---

## 16. Continuous Revalidation

A downstream financial workflow can depend on a particular Financial State version.

When the underlying instrument changes:

```text
Current State
     ↓
Material Change
     ↓
New State Version
     ↓
Dependency Check
     ↓
Revalidation
```

Material changes can include:

* reduction;
* amendment;
* extension;
* expiry;
* cancellation;
* invocation;
* claim;
* payment;
* settlement.

Revalidation may result in:

```text
Continue
Modify
Reduce
Substitute
Restructure
Suspend
Other Contractual Action
```

The system does not automatically determine the legal or commercial outcome.

That outcome remains subject to the applicable institutional and contractual framework.

---

## 17. Security Invariants

The architecture is designed around strict state-transition controls.

A core invariant is:

> **ONLY AUTHORIZED PARTY + CORRECT ACCOUNT + VALID STATE = VALID STATE TRANSITION**

Additional financial invariants include:

```text
Facility Approved ≤ Authorised Capability

Utilised ≤ Approved Facility

Outstanding ≤ Applicable Obligation

Capability State Version = Assessment State Version

Current Instrument State ≠ Assessment State
        → Review / Revalidation
```

The implementation should also prevent:

* replayed updates;
* double allocation;
* double utilisation;
* unauthorised state changes;
* invalid lifecycle transitions;
* use of superseded state without appropriate review.

---

## 18. Payment Infrastructure

AssetAmplify does not require the underlying business to replace existing fiat payment infrastructure.

Where a financial obligation exists, applicable payment and repayment mechanisms can continue through authorised banking and payment channels.

Conceptually:

```text
Programmable Financial State
            ↓
Financial Workflow
            ↓
Facility / Obligation
            ↓
Existing Fiat Payment Infrastructure
```

This supports the product's India-first, fiat-native approach.

The business should not have to change how it moves money merely because its financial state is represented through programmable infrastructure.

---

## 19. Architecture Principle

The architecture can be summarised as:

```text
Institutional Financial Reality
            ↓
      Bank Authentication
            ↓
       Financial State
            ↓
     State Versioning
            ↓
    Solana Programmable State
            ↓
    Controlled Asset Layer
            ↓
 Confidential Computation
            ↓
Capability / Verification / Workflows
            ↓
Facilities / Obligations
            ↓
Utilisation / Repayment
            ↓
Continuous Revalidation
```

The central architectural principle is:

> **Connect institutional authority with programmable infrastructure without replacing the institution.**

AssetAmplify therefore treats blockchain not as a replacement for financial infrastructure, but as a programmable layer around authenticated financial state.

```

This gives us a solid technical architecture without pretending that components such as the Solana program, Arcium integration, or bank APIs are already implemented. As we actually build them, we can update this document and record the changes in `CHANGELOG.md`.
```

