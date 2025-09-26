export default function ProtectedButton({ label, isLoggedIn }) {
  return (
    <button
      className={`w-full p-4 mt-3 rounded-xl font-semibold transition 
      ${isLoggedIn 
        ? "bg-blue-500 text-white hover:bg-blue-600" 
        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      disabled={!isLoggedIn}
    >
      {label}
    </button>
  );
}
