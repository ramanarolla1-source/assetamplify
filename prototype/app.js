(() => {
  "use strict";

  // All responses are local mock data. This demo does not call a bank or external API.
  const initialState = {
    instrument: {
      instrument_id: "AA-DEMO-BG-001",
      instrument_type: "BG",
      issuing_institution: "Example Bank Ltd.",
      applicant: "Example Infrastructure Pvt. Ltd.",
      beneficiary: "Example Projects Ltd."
    },
    financial_state: {
      amount: 1000000000,
      currency: "INR",
      status: "ACTIVE",
      issue_date: "2026-01-15",
      expiry_date: "2027-01-14",
      state_version: 1
    },
    authentication: {
      status: "SIMULATED",
      source_type: "MOCK_INSTITUTIONAL_API",
      source_reference: "MOCK-BANK-REF-001",
      authenticated_at: "Demo session"
    },
    provenance: {
      previous_state_version: null,
      state_event: "ISSUED",
      change_reason: "Initial illustrative state"
    }
  };

  const mockAmendmentResponse = {
    instrument_id: "AA-DEMO-BG-001",
    source: "MOCK_INSTITUTIONAL_API",
    event: "REDUCTION",
    amount: 700000000,
    currency: "INR",
    status: "ACTIVE",
    source_reference: "MOCK-BANK-REF-002",
    change_reason: "Simulated authorised amendment"
  };

  let currentState = structuredClone(initialState);
  let history = [structuredClone(initialState)];
  let hasAmended = false;

  const $ = (id) => document.getElementById(id);
  const amountCr = (amount) => (amount / 100000000).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const safeText = (value) => String(value);

  function renderCurrentState() {
    const state = currentState.financial_state;
    $("current-amount").innerHTML = `₹${amountCr(state.amount)} <small>Cr</small>`;
    $("version-tag").textContent = `VERSION ${state.state_version}`;
    $("version-number").textContent = `V${state.state_version}`;
    $("current-status-text").textContent = state.status === "ACTIVE" ? "Active financial state" : state.status;
    $("instrument-status").innerHTML = `<span></span> ${safeText(state.status)}`;
    $("version-count").textContent = `${history.length} recorded version${history.length === 1 ? "" : "s"}`;
  }

  function renderHistory() {
    const grid = $("version-grid");
    grid.replaceChildren();
    history.slice().reverse().forEach((snapshot, index) => {
      const state = snapshot.financial_state;
      const provenance = snapshot.provenance;
      const card = document.createElement("article");
      card.className = "version-card" + (index === 0 ? " current-version" : "");
      const head = document.createElement("div");
      head.className = "version-head";
      const tag = document.createElement("span");
      tag.className = "version-tag";
      tag.textContent = `V${state.state_version} · ${index === 0 ? "LATEST" : "HISTORICAL"}`;
      head.append(tag);
      if (index === 0) {
        const badge = document.createElement("span");
        badge.className = "small-state";
        badge.textContent = "CURRENT";
        head.append(badge);
      }
      const amount = document.createElement("div");
      amount.className = "version-amount";
      amount.textContent = `₹${amountCr(state.amount)} Cr`;
      const status = document.createElement("div");
      status.className = "version-state";
      status.textContent = state.status;
      const description = document.createElement("p");
      description.textContent = index === 0 ? "Latest financial-state snapshot" : "Preserved prior state";
      const eventRow = document.createElement("div");
      eventRow.className = "version-meta";
      const eventLabel = document.createElement("span");
      eventLabel.textContent = "Event";
      const eventValue = document.createElement("strong");
      eventValue.textContent = provenance.state_event;
      eventRow.append(eventLabel, eventValue);
      const previousRow = document.createElement("div");
      previousRow.className = "version-meta";
      const previousLabel = document.createElement("span");
      previousLabel.textContent = "Previous version";
      const previousValue = document.createElement("strong");
      previousValue.textContent = provenance.previous_state_version == null ? "None" : `V${provenance.previous_state_version}`;
      previousRow.append(previousLabel, previousValue);
      card.append(head, amount, status, description, eventRow, previousRow);
      grid.append(card);
    });
  }

  function addLog(title, detail, timeLabel) {
    const item = document.createElement("li");
    const marker = document.createElement("span");
    marker.className = "log-marker";
    const content = document.createElement("div");
    const heading = document.createElement("strong");
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    const time = document.createElement("time");
    time.textContent = timeLabel || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    content.append(heading, paragraph, time);
    item.append(marker, content);
    $("event-log").prepend(item);
  }

  function setRevalidationRequired() {
    const panel = $("revalidation-panel");
    panel.classList.add("needs-review");
    $("revalidation-icon").textContent = "!";
    $("revalidation-title").textContent = "Material change detected — review required";
    $("review-chip").textContent = "REVALIDATION REQUIRED";
    $("review-chip").classList.add("pending");
    $("revalidation-copy").textContent = "The guarantee amount changed from ₹10 Cr to ₹7 Cr. Any dependent capability assessment is now marked for review. This is a review flag, not a lending decision or automatic facility adjustment.";
  }

  function simulateAmendment() {
    if (hasAmended) return;
    $("amend-button").disabled = true;
    $("action-feedback").textContent = "Processing mock institutional response…";

    // Synchronous local simulation: no network request is made.
    const response = structuredClone(mockAmendmentResponse);
    if (response.instrument_id !== currentState.instrument.instrument_id) {
      $("action-feedback").textContent = "Update rejected: instrument ID mismatch.";
      $("amend-button").disabled = false;
      return;
    }
    if (response.currency !== currentState.financial_state.currency) {
      $("action-feedback").textContent = "Update rejected: currency mismatch.";
      $("amend-button").disabled = false;
      return;
    }
    if (response.amount === currentState.financial_state.amount &&
        response.status === currentState.financial_state.status) {
      $("action-feedback").textContent = "No material change detected.";
      $("amend-button").disabled = false;
      return;
    }

    const previousVersion = currentState.financial_state.state_version;
    const nextState = structuredClone(currentState);
    nextState.financial_state.amount = response.amount;
    nextState.financial_state.status = response.status;
    nextState.financial_state.state_version = previousVersion + 1;
    nextState.authentication = {
      status: "SIMULATED",
      source_type: response.source,
      source_reference: response.source_reference,
      authenticated_at: new Date().toISOString()
    };
    nextState.provenance = {
      previous_state_version: previousVersion,
      state_event: response.event,
      change_reason: response.change_reason
    };

    // Keep the original snapshot and append the new version; never overwrite history.
    currentState = nextState;
    history.push(structuredClone(nextState));
    hasAmended = true;
    renderCurrentState();
    renderHistory();
    setRevalidationRequired();
    addLog("Mock amendment received", "V1 ₹10 Cr → V2 ₹7 Cr · ACTIVE · SIMULATED", "Just now");
    addLog("Dependent capability flagged", "Material amount change detected; review required before further use.", "Just now");
    $("action-feedback").textContent = "Mock update processed. V2 is current; V1 remains in history. Dependent capability review is required.";
    $("amend-button").textContent = "Amendment Applied";
    $("reset-button").hidden = false;
  }

  function resetDemo() {
    currentState = structuredClone(initialState);
    history = [structuredClone(initialState)];
    hasAmended = false;
    renderCurrentState();
    renderHistory();
    $("revalidation-panel").classList.remove("needs-review");
    $("revalidation-icon").textContent = "✓";
    $("revalidation-title").textContent = "No material change detected";
    $("review-chip").textContent = "NOT TRIGGERED";
    $("review-chip").classList.remove("pending");
    $("revalidation-copy").textContent = "No dependent capability review has been triggered in this session. A financial-state amount is not itself a credit approval or facility.";
    $("event-log").replaceChildren();
    addLog("Initial state loaded", "Mock Financial State V1 · ₹10 Cr · ACTIVE", "Demo start");
    $("action-feedback").textContent = "Demo reset. Ready to receive a simulated institutional update.";
    $("amend-button").disabled = false;
    $("amend-button").innerHTML = 'Simulate Bank Amendment <span>→</span>';
    $("reset-button").hidden = true;
  }

  $("amend-button").addEventListener("click", simulateAmendment);
  $("reset-button").addEventListener("click", resetDemo);
  renderCurrentState();
  renderHistory();
})();