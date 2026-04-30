import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface UserData {
  fullName: string;
  phone: string;
  city: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setInternalUserData] = useState<UserData>({ fullName: '', phone: '', city: '' });

  const setUserData = useCallback((data: Partial<UserData>) => {
    setInternalUserData(prev => {
      // Avoid state updates if data hasn't changed
      const isChanged = Object.entries(data).some(([key, value]) => prev[key as keyof UserData] !== value);
      if (!isChanged) return prev;
      
      const updated = { ...prev, ...data };
      return updated;
    });
  }, []);

  const value = useMemo(() => ({
    userData,
    setUserData
  }), [userData, setUserData]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
