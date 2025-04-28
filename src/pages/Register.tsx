
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '../lib/auth-service';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear password error if user is typing in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (form.password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await registerUser(form.email, form.password, form.name);
      toast({
        title: "Registration Successful",
        description: "Welcome to Ishaan Solar! You are now logged in.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div className="bg-solar-dark p-8 text-center">
          <div className="inline-block bg-solar-yellow rounded-full p-3 mb-4">
            <img src="/lovable-uploads/1ab3810f-b607-476c-bcce-b70f74d51956.png" alt="Ishaan Solar Logo" className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-300 mt-2">Join Ishaan Solar for a sustainable future</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full p-3 border rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full p-3 border rounded focus:ring-2 focus:ring-solar-yellow focus:outline-none ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" required />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-solar-dark hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-solar-dark hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-solar-yellow text-solar-dark py-3 rounded font-bold hover:bg-opacity-90 transition-colors"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="text-solar-dark hover:underline font-medium">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
