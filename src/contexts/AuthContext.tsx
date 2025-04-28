import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getDocument } from '../lib/db-service';

export interface ExtendedUser {
  uid?: string;
  email: string;
  displayName: string;
  role: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: any;
  providerData?: any[];
  refreshToken?: string;
  tenantId?: string | null;
  delete?: () => Promise<void>;
  getIdToken?: (forceRefresh?: boolean) => Promise<string>;
  getIdTokenResult?: (forceRefresh?: boolean) => Promise<any>;
  reload?: () => Promise<void>;
  toJSON?: () => object;
}

interface AuthContextType {
  currentUser: ExtendedUser | null;
  userProfile: any | null;
  loading: boolean;
  requireAuth: (redirectPath?: string) => void;
  setCurrentUser: (user: ExtendedUser | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  requireAuth: () => {},
  setCurrentUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check Firebase auth
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get user profile data which should contain the role
          const profile = await getDocument('users', user.uid);
          
          // Convert Firebase User to ExtendedUser by adding the role
          const extendedUser: ExtendedUser = {
            ...user,
            email: user.email || '',
            displayName: user.displayName || '',
            role: profile?.role || 'customer', // Default to 'customer' if no role found
          };
          
          setCurrentUser(extendedUser);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        // If no Firebase user, check localStorage for our dummy user
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setUserProfile(user);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // This function can be called from any component to check if user is authenticated
  // But we're not using it for access control now as per requirements
  const requireAuth = (redirectPath: string = '/login') => {
    return true; // Always allow access as requested
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    requireAuth,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
