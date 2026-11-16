import apiService from "../api/apiService";
// Create a new booking
export const createBookingAPI = async (reqBody) => {
    return await apiService("POST", "/bookings", reqBody);
};

// Create Stripe Checkout session
export const createCheckoutSessionAPI = async (reqBody) => {
    return await apiService("POST", "/bookings/create-checkout-session", reqBody);
};

// Get all bookings of logged-in user
export const getMyBookingsAPI = async () => {
    return await apiService("GET", "/bookings/user");
};

// Get organization queue
export const getOrganizationQueueAPI = async (date, service, timeSlot) => {
    return await apiService("GET", "/bookings/organization", "", {
        params: {
            date,
            service,
            timeSlot
        }
    });
};

// Serve next token
export const serveNextAPI = async (date, service, timeSlot) => {
    return await apiService("PATCH", "/bookings/organization/next", {
        date,
        service,
        timeSlot
    });
};

// Cancel booking
export const cancelBookingAPI = async (id) => {
    return await apiService("PATCH", `/bookings/${id}/cancel`);
};


export const getQueueAvailabilityAPI = async (
  orgId,
  date,
  service,
  timeSlot
) => {
  return await apiService(
    "GET",
    `/organizations/${orgId}/queue-availability`,
    {},
    {
      params: { date, service, timeSlot }
    }
  );
};

// Check Stripe payment status
export const checkPaymentStatusAPI = async (sessionId) => {
    return await apiService(
        "GET",
        `/bookings/payment-status/${sessionId}`
    );
};