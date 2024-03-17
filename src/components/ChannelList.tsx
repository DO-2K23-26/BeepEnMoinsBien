import axios from "axios";
import "./../style/index.css";
import Channel from "./Channel";
import { api_url } from "../context/envar";
import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import JoinChannel from "./JoinChannel";
import { useUserContext } from "../context/authcontext";

function ChannelList() {
  const { accessToken } = useUserContext();
  const url = useContext(api_url);
  const [channels, setChannels] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }
      try {
        const response = await axios.get(url + '/groupe/getGroupes', config);
        setChannels(response.data);
      }
      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, accessToken]);

  const handleClose = () => {
    setShowSettings(false);
  };
   
  return (
    <ul className="flex flex-col py-4 space-y-1">
    <li className="">
      <div className="flex flex-row items-center px-5 h-8">
        <div className="text-sm font-light tracking-wide text-gray-500">
          Channels
        </div>
        <button className="ml-auto inline-flex justify-center items-center" onClick={() => setShowSettings(true)}>
          <span className=" ">
            <Plus color="black" size={20} />
          </span>
        </button>
      </div>
    </li>
    {channels.map((channel: {id: number, nom: string}) => <Channel key={channel.id} id={channel.nom}/>)}
    {showSettings && <JoinChannel onClose={handleClose} />}
  </ul>
  );
}

export default ChannelList;