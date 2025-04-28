// Mock API service for demo purposes
// In a real implementation, these would connect to your Node.js/Flask backend

// Solar production data API
export const fetchSolarProductionData = async (userId: string): Promise<any> => {
  // In a real app, this would be a fetch to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalProduction: 245,
        growth: 12,
        monthlyData: [
          { month: 'Jan', production: 120 },
          { month: 'Feb', production: 150 },
          { month: 'Mar', production: 200 },
          { month: 'Apr', production: 180 },
          { month: 'May', production: 220 },
          { month: 'Jun', production: 250 },
          { month: 'Jul', production: 245 },
          // More data would be here...
        ]
      });
    }, 500);
  });
};

// Chatbot API integration
export const sendChatMessage = async (message: string): Promise<string> => {
  // This would connect to your Flask backend for ML processing
  // For now, we'll use a mock response
  return new Promise((resolve) => {
    const responses = [
      "Our solar panels are highly efficient and can save you up to 90% on electricity bills.",
      "The installation process typically takes 1-2 days, and we handle all permits.",
      "Yes, we provide a 25-year warranty on all our solar panels.",
      "Our premium solar package starts at ₹85,000 for a basic setup.",
      "Solar energy can significantly reduce your carbon footprint and help combat climate change.",
      "We offer flexible financing options with low monthly payments.",
      "The government provides tax incentives and rebates for solar installations."
    ];
    
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      resolve(randomResponse);
    }, 1000);
  });
};

// AR Preview API
export const fetchARPreviewData = async (
  address: string, 
  userLocation?: {lat: number, lng: number} | null
): Promise<any> => {
  // This would connect to your backend for AR processing
  return new Promise((resolve) => {
    // If userLocation is available, we can use it for more accurate results
    const locationBasedData = userLocation ? 
      { accuracy: 'high', locationBased: true } : 
      { accuracy: 'standard', locationBased: false };
      
    setTimeout(() => {
      resolve({
        ...locationBasedData,
        panelType: 'Premium Solar XL',
        estimatedOutput: '8.5 kWh/day',
        coverage: '425 sq ft',
        savingsEstimate: '₹12,000/month',
        imageUrl: '/lovable-uploads/68b7d688-e3f2-463c-935f-19538f863f42.png'
      });
    }, 800);
  });
};

// Payment processing API
export const processPayment = async (paymentData: any): Promise<any> => {
  // This would connect to your payment gateway
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      if (paymentData.cardNumber && paymentData.cardNumber.length >= 16) {
        resolve({
          success: true,
          transactionId: 'TRX' + Math.floor(Math.random() * 1000000),
          message: 'Payment processed successfully'
        });
      } else {
        reject({
          success: false,
          error: 'Invalid card information'
        });
      }
    }, 1500);
  });
};

// Submit quote request
export const submitQuoteRequest = async (quoteData: any): Promise<any> => {
  // This would send the data to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        quoteId: 'Q' + Math.floor(Math.random() * 1000000),
        message: 'Quote request submitted successfully'
      });
    }, 1000);
  });
};
