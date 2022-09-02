import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
type authContextType = {
  user: boolean | null;
  login: () => void;
  logout: () => void;
  authReady: boolean;
};
type Props = {
  children: ReactNode;
};

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
};
const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null);
console.log("user11",user);

  useEffect(() => {
    netlifyIdentity.on("login",(user:any)=>{
      setUser(user);
      netlifyIdentity.close()
    })
    netlifyIdentity.init()
  }, [])
  
  const login = () => {
   netlifyIdentity.open()
  };

  const logout = () => {
    
  };

  const value = {
    user,
    login,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
