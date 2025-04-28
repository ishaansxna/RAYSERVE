import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-solar-dark text-white pt-10 pb-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="text-xl font-bold mb-4">AUITS SOLAR</h3>
          <p className="text-sm mb-4">
            Leading provider of solar energy solutions for residential and commercial applications.
            Committed to a sustainable future.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-solar-yellow">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-solar-yellow">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-solar-yellow">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-solar-yellow">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-solar-yellow">Home</Link></li>
            <li><Link to="/solutions" className="hover:text-solar-yellow">Solutions</Link></li>
            <li><Link to="/ar-preview" className="hover:text-solar-yellow">AR Preview</Link></li>
            <li><Link to="/referral-program" className="hover:text-solar-yellow">Referral Program</Link></li>
            <li><Link to="/support" className="hover:text-solar-yellow">Support</Link></li>
            <li><Link to="/payment" className="hover:text-solar-yellow">Payment</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-2">📧</span>
              <a href="akshatudyam@gmail.com" className="hover:text-solar-yellow">akshatudyam@gmail.com</a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              <a href="+91 99117 91555" className="hover:text-solar-yellow">+91 99117 91555</a>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1">📍</span>
              <span>625 E Sec 17 Konark Enclave
              Vasundhara , Ghaziabad , UP-201012</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to receive updates on solar technology and special offers.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 w-full text-gray-700 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-solar-yellow text-solar-dark px-4 py-2 font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto mt-10 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">© 2025 AUITS Solar Pvt Ltd. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="text-sm hover:text-solar-yellow">Privacy Policy</Link>
          <Link to="/terms" className="text-sm hover:text-solar-yellow">Terms of Service</Link>
          <Link to="/cookies" className="text-sm hover:text-solar-yellow">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
