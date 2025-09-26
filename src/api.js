export async function fetchDailyTip() {
  const tips = [
    "Boil water for 5 minutes before drinking.",
    "Wash hands before handling food.",
    "Avoid storing water in open containers.",
    "Check for leaks in water tanks regularly.",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

export async function fetchAlerts() {
  return ["Cholera outbreak nearby", "Heavy rainfall may affect water quality"];
}
