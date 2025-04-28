import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Logo from './Logo';
import { LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success('Successfully logged out! 👋');
    navigate('/');
  };
  
  return (
    <nav className="solar-header">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">AUITS SOLAR</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active-nav-link' : ''}`}>Home</Link>
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active-nav-link' : ''}`}>Dashboard</Link>
        <Link to="/ar-preview" className={`nav-link ${location.pathname === '/ar-preview' ? 'active-nav-link' : ''}`}>AR Preview</Link>
        <Link to="/account" className={`nav-link ${location.pathname === '/account' ? 'active-nav-link' : ''}`}>Account</Link>
        <Link to="/support" className={`nav-link ${location.pathname === '/support' ? 'active-nav-link' : ''}`}>Support</Link>
        <Link to="/referrals" className={`nav-link ${location.pathname === '/referrals' ? 'active-nav-link' : ''}`}>Referrals</Link>
        <Link to="/payment" className={`nav-link ${location.pathname === '/payment' ? 'active-nav-link' : ''}`}>Payment</Link>
        <Link to="/solutions" className={`nav-link ${location.pathname === '/solutions' ? 'active-nav-link' : ''}`}>Solutions</Link>
        
        {currentUser ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{currentUser.displayName}</p>
              <p className="text-xs text-gray-300 capitalize">{currentUser.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-solar-yellow text-solar-dark px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
