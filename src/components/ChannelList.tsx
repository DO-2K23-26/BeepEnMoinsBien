import axios from "axios";
import "./../style/index.css";
import Channel from "./Channel";
import { api_url } from "../context/envar";
import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";

function ChannelList() {
  const url = useContext(api_url);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url + '/groupe');
      setChannels(response.data);
    };

    fetchData();
  }, [url]);
   
  return (
    <ul className="flex flex-col py-4 space-y-1">
    <li className="">
      <div className="flex flex-row items-center px-5 h-8">
        <div className="text-sm font-light tracking-wide text-gray-500">
          Channels
        </div>
        <button className="ml-auto inline-flex justify-center items-center">
          <span className=" ">
            <Plus color="black" size={20} />
          </span>
        </button>
      </div>
    </li>
    {channels.map((channel: {id: number, nom: string}) => <Channel key={channel.id} id={channel.nom}/>)}
  </ul>
  );
}

export default ChannelList;