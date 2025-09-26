import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // For demo: accept any credentials
    setUser({ name: credentials.name || "User", phone: credentials.phone });
  };

  const logout = () => setUser(null);

  return { user, login, logout };
}
