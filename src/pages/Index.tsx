
import React, { useEffect } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Home component
    navigate('/', { replace: true });
  }, [navigate]);

  // This is just a fallback, should immediately redirect to Home
  return <Home />;
};

export default Index;
