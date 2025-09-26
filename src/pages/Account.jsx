import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, KeyRound, AtSign, Phone, LogOut, Loader2, Map, Home, Users, Hash } from "lucide-react";
import AvatarCanvas from "../components/AvatarCanvas"; // --- THIS IS THE FIX ---

const BASE_URL = "http://210.79.128.198:5000/api/users/v1";

export default function Account({ isLoggedIn, onLogin, onLogout }) {
  // State to manage which view to show: 'login' or 'register'
  const [view, setView] = useState('login');
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    villageName: "",
    mobile: "",
    email: "",
    password: "", // Added password for login/register
    state: "",
    district: "",
    family_members_count: "",
    pincode: "",
    gender: "",
    latitude: "",
    longitude: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // --- Autofill automatic data (runs when register view is shown) ---
  useEffect(() => {
    if (view === 'register') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setForm((prev) => ({
              ...prev,
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            }));
          },
          () => console.warn("Geolocation denied or unavailable")
        );
      }
    }
  }, [view]); // Reruns when the view changes to 'register'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      console.log("Attempting login with:", { email: form.email });
      // Here you would call your login API
      // For now, we'll just call the onLogin from App.jsx
      onLogin();
    } else {
      alert("Please enter both email and password.");
    }
  };

  // --- REGISTRATION LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = { ...form, device_info: navigator.userAgent };

    try {
      // In a real app, you would have a separate register API endpoint
      const response = await fetch(`${BASE_URL}/villagers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert("✅ Registration successful! Please log in with your new credentials.");
        setView('login'); // Switch to login view after success
        setForm({});     // Clear the form
      } else {
        alert(`❌ Registration failed: ${result?.message || "Unknown error"}`);
      }
    } catch (err) {
      setIsLoading(false);
      alert("⚠️ An error occurred. Please try again.");
    }
  };

  // --- PROFILE VIEW (for logged-in users) ---
  if (isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-48 h-48 mx-auto -mt-12">
                 <AvatarCanvas modelUrl={'/character.glb'} />
            </div>
            <h1 className="text-4xl font-black text-primary">Welcome Back!</h1>
            <p className="text-text-dark/70">Here you can manage your profile and settings.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <button onClick={onLogout} className="w-full max-w-sm mx-auto bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
              <LogOut size={18} />
              Logout
            </button>
        </motion.div>
      </div>
    );
  }

  // --- LOGIN & REGISTER FORMS ---
  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20"
      >
        {view === 'login' ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Welcome Back</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative"><AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
              <div className="relative"><KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors">Login</button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <span onClick={() => setView('register')} className="font-bold text-secondary cursor-pointer hover:underline">
                Register Here
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
                <div className="relative"><AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
                <div className="relative"><KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
                <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="tel" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
                <div className="relative"><Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" name="villageName" placeholder="Village Name" value={form.villageName} onChange={handleChange} required className="w-full p-3 pl-12 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/></div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/>
                    <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition bg-white/50"><option value="">Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="district" placeholder="District" value={form.district} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/>
                    <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/>
                    <input type="number" name="family_members_count" placeholder="Family Members" value={form.family_members_count} onChange={handleChange} required className="w-full p-3 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"/>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors flex justify-center items-center gap-2 disabled:bg-gray-400">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <span onClick={() => setView('login')} className="font-bold text-secondary cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}