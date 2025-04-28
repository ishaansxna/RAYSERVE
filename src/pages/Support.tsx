
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createSupportTicket } from '../lib/db-service';

const Support: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const ticketData = {
        ...ticketForm,
        userId: currentUser?.uid || 'guest',
        status: 'Open',
        createdAt: new Date().toISOString()
      };
      
      await createSupportTicket(ticketData);
      
      toast({
        title: "Support Ticket Submitted",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setTicketForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">
          Customer Support System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Live Chat */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-solar-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Live Chat</h2>
              <p className="text-gray-700 mb-6">
                Chat with our support team in real-time for immediate assistance.
              </p>
              <button 
                className="solar-btn w-full"
                onClick={() => {
                  toast({
                    title: "Chat Initiated",
                    description: "Please use the chat icon in the bottom right corner.",
                  });
                }}
              >
                Start Chat
              </button>
            </div>
          </div>
          
          {/* Knowledge Base */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-solar-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Knowledge Base</h2>
              <p className="text-gray-700 mb-6">
                Search our comprehensive database for answers to common questions.
              </p>
              <button className="solar-btn-light w-full">
                Browse Articles
              </button>
            </div>
          </div>
          
          {/* Phone Support */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-solar-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎧</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Phone Support</h2>
              <p className="text-gray-700 mb-6">
                Speak directly with our technical support specialists for complex issues.
              </p>
              <button className="solar-btn w-full">
                Call Support
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>
          
          <form onSubmit={handleSubmitTicket}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ticketForm.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ticketForm.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketForm.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={ticketForm.message}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="solar-btn"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
