import { customAxios } from "../axios";
import { useContext } from "react";
import { api_url } from "../context/envar";
import React from "react";
import { X } from "lucide-react";

function SettingsChannel(props: Readonly<{ onClose: () => void }> & { id: string }) {
    const url = useContext(api_url);
    const handleValidate = async () => {
      const channel = document.getElementById('channelName') as HTMLInputElement;
      if (channel) {
        try {
          await customAxios.patch(url + '/groupe/' +  props.id , { groupe: { nom: channel.value }}); 
          props.onClose();
          window.location.reload();
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg h-auto w-full relative">
        <button onClick={props.onClose} className="absolute top-2 right-2">
          <X size={24} />
        </button>
        <h1 className="text-xl font-semibold mb-4 text-left">Paramètres du channel</h1>
        <div className="flex items-center mb-4">
          <label className="block text-gray-700 text-lg mr-3">
            Nom du channel :
          </label>
          <input
            id="channelName" // Add an id to the input element
            type="text"
            placeholder=""
            className="flex-grow  px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <button className="w-full bg-purple-300 text-white px-4 py-2 rounded-lg hover:bg-purple-400 focus:outline-none" onClick={handleValidate}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default SettingsChannel;