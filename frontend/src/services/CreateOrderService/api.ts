import { toast } from "sonner";
import api from "../../api/axiosInstance";

export const eventService = {
  // Apply Coupon
  applyCoupon: async (couponCode: string) => {
    try {
      // Menggunakan post ke endpoint API asli
      const res = await api.post("/coupons/apply", { couponCode });
      
      toast.success("Coupon applied successfully!");
      return res.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Invalid coupon code";
      toast.error(errorMessage);
      console.log(error);
      throw error;
    }
  },

  // Process Payment
  processPayment: async (paymentData: any) => {
    try {
      const res = await api.post("/payments/process", paymentData);
      
      toast.success("Payment processed successfully!");
      return res.data;
    } catch (error: any) {
      toast.error("Payment failed. Please try again.");
      console.log(error);
      throw error;
    }
  },
};

export const cloudinaryService = {
  // Upload Image
  uploadImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const res = await api.post("/uploads/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully");
      return res.data;
    } catch (error) {
      toast.error("Failed to upload image");
      console.log(error);
      throw error;
    }
  },
};

export default api;