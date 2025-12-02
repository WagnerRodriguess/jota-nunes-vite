// GenericModal.jsx
import React from "react";
import Select from "react-select";

export default function GenericModal({
  isOpen,
  title,
  inputValue,
  onInputChange,
  onConfirm,
  onClose,
  isLoading,
  error,
  showAreasSelect = false,
  areasOptions = [],
  selectedAreas = [],
  onAreasChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 flex flex-col gap-4">
        <h3 className="font-bold text-lg">{title}</h3>

        <input
          type="text"
          placeholder="Digite o nome"
          className="p-2 border rounded-md"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />

        {showAreasSelect && (
          <Select
            isMulti
            options={areasOptions}
            value={selectedAreas.map((id) => {
              const area = areasOptions.find((a) => a.value === id);
              return area ? { value: area.value, label: area.label } : null;
            })}
            onChange={(vals) => onAreasChange(vals.map((v) => v.value))}
            placeholder="Selecione áreas"
          />
        )}

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Criando..." : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}
