// Thin client over the TaskFlow contract (spec/contracts/tasks-api.yaml).
// Only contract fields are sent/received — see ADR-001.
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || `request failed: ${res.status}`);
  return body;
}

export const api = {
  listTasks: () => request('/tasks'),
  createTask: (input) => request('/tasks', { method: 'POST', body: JSON.stringify(input) }),
  updateTask: (id, patch) => request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};
