import { X } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/axios";

export default function EditarObraModal({
  isOpen,
  onClose,
  projeto,
  refData, // Adiciona o refData completo da obra
  referentials, // Adiciona os referentials para buscar os nomes
  onUpdated,
}) {
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (projeto) {
      setProjectName(projeto.project_name || "");
      setLocation(projeto.location || "");
      setDescription(projeto.description || "");
    }
  }, [projeto]);

  if (!isOpen || !projeto) return null;

  const handleSave = async () => {
    setSalvando(true);
    try {
      const payload = {
        project_name: projectName,
        location,
        description,
      };

      const res = await api.patch(`/constructions/${projeto.id}/`, payload);
      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error("Erro ao editar obra", err);
      alert("Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-11/12 max-w-3xl rounded-2xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          Editar Obra — {projeto.project_name}
        </h2>

        {/* Campos básicos */}
        <label className="font-medium">Nome do Projeto</label>
        <input
          className="w-full border rounded-lg p-2 mb-3"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <label className="font-medium">Localização</label>
        <input
          className="w-full border rounded-lg p-2 mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="font-medium">Descrição</label>
        <textarea
          className="w-full border rounded-lg p-2 mb-3"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Observações */}
        {projeto.observations?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold">Observações</h3>
            <ul className="list-disc ml-5 text-sm">
              {projeto.observations.map((obs, idx) => (
                <li key={idx}>{obs.description}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Estrutura completa da obra */}
        {projeto.selectedReferentials?.length > 0 && (
          <div className="space-y-4 mb-4">
            <h3 className="font-bold text-lg">Estrutura da Obra</h3>
            {projeto.selectedReferentials.map((refId) => {
              const ref = referentials.find((r) => r.id === refId);
              return (
                <div
                  key={refId}
                  className="border border-gray-300 rounded-xl p-4 bg-gray-50"
                >
                  <h4 className="font-semibold text-lg">
                    Referencial:{" "}
                    {ref?.name || ref?.referential_name?.name || "Sem nome"}
                  </h4>

                  {/* Áreas */}
                  {refData[refId]?.areas?.map((area) => (
                    <div key={area.id} className="mt-3 ml-3 border-l pl-3">
                      <p className="font-medium text-blue-700">
                        Área: {area.label}
                      </p>

                      {/* Elementos */}
                      {area.elements.map((el) => (
                        <div key={el.id} className="ml-4 mt-2 border-l pl-3">
                          <p className="font-medium text-green-700">
                            Elemento: {el.label}
                          </p>

                          {/* Materiais */}
                          {el.materials?.length > 0 ? (
                            <ul className="ml-4 list-disc text-sm mt-1">
                              {el.materials.map((mat, idx) => (
                                <li key={idx}>{mat.label}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="ml-4 text-sm text-gray-500">
                              Nenhum material selecionado
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={salvando}
          className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl mt-3 disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
