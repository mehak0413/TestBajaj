/**
 * main.js — Application entry-point.
 *
 * Wires DOM elements to handlers and subscribes to state changes
 * so the UI stays in sync.
 */

import { subscribe, getState } from './state.js';
import { onOperationChange, onInputChange, onSubmit } from './handlers.js';

/* ── DOM references ───────────────────────────────────────────── */

const radioButtons = document.querySelectorAll('input[name="operation"]');
const inputSection = document.getElementById('input-section');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputHint = document.getElementById('input-hint');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('bfhl-form');
const errorBox = document.getElementById('error-box');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const loadingOverlay = document.getElementById('loading-overlay');

/* ── Input meta per operation ─────────────────────────────────── */

const INPUT_META = {
    fibonacci: { label: 'Enter a number', placeholder: 'e.g. 7', type: 'text' },
    prime: { label: 'Enter comma-separated numbers', placeholder: 'e.g. 2, 4, 7, 9', type: 'text' },
    lcm: { label: 'Enter comma-separated numbers', placeholder: 'e.g. 12, 18, 24', type: 'text' },
    hcf: { label: 'Enter comma-separated numbers', placeholder: 'e.g. 24, 36, 60', type: 'text' },
    AI: { label: 'Enter your question', placeholder: 'e.g. What is the capital of Maharashtra?', type: 'text' },
};

/* ── Render helpers ───────────────────────────────────────────── */

function renderInput(state) {
    if (!state.operation) {
        inputSection.classList.add('hidden');
        submitBtn.disabled = true;
        return;
    }

    const meta = INPUT_META[state.operation];
    inputLabel.textContent = meta.label;
    inputField.placeholder = meta.placeholder;
    inputField.type = meta.type;
    inputField.value = state.input;
    inputHint.textContent = '';
    inputSection.classList.remove('hidden');
    submitBtn.disabled = false;
}

function renderError(state) {
    if (state.error) {
        errorBox.textContent = state.error;
        errorBox.classList.remove('hidden');
    } else {
        errorBox.textContent = '';
        errorBox.classList.add('hidden');
    }
}

function renderResult(state) {
    if (!state.result) {
        resultSection.classList.add('hidden');
        return;
    }

    resultSection.classList.remove('hidden');
    const res = state.result;

    if (!res.is_success) {
        resultContent.innerHTML = '';
        const errP = document.createElement('p');
        errP.className = 'result-error';
        errP.textContent = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
        resultContent.appendChild(errP);
        resultSection.classList.add('result-fail');
        resultSection.classList.remove('result-ok');
        return;
    }

    resultSection.classList.remove('result-fail');
    resultSection.classList.add('result-ok');
    resultContent.innerHTML = '';

    // Email badge
    if (res.official_email) {
        const badge = document.createElement('span');
        badge.className = 'email-badge';
        badge.textContent = res.official_email;
        resultContent.appendChild(badge);
    }

    // Data
    const dataEl = document.createElement('div');
    dataEl.className = 'result-data';

    if (Array.isArray(res.data)) {
        const label = document.createElement('p');
        label.className = 'result-label';
        label.textContent = 'Result:';
        dataEl.appendChild(label);

        const list = document.createElement('div');
        list.className = 'result-array';
        res.data.forEach((item) => {
            const chip = document.createElement('span');
            chip.className = 'array-chip';
            chip.textContent = item;
            list.appendChild(chip);
        });
        dataEl.appendChild(list);
    } else {
        const label = document.createElement('p');
        label.className = 'result-label';
        label.textContent = 'Answer:';
        dataEl.appendChild(label);

        const value = document.createElement('p');
        value.className = 'result-value';
        value.textContent = res.data;
        dataEl.appendChild(value);
    }

    resultContent.appendChild(dataEl);
}

function renderLoading(state) {
    if (state.loading) {
        loadingOverlay.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        loadingOverlay.classList.add('hidden');
        submitBtn.disabled = !state.operation;
    }
}

/* ── State subscriber ────────────────────────────────────────── */

function render(state) {
    renderInput(state);
    renderError(state);
    renderResult(state);
    renderLoading(state);
}

/* ── Initialise ──────────────────────────────────────────────── */

function init() {
    // Event listeners — radio buttons
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', onOperationChange);
    });

    inputField.addEventListener('input', onInputChange);
    form.addEventListener('submit', onSubmit);

    // Subscribe to state updates
    subscribe(render);

    // Initial render
    render(getState());
}

document.addEventListener('DOMContentLoaded', init);
