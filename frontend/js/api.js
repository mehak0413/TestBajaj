/**
 * api.js — Single-responsibility: all network requests live here.
 * Backend base URL is configured once in BASE_URL.
 */

const BASE_URL = 'http://localhost:3000';

/**
 * POST /bfhl
 * @param {string} operation  – one of fibonacci, prime, lcm, hcf, AI
 * @param {*}      value      – number | number[] | string
 * @returns {Promise<object>} parsed JSON response
 */
export async function postBfhl(operation, value) {
  const response = await fetch(`${BASE_URL}/bfhl`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [operation]: value }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData && errorData.data
        ? errorData.data
        : `Server error (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * GET /health
 * @returns {Promise<object>}
 */
export async function getHealth() {
  const response = await fetch(`${BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`Health-check failed (${response.status})`);
  }

  return response.json();
}
