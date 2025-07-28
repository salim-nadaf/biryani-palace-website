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
  isReturning: boolean | null;
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
    const response = await fetch('https://script.google.com/macros/s/AKfycbxStXZoUqkx-kNXk2r6d4qbTBtbIQeATEsRCl-BtbJiKFGpEyPghRWTvnEl7l6IfTiF/exec', {
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
    
const result = await response.json();

    setUser(userData);
    localStorage.setItem('biryaniPalaceUser', JSON.stringify(userData));
    localStorage.setItem('biryaniPalaceReturning', JSON.stringify(result.returningUser));
    setIsReturning(result.returningUser); // ✅ capture status
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    setUser(userData);
    setIsReturning(false); // assume new if error
    localStorage.setItem('biryaniPalaceUser', JSON.stringify(userData));
  }
};
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
      isReturning
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
