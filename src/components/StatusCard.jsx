import { motion } from "framer-motion";

export default function StatusCard({ isSafe }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 bg-white rounded-2xl shadow-md text-center"
    >
      <h2 className="text-lg font-semibold">Your Water Status</h2>
      <p className={`mt-2 text-2xl font-bold ${isSafe ? "text-green-600" : "text-red-600"}`}>
        {isSafe ? "✅ Safe" : "❌ Unsafe"}
      </p>
    </motion.div>
  );
}
