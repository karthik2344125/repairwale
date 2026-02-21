import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('repairwale_user');
      const userRole = await AsyncStorage.getItem('rw_role_locked');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (userRole) {
        setRole(userRole);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulate login
    const userData = {
      email,
      fullName: email.split('@')[0],
      id: `user_${Date.now()}`,
    };

    await AsyncStorage.setItem('repairwale_user', JSON.stringify(userData));
    await AsyncStorage.setItem('repairwale_token', `token_${Date.now()}`);
    setUser(userData);
    return userData;
  };

  const selectRole = async (selectedRole) => {
    await AsyncStorage.setItem('rw_role_locked', selectedRole);
    setRole(selectedRole);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([
      'repairwale_user',
      'repairwale_token',
      'rw_role_locked',
      'rw_customer',
      'rw_mechanic',
    ]);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, selectRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
