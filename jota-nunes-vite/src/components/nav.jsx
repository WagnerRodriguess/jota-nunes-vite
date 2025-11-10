import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Nav({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-red-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-red-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* Aqui você pode colocar outros botões de ação se quiser */}
      </div>
    </nav>
  );
}
