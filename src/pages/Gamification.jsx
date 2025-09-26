import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Award, Gift, ClipboardCheck, Upload, Clock, CheckCircle2, Star } from "lucide-react";
import { useGamification } from "../context/GamificationContext";
import AvatarCanvas from "../components/AvatarCanvas";

// --- Reusable Sub-component for Official Tasks ---
const OfficialTaskItem = ({ task }) => {
    const { submitTaskProof } = useGamification();
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            submitTaskProof(task.id, file);
        }
    };
    
    const renderButton = () => {
        switch(task.status) {
            case 'pending':
                return (
                    <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 text-sm font-bold rounded-lg transition text-white bg-secondary hover:bg-primary">
                        <Upload size={16} className="inline-block mr-1" />
                        Submit Proof
                    </button>
                );
            case 'awaiting_verification':
                return (
                    <div className="px-4 py-2 text-sm font-bold rounded-lg text-yellow-700 bg-yellow-100 flex items-center gap-2">
                        <Clock size={16} />
                        Verifying...
                    </div>
                );
            case 'completed':
                return (
                    <div className="px-4 py-2 text-sm font-bold rounded-lg text-green-700 bg-green-100 flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        Completed
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/50 p-4 rounded-xl shadow-sm gap-3">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
            <div className="flex items-center gap-3">
                <ClipboardCheck className="text-accent flex-shrink-0" />
                <div>
                    <p className="font-semibold">{task.task}</p>
                    <p className="text-sm font-bold text-secondary">+{task.points} Points</p>
                </div>
            </div>
            {renderButton()}
        </div>
    );
};

// --- Mock Data (can be moved to API later) ---
const rewards = [
  { name: "Digital Certificate of Appreciation", cost: 200 },
  { name: "Plant a Tree in Your Name", cost: 500 },
  { name: "₹50 Mobile Recharge Coupon", cost: 1000 },
];

const leaderboardData = [
    { name: "Village A", points: 1250 },
    { name: "My Village (You)", points: 1100 },
    { name: "Village C", points: 980 },
];

// --- Main Rewards Page Component ---
export default function Gamification({ isLoggedIn }) {
  const { points, badges, officialTasks, redeemReward } = useGamification();

  if (!isLoggedIn) {
    return (
      <div className="text-center p-10 max-w-2xl mx-auto">
        <Star size={48} className="mx-auto text-primary opacity-50" />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Rewards Hub</h2>
        <p className="mt-2 text-gray-500">Please log in to view your points, tasks, and rewards.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
      
      {/* --- Total Points & Achievements --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center">
          <p className="font-semibold text-text-dark/80">Your Current Points</p>
          <p className="text-7xl md:text-8xl font-black text-primary drop-shadow-lg">{points}</p>
        </div>
        <div className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-4 text-center">Your Achievements</h2>
            <div className="flex justify-center gap-4 md:gap-8">
                {badges.map((badge) => (
                <div key={badge.id} className={`text-center transition-opacity ${badge.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`p-4 rounded-full bg-white/50 ${badge.unlocked && 'ring-4 ring-accent'}`}>
                       <Award size={32} className={badge.unlocked ? 'text-secondary' : 'text-gray-500'} />
                    </div>
                    <p className="text-xs font-semibold mt-2">{badge.name}</p>
                </div>
                ))}
            </div>
        </div>
      </motion.div>

      {/* --- Official Community Tasks --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Official Community Tasks</h2>
        <div className="space-y-3">
            {officialTasks.length > 0 ? (
                officialTasks.map((task) => <OfficialTaskItem key={task.id} task={task} />)
            ) : (
                <p className="text-center text-gray-500">No official tasks available right now. Check back later!</p>
            )}
        </div>
      </motion.div>

      {/* --- Rewards Store --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Redeem Your Points</h2>
        <div className="space-y-3">
          {rewards.map((reward) => (
            <div key={reward.name} className="flex justify-between items-center bg-white/50 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <Gift className="text-accent" />
                <span className="font-semibold">{reward.name}</span>
              </div>
              <button 
                onClick={() => redeemReward(reward)}
                disabled={points < reward.cost}
                className="px-4 py-2 text-sm font-bold rounded-lg transition text-white bg-secondary disabled:bg-gray-300 disabled:text-gray-500 hover:bg-primary"
              >
                {reward.cost} pts
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- Leaderboard --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Community Leaderboard</h2>
        <ul className="space-y-2">
          {leaderboardData.map((item, index) => (
            <li key={index} className={`flex items-center p-4 rounded-xl shadow-sm ${item.name.includes("You") ? "bg-accent/50" : "bg-white/50"}`}>
              <span className="font-black text-primary text-xl w-8">{index + 1}</span>
              <span className="font-semibold flex-grow">{item.name}</span>
              <span className="font-bold text-secondary">{item.points} pts</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      {/* --- Subtle 3D Background Element --- */}
      <div className="fixed -bottom-64 -left-64 -z-10 opacity-10">
          <div className="w-[600px] h-[600px]">
            <AvatarCanvas modelUrl={'/character.glb'} />
          </div>
      </div>
    </div>
  );
}
