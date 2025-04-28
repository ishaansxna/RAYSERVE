
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { processPayment } from '../lib/api-service';

const Payment: React.FC = () => {
  const { toast } = useToast();
  
  const [paymentForm, setPaymentForm] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      await processPayment(paymentForm);
      
      setSuccess(true);
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      
      // Reset form
      setPaymentForm({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-700 mb-6">
            Your payment of ₹9,178.92 has been processed successfully.
            A receipt has been sent to your email.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="solar-btn-yellow w-full"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">
          Secure Payment Gateway
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-solar-dark text-white p-6">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-3">💳</span> Payment Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label htmlFor="cardHolder" className="block text-gray-700 mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={paymentForm.cardHolder}
                onChange={handleChange}
                placeholder="Name on card"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="cardNumber" className="block text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                required
                maxLength={16}
                pattern="\d{16}"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentForm.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                  required
                  maxLength={5}
                  pattern="\d{2}/\d{2}"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                  required
                  maxLength={3}
                  pattern="\d{3}"
                />
              </div>
            </div>

            <div className="bg-gray-800 text-white p-6 rounded-md mb-6">
              <div className="flex justify-between mb-2">
                <span>Solar Panel Installation</span>
                <span>₹8,499.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹679.92</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">₹9,178.92</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-solar-yellow text-solar-dark py-4 font-bold rounded hover:bg-opacity-90 transition-colors"
              disabled={processing}
            >
              {processing ? 'Processing Payment...' : 'Pay ₹9,178.92'}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Your payment information is secure. We use encryption to protect your data.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
