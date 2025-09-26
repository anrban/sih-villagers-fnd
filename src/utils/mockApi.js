// This simulates a database of water quality for various Indian cities.
const cityWaterData = {
  "new delhi": { pH: 7.2, contamination: "Low", tds: 180, smell: "None" },
  "mumbai": { pH: 6.9, contamination: "Low", tds: 250, smell: "Faint" },
  "bangalore": { pH: 7.5, contamination: "Very Low", tds: 120, smell: "None" },
  "chennai": { pH: 6.7, contamination: "Moderate", tds: 350, smell: "Noticeable" },
  "kolkata": { pH: 7.0, contamination: "Low", tds: 210, smell: "None" },
  "hyderabad": { pH: 7.8, contamination: "Very Low", tds: 150, smell: "None" },
};

// Simulates fetching live alerts
export const fetchAlerts = async () => {
  return [
    { id: 1, severity: "High", message: "Industrial spill reported near Yamuna River." },
    { id: 2, severity: "Medium", message: "High TDS levels detected in East District water supply." },
  ];
};

// Simulates searching for a city's water quality
export const searchCityWaterQuality = async (city) => {
  const normalizedCity = city.toLowerCase();
  if (cityWaterData[normalizedCity]) {
    return { city: city.charAt(0).toUpperCase() + city.slice(1), ...cityWaterData[normalizedCity] };
  }
  return null; // City not found
};
const officialTasksData = [
    { id: "ot1", task: "Participate in the village water survey", points: 100, status: 'pending' }, // status can be 'pending', 'awaiting_verification', 'completed'
    { id: "ot2", task: "Attend the water safety workshop", points: 150, status: 'pending' },
    { id: "ot3", task: "Photograph and report a leaking public pipe", points: 75, status: 'pending' },
];

// NEW: Async function to simulate fetching tasks from a server
export const fetchOfficialTasks = async () => {
  console.log("Fetching tasks from API...");
  // Simulate a 1-second network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(officialTasksData);
    }, 1000);
  });
};

export const registerUser = async (userDetails) => {
  console.log("Sending user details to backend API:", userDetails);
  
  // Simulate a network delay of 1.5 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real API, you would handle errors like "email already exists"
      console.log("Backend response: User registered successfully!");
      resolve({ success: true, message: "Registration successful! You can now log in." });
    }, 1500);
  });
};