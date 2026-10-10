export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="neu fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-paper px-5 py-2.5 text-sm font-bold text-ink"
    >
      {message}
    </div>
  );
}
