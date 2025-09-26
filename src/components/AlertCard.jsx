export default function AlertCard({ message }) {
  return (
    <div className="p-3 rounded-lg bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 mb-2">
      ⚠️ {message}
    </div>
  );
}
