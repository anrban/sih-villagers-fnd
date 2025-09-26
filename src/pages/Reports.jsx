import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Activity, Thermometer, AlertCircle, Send } from "lucide-react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useGamification } from "../context/GamificationContext";
import AvatarCanvas from "../components/AvatarCanvas";

export default function Reports({ isLoggedIn }) {
  const [symptoms, setSymptoms] = useState({ fever: false, looseMotion: false, vomiting: false });
  const [offlineReports, setOfflineReports] = useState([]);
  const { addReport } = useGamification();
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition();

  // Load saved offline reports on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    setOfflineReports(saved);
  }, []);

  const handleToggle = (symptom) => {
    setSymptoms(prev => ({ ...prev, [symptom]: !prev[symptom] }));
  };
  
  const handleSubmit = () => {
    const reportData = { symptoms, notes: transcript, timestamp: new Date().toISOString() };
    
    // Check if user is online
    if (navigator.onLine) {
      console.log("Submitting online:", reportData);
      addReport(); // Award points
      // Here you would send the data to your real API
    } else {
      // Save report to localStorage if offline
      const updatedReports = [...offlineReports, reportData];
      localStorage.setItem('offlineReports', JSON.stringify(updatedReports));
      setOfflineReports(updatedReports);
      alert("You are offline. Report saved locally and will be synced later.");
    }
  };

  const handleSync = () => {
      if (!navigator.onLine) {
          alert("Please connect to the internet to sync.");
          return;
      }
      console.log("Syncing offline reports:", offlineReports);
      // Here you would send all reports in 'offlineReports' to your API
      alert(`Synced ${offlineReports.length} reports successfully!`);
      localStorage.removeItem('offlineReports');
      setOfflineReports([]);
  }

  if (!isLoggedIn) {
    return (
      <div className="text-center p-10 max-w-2xl mx-auto">
        <AlertCircle size={48} className="mx-auto text-primary opacity-50" />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Login Required</h2>
        <p className="mt-2 text-gray-500">Please log in to report symptoms and help your community.</p>
      </div>
    );
  }

  const symptomOptions = {
      fever: <Thermometer />,
      looseMotion: <Activity />,
      vomiting: <AlertCircle />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* --- Main Report Form --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-black text-primary text-center">Symptom Reporter</h1>
        <p className="text-center text-text-dark/70 mt-2">Select the symptoms you are experiencing.</p>
        
        {/* Symptom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {Object.keys(symptoms).map((symptom) => (
            <div
              key={symptom}
              onClick={() => handleToggle(symptom)}
              className={`p-6 rounded-2xl border-4 text-center cursor-pointer transition-all ${symptoms[symptom] ? 'bg-secondary border-primary text-white' : 'bg-white/50 border-transparent hover:border-accent'}`}
            >
              <div className="w-16 h-16 mx-auto bg-white/50 rounded-full flex items-center justify-center text-primary">
                {symptomOptions[symptom]}
              </div>
              <p className="font-bold text-lg mt-4 capitalize">{symptom.replace(/([A-Z])/g, ' $1')}</p>
            </div>
          ))}
        </div>

        {/* Voice Notes */}
        <div className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-2">Additional Notes (Optional)</h2>
            <div className="relative">
                <textarea 
                    value={transcript}
                    readOnly 
                    placeholder={isListening ? "Listening..." : "Press the mic to start speaking..."} 
                    className="w-full h-24 p-4 pr-16 rounded-lg bg-white/50 border-2 border-transparent focus:border-accent focus:outline-none transition"
                />
                {hasRecognitionSupport && (
                    <button 
                        onClick={isListening ? stopListening : startListening}
                        className={`absolute top-4 right-4 p-3 rounded-full transition ${isListening ? 'bg-red-500 animate-pulse' : 'bg-primary hover:bg-secondary'}`}
                    >
                        <Mic className="text-white" />
                    </button>
                )}
            </div>
        </div>

        <button onClick={handleSubmit} className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl text-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <Send />
            Submit Report & Earn Points
        </button>
      </motion.div>

      {/* --- Offline Sync Section --- */}
      {offlineReports.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 p-4 rounded-xl bg-yellow-500/10 text-center">
              <p className="font-semibold">You have {offlineReports.length} report(s) saved offline.</p>
              <button onClick={handleSync} className="mt-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-bold">Sync Now</button>
          </motion.div>
      )}

      {/* --- Subtle 3D Background Element --- */}
      <div className="fixed -bottom-48 -right-48 -z-10 opacity-10">
          <div className="w-[500px] h-[500px]">
            <AvatarCanvas modelUrl={'/character.glb'} />
          </div>
      </div>
    </div>
  );
}