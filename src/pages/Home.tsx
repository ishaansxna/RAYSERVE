
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { submitQuoteRequest } from '../lib/api-service';

const Home: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitQuoteRequest(formData);
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you soon with a free quote!",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row min-h-[80vh] bg-gray-100">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-solar-dark mb-6">
              Solar Energy Solutions for a Sustainable Future
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              AUITS Solar helps you harness the power of the sun with innovative
              solar solutions that save money and protect our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/solutions" className="solar-btn text-center">
                Explore Solutions
              </Link>
              <Link to="/consultant" className="solar-btn-light text-center">
                Book a consultant
              </Link>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center">
          <div className="bg-solar-dark text-white p-8 rounded-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Get a Free Solar Quote</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 text-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-3 text-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 text-gray-800"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full p-3 text-gray-800"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-solar-yellow text-solar-dark font-bold p-3 uppercase hover:bg-opacity-90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Get My Free Quote'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
