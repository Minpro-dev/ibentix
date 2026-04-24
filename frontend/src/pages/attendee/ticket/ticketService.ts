import type { Order } from "../types/userType";

// ─── Config ─────────────────────────────────────────────────────────────────
// Adjust base URL to match your environment variable setup

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

function getAuthHeaders(): HeadersInit {
  // Adjust this to however you store your token (localStorage, cookie, context, etc.)
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// ─── Fetch all orders (with tickets + payment) for the current user ──────────
//
// Expected backend route: GET /orders/my
// Expected response shape:
// [
//   {
//     orderId, userId, eventId, paymentId, pointsUsed, ...
//     payment: { paymentId, paymentStatus, paymentProof, paymentAt, ... },
//     tickets: [{ ticketId, ticketCode, attendeeName, attendeeEmail, ... }],
//     event:   { eventId, name, startDate, endDate, location, imageUrl },
//   },
//   ...
// ]

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/orders/my`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as Order[];
}

// ─── Upload payment proof (sets status → WAITING_FOR_ADMIN_CONFIRMATION) ────
//
// Expected backend route: PATCH /payments/:orderId/proof
// Accepts: multipart/form-data with field `paymentProof`
// Returns the updated order object

export async function uploadPaymentProof(
  orderId: string,
  file: File,
): Promise<Order> {
  const formData = new FormData();
  formData.append("paymentProof", file);

  const res = await fetch(`${BASE_URL}/payments/${orderId}/proof`, {
    method: "PATCH",
    headers: getAuthHeaders(), // NOTE: do NOT set Content-Type; browser sets it with boundary
    body: formData,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to upload payment proof: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  return data as Order;
}

// ─── Update order payment status (organizer / cancel use-case) ──────────────
//
// Expected backend route: PATCH /payments/:orderId/status
// Body: { paymentStatus: "CANCELED" | "DONE" | "REJECTED" | ... }
// Returns the updated order object

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: string,
): Promise<Order> {
  const res = await fetch(`${BASE_URL}/payments/${orderId}/status`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentStatus }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to update payment status: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  return data as Order;
}
