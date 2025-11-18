import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    
    if (role) {
      setUser({ role: role });
    }
  }, []); 


  return { user };
};
