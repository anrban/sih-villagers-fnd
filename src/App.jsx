import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Gamification from "./pages/Gamification";
import Account from "./pages/Account";
import LoadingScreen from "./components/LoadingScreen";
import { GamificationProvider } from "./context/GamificationContext";
// import LanguageSelector from "water-safety-web/src/components/LanguageSelector";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLoggedIn(auth === "true");
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  };

  return (
    <GamificationProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar isLoggedIn={isLoggedIn} />
          <main className="flex-grow p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="/reports" element={<Reports isLoggedIn={isLoggedIn} />} />
              <Route path="/gamification" element={<Gamification isLoggedIn={isLoggedIn} />} />
              <Route
                path="/account"
                element={
                  <Account
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GamificationProvider>
  );
}

export default App;