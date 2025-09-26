import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchOfficialTasks } from "../utils/mockApi"; // Import the new API function

// ... (initialBadges and initialTasks remain the same)
const initialBadges = [
  { id: "b1", name: "First Report", unlocked: false },
  { id: "b2", name: "Community Helper", unlocked: false },
  { id: "b3", name: "Safety Champion", unlocked: false },
];
const initialTasks = [
  { id: "t1", task: "Submit one water report", points: 10, completed: false },
  { id: "t2", task: "Read a daily safety tip", points: 5, completed: false },
];


const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const [points, setPoints] = useState(100);
  const [badges, setBadges] = useState(initialBadges);
  const [tasks, setTasks] = useState(initialTasks);
  const [officialTasks, setOfficialTasks] = useState([]); // Will be populated from API
  const [lastReportTime, setLastReportTime] = useState(null);

  // Fetch official tasks from the API when the app loads
  useEffect(() => {
    fetchOfficialTasks().then(data => setOfficialTasks(data));
  }, []);

  // NEW: Function to handle submitting proof for a task
  const submitTaskProof = (taskId, proofFile) => {
    if (!proofFile) {
        alert("Please select a file to upload as proof.");
        return;
    }
    console.log(`Submitting proof for task ${taskId}:`, proofFile.name);

    // 1. Change the task's status to 'awaiting_verification'
    setOfficialTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: 'awaiting_verification' } : t))
    );
    alert("Proof submitted! Your submission is now awaiting verification.");

    // 2. Simulate the verification process
    // In a real app, a government official would approve this from a separate admin panel.
    // Here, we'll auto-approve it after 5 seconds to demonstrate the flow.
    setTimeout(() => {
        const task = officialTasks.find(t => t.id === taskId);
        if (task) {
            // 3. Mark as completed and award points
            setOfficialTasks(prev => 
                prev.map(t => (t.id === taskId ? { ...t, status: 'completed' } : t))
            );
            setPoints(p => p + task.points);
            
            // 4. Unlock "Community Helper" badge
            const helperBadge = badges.find(b => b.id === 'b2');
            if(!helperBadge.unlocked){
                setBadges(prev => prev.map(b => (b.id === 'b2' ? { ...b, unlocked: true } : b)));
            }

            // Using a system notification instead of an alert
            console.log(`Task "${task.task}" approved! +${task.points} points awarded.`);
        }
    }, 5000); // 5-second delay for simulated verification
  };

  // ... (addReport, completeTask, and redeemReward functions remain the same)
  const addReport = () => { /* ... */ };
  const completeTask = (taskId) => { /* ... */ };
  const redeemReward = (reward) => { /* ... */ };

  const value = {
    points,
    badges,
    tasks,
    officialTasks,
    addReport,
    completeTask,
    submitTaskProof, // The new function
    redeemReward,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};