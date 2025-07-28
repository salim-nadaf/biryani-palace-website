import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  area: string;
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
  console.log("✅ login() function triggered", userData);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzINXRZubnvcWpUEZN2A5y3C8DdHPUb_vUs01Wi7KleWcChPdsx9FlnqPhmLkdyu-Wa/exec', {
      method: 'POST',
      mode: 'no-cors', // 🚨 IMPORTANT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        area: userData.area,
        timestamp: new Date().toISOString()
      }),
    });

    console.log("✅ Webhook POST sent (no-cors)");
    setUser(userData);
    localStorage.setItem('biryaniPalaceUser', JSON.stringify(userData));
  } catch (error) {
    console.error("❌ Error sending to webhook:", error);
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
