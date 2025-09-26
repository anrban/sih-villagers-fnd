import { useEffect, useState } from "react";
import StatusCard from "../components/StatusCard";
import ProtectedButton from "../components/ProtectedButton";
import { fetchDailyTip, fetchAlerts } from "../api";

export default function Dashboard({ isLoggedIn }) {
  const [tip, setTip] = useState("");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchDailyTip().then(setTip);
    fetchAlerts().then(setAlerts);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <StatusCard isSafe={true} />
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
        <h3 className="font-semibold">💡 Daily Water Safety Tip:</h3>
        <p>{tip}</p>
      </div>
      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
        <h3 className="font-semibold">🚨 Alerts:</h3>
        <ul className="list-disc ml-5">
          {alerts.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      <ProtectedButton label="View Reports" isLoggedIn={isLoggedIn} />
      <ProtectedButton label="Check Water Quality" isLoggedIn={isLoggedIn} />
      <ProtectedButton label="Daily Tasks" isLoggedIn={isLoggedIn} />
    </div>
  );
}
