/**
 * state.js — Centralised, observable application state.
 *
 * Subscribers are notified whenever a value changes so the UI can react
 * without the rest of the code knowing anything about the DOM.
 */

const listeners = [];

const state = {
    operation: null,   // 'fibonacci' | 'prime' | 'lcm' | 'hcf' | 'AI' | null
    input: '',         // raw input string from the text-field
    loading: false,
    error: null,       // string | null
    result: null,      // any — the payload returned from the API
};

/**
 * Return a *shallow copy* of the current state (read-only snapshot).
 */
export function getState() {
    return { ...state };
}

/**
 * Merge `patch` into the state and notify every listener.
 * @param {Partial<typeof state>} patch
 */
export function setState(patch) {
    Object.assign(state, patch);
    listeners.forEach((fn) => fn(getState()));
}

/**
 * Register a callback that fires on every state change.
 * @param {(s: typeof state) => void} fn
 */
export function subscribe(fn) {
    listeners.push(fn);
}
