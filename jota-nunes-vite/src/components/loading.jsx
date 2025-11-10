export default function LoadingModal({ message = "Entrando..." }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
