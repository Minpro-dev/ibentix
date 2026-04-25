import type { ReviewSubmission, EventSummary } from "../types/userType";

/**
 * Service to handle review-related backend operations.
 * In a real application, this would use fetch or axios to call an API.
 */
export const reviewService = {
  /**
   * Fetches the details of an event for the review page.
   */
  async getEventDetails(eventId: string): Promise<EventSummary> {
    // Simulating a backend call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: eventId,
          title: "Midnight Jazz & Blues: Rooftop Session",
          date: "Saturday, 24 Aug 2024",
          price: 350000,
          currency: "Rp",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAoQIh5QsKD42gSIUHtm9nAOJ-nQwTzW30IlrJohHYBmpl1v2J_qbHawjPMPo8H_0AcNHukcMcJpbfWp6ONVEIDIN2tvetj9NYNPv6RdTSMsFdQDF1f4JL_-rrJiXLr0U3bMwg-ue8EBSSWPdQU5bSvbD1xRRBxzLKufcHXvIYFtcyzW6TSJ24iFC_2MY2nyVhSRd9YMAvQgaMAybK9tIeYHlq4wCOTENn0d8ik77lUBY8nSh40v8NagO26s3KoMf-2mZjN63birlFN",
        });
      }, 500);
    });
  },

  /**
   * Submits a review to the backend.
   */
  async submitReview(
    submission: ReviewSubmission,
  ): Promise<{ success: boolean; message: string }> {
    console.log("Submitting review to backend:", submission);

    // Simulating a backend POST request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Here you would normally have:
        // const response = await fetch('/api/reviews', { method: 'POST', body: JSON.stringify(submission) });
        // return await response.json();

        resolve({
          success: true,
          message:
            "Your review has been successfully submitted. Thank you for your feedback!",
        });
      }, 1500);
    });
  },
};
