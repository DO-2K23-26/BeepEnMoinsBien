import React from "react";
import { X } from "lucide-react";

interface SettingsChannelProps {
  onClose: () => void;
}

const SettingsChannel: React.FC<SettingsChannelProps> = ({ onClose }) => {
  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg h-auto w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <X size={24} />
        </button>
        <h1 className="text-xl font-semibold mb-4 text-left">Paramètres du channel</h1>
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 text-lg mr-3">
            Nom du channel :
          </label>
          <input
            type=""
            className="flex-grow  px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <button className="w-full bg-purple-300 text-white px-4 py-2 rounded-lg hover:bg-purple-400 focus:outline-none">
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default SettingsChannel;