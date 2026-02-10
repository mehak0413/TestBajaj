/**
 * handlers.js — DOM event handlers.
 *
 * Glue between user interactions ↔ state ↔ API.
 * Keeps main.js thin and keeps DOM-event wiring in one place.
 */

import { setState, getState } from './state.js';
import { validate } from './validators.js';
import { postBfhl } from './api.js';

/* ── Operation change ─────────────────────────────────────────── */

export function onOperationChange(event) {
    const operation = event.target.value || null;
    setState({
        operation,
        input: '',
        error: null,
        result: null,
    });
}

/* ── Input change ─────────────────────────────────────────────── */

export function onInputChange(event) {
    setState({ input: event.target.value, error: null });
}

/* ── Form submit ──────────────────────────────────────────────── */

export async function onSubmit(event) {
    event.preventDefault();

    const { operation, input } = getState();

    // Guard: no operation selected
    if (!operation) {
        setState({ error: 'Please select an operation.' });
        return;
    }

    // Validate input
    const { valid, error, parsed } = validate(operation, input);
    if (!valid) {
        setState({ error });
        return;
    }

    // Call API
    setState({ loading: true, error: null, result: null });

    try {
        const response = await postBfhl(operation, parsed);
        setState({ loading: false, result: response });
    } catch (err) {
        setState({
            loading: false,
            error: err.message || 'Something went wrong. Please try again.',
        });
    }
}
