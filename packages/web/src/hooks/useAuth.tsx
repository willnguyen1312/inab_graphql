import { useEffect, useState } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState();
  useEffect(() => {
    setTimeout(() => {
      setAuth(false);
    }, 1500);
  }, []);

  return auth;
};

export default useAuth;
