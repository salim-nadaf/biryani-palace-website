import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('biryaniPalaceUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (userData: User) => {
    try {
      // Save to Google Sheets via webhook
      const response = await fetch('https://script.google.com/macros/s/AKfycbzYourWebhookURL/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          timestamp: new Date().toISOString()
        }),
      });

      // Note: Google Apps Script CORS may require no-cors mode
      // await response.json(); // Uncomment when webhook is set up

      // Save user to state and localStorage
      setUser(userData);
      localStorage.setItem('biryaniPalaceUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      // Still save locally even if sheet fails
      setUser(userData);
      localStorage.setItem('biryaniPalaceUser', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('biryaniPalaceUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};