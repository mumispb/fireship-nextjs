import { createContext, useContext } from "react";
import { useAuth } from "../../helpers/hooks";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, username, loading, error, signIn, signOut] = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, username, loading, error, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error("useAuthContext must be used inside a TesteProvider.");
  }

  const { user, username, loading, error, signIn, signOut } = contextValue;

  return { user, username, loading, error, signIn, signOut };
}
