import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import axios from "axios";
export default function LoadingScreen({ onFinish }) {
  const [tip, setTip] = useState("Loading water safety tips...");

useEffect(() => {
  async function fetchTip() {
    try {
      const res = await axios.get("http://210.79.128.198:5000/api/users/v1/slogans");
      const response = res.data;
      // Access the slogan directly
      setTip(response.slogan || "Stay safe around water!");
    } catch (error) {
      console.error("Error fetching slogan:", error);
      setTip("Stay safe around water!"); // fallback tip
    }
  }

  fetchTip();

  const timer = setTimeout(() => onFinish(), 3000);
  return () => clearTimeout(timer);
}, [onFinish]);


  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-primary text-text-light text-center p-6">
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Droplets size={64} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold mt-6 mb-4"
      >
        WaterGuard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg italic text-accent"
      >
        {tip}
      </motion.p>
    </div>
  );
}