
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { updateDocument } from '../lib/db-service';
import { useToast } from '@/hooks/use-toast';

const Account: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    try {
      await updateDocument('users', currentUser.uid, {
        name: formData.name,
        phone: formData.phone
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  // If no user, show login prompt
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="mb-6">You need to be logged in to view your account.</p>
          <Link to="/login" className="solar-btn">Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-solar-dark text-center mb-8">
          User Account Management
        </h1>

        <div className="bg-solar-dark text-white p-8 rounded-t-lg">
          <div className="flex items-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mr-6">
              <span className="text-3xl text-solar-dark">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome, {userProfile?.name || 'Solar User'}</h2>
              <p className="text-gray-300">Manage your solar energy account</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Personal Information</h3>
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Phone:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="solar-btn">
                      Save Changes
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="solar-btn-light"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{userProfile?.name || 'John Smith'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{userProfile?.email || currentUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{userProfile?.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full border border-solar-dark text-solar-dark py-3 rounded hover:bg-gray-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Billing Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Plan:</span>
                  <span>Premium Solar</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Next Bill:</span>
                  <span>May 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>₹9,999.99</span>
                </div>
                <button className="w-full border border-solar-dark text-solar-dark py-3 rounded hover:bg-gray-50 transition-colors">
                  View Billing History
                </button>
              </div>

              <hr className="my-6" />

              <h3 className="text-xl font-bold mb-6">Security</h3>
              <div className="space-y-4">
                <button className="w-full border border-solar-dark text-solar-dark py-3 rounded hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
                <button className="w-full border border-solar-dark text-solar-dark py-3 rounded hover:bg-gray-50 transition-colors">
                  Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
