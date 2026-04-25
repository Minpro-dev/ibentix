import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Mock or proxy to actual backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventService = {
  getEvent: async (id: string) => {
    // Simulated backend fetching for event details
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      id,
      title: 'Midnight Resonance 2024',
      date: 'Dec 14, 2024',
      location: 'Jakarta International Stadium',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIiGXht1R6RCDasnR4DFJE3w0NRwHp_9vGHNkcJCbOne8f9xFhMqntZRRBXWfN0qeqsXyEwlpvo_o3ndWj-pjBRbB68W57GocrIKwn8PpogTZ8AhghLC_Vlzt04bO_eEATpVAjqnYy3JqnMbMDCS6UtE1tkksONoM_CDhONFJPlMGJK0qcmx5rSRn3_3Rha_hcGTWgS-_rr1TQvlOekLxccM1h_44FD0iZZDxCop16C84vOpuRgczvU2QBp6phsZnHigmAMU6YCFcI',
      tickets: [
        { type: 'VIP Backstage', quantity: 2, price: 2500000 },
        { type: 'General Admission', quantity: 3, price: 850000 }
      ]
    };
  },

  getAvailableCoupons: async () => {
    // Simulated backend fetching
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      appCoupon: 'APP-DISCOUNT',
      eventVoucher: 'EVENT-BOOST'
    };
  },

  getSavedHolders: async () => {
    // Simulated backend fetching of previously saved profiles
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { fullName: 'Alex Rivera', email: 'alex.rivera@premium.com' },
      { fullName: 'Jordan Smith', email: 'j.smith@example.com' },
      { fullName: 'Casey Chen', email: 'casey.c@lifestyle.id' }
    ];
  },

  getUserPoints: async () => {
    // Simulated backend fetching of user points balance
    await new Promise(resolve => setTimeout(resolve, 400));
    return { balance: 2500 };
  },

  applyCoupon: async (couponCode: string) => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 800));
    if (couponCode.toUpperCase() === 'APP-DISCOUNT') {
      return { discount: 10000, message: 'Coupon applied successfully!' };
    }
    throw new Error('Invalid coupon code');
  },

  validateOrder: async (ticketHolders: any[], eventId: string) => {
    // Simulated backend validation of ticket holders
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Logic: If any email ends in @premium.com, add an extra dynamic benefit
    const hasPremium = ticketHolders.some(h => h.email?.toLowerCase().endsWith('@premium.com'));
    
    return {
      status: 'validated',
      validHolders: ticketHolders.length,
      dynamicBenefit: hasPremium ? 50000 : 0,
      quoteId: 'QUOTE-' + Math.random().toString(36).substr(2, 5).toUpperCase()
    };
  },
  
  processPayment: async (paymentData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase() };
  }
};

export const cloudinaryService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Must be configured in Cloudinary

    // This is the real Cloudinary endpoint, but requires a real cloud name and preset
    // const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`;
    
    // For now, let's mock the upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      secure_url: 'https://picsum.photos/seed/uploaded/800/600',
      public_id: 'mock_uploaded_id'
    };
  }
};

export default api;
