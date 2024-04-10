import { customAxios } from "../axios";
import { useContext } from "react";
import { api_url } from "../context/envar";
import { X } from "lucide-react";

function JoinChannel( { onClose }: Readonly<{ onClose: () => void }> ) {
    const url = useContext(api_url);

    const handleValidate = async () => {
        const channel = document.getElementById('channelName') as HTMLInputElement;
        try {
            await customAxios.post(url + '/groupe/' + channel.value );
            onClose();
            window.location.reload();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg h-auto w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <X size={24} />
                </button>
                <h1 className="text-xl font-semibold mb-4 text-left">Rejoindre/Créer un channel :</h1>
                <div className="flex items-center mb-4">
                    <label className="block text-gray-700 text-lg mr-3">
                        Nom du channel :
                    </label>
                <input
                    type=""
                    className="flex-grow px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
                    id="channelName"
                />
                </div>
                <button className="w-full bg-purple-300 text-white px-4 py-2 rounded-lg hover:bg-purple-400 focus:outline-none" onClick={handleValidate}>
                Valider
                </button>
            </div>
        </div>
    )
}

export default JoinChannel;
