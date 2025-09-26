import { useState, useEffect } from 'react';

// A mock function to simulate fetching city from coordinates
const getCityFromCoords = async (latitude, longitude) => {
  // In a real app, you would use a reverse geocoding API here.
  // For this demo, we'll return a mock city.
  console.log(`Fetching city for coords: ${latitude}, ${longitude}`);
  return "New Delhi"; 
};

export function useLocation() {
  const [location, setLocation] = useState({
    city: "Loading...",
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ city: "Unknown", error: "Geolocation is not supported by your browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const city = await getCityFromCoords(position.coords.latitude, position.coords.longitude);
          setLocation({ city, error: null });
        } catch (err) {
          setLocation({ city: "Unknown", error: "Could not fetch city name." });
        }
      },
      () => {
        setLocation({ city: "Unknown", error: "Permission to access location was denied." });
      }
    );
  }, []);

  return location;
}