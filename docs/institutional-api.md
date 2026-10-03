Issuing Bank
     │
     │ Authorised API
     ▼
AssetAmplify Integration Layer
     │
     ├── Authenticate response
     ├── Validate schema
     ├── Identify instrument
     ├── Read lifecycle status
     ├── Compare state version
     └── Record provenance
     │
     ▼
Financial State
     │
     ▼
Solana Financial State

{
  "instrument_type": "BANK_GUARANTEE",
  "instrument_id": "BG-EXAMPLE-001",
  "issuing_bank": "EXAMPLE_BANK",
  "amount": {
    "value": 1000000000,
    "currency": "INR"
  },
  "status": "ACTIVE",
  "issue_date": "2026-09-01",
  "expiry_date": "2027-08-31",
  "state_version": 1,
  "verification": {
    "status": "BANK_AUTHENTICATED",
    "verified_at": "2026-10-01T10:30:00Z"
  }
}

API Response V1
₹10 Cr — ACTIVE
       ↓
Bank amendment
       ↓
API Response V2
₹7 Cr — ACTIVE
       ↓
Financial State V2
       ↓
Dependent capability revalidation


GET /institutional/instruments/{instrument_id}

        ↓

Authenticate API response

        ↓

Validate instrument + lifecycle data

        ↓

Compare with current Financial State

        ↓

If materially changed:
    create new state version
    preserve previous version
    record provenance
    trigger dependency revalidation

        ↓

Update programmable state
