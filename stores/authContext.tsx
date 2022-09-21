import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import netlifyIdentity from "netlify-identity-widget";
type authContextType = {
  user: any;
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
  const [user, setUser] = useState<{} | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(true);
  useEffect(() => {
    netlifyIdentity.on("login", (user: any) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    netlifyIdentity.on("init", () => {
      setUser(user);
      setAuthReady(true);
    });

    netlifyIdentity.init();
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const value: any = {
    user,
    login,
    logout,
    authReady,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
