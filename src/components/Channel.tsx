import React, { useContext, useState } from "react";
import "./../style/index.css";
import { Hash, Settings } from "lucide-react";
import SettingsComponent from './SettingsChannel'; 
import { ChannelContext } from "../context/channel";

function Channel(props: Readonly<{ id: string }>) {
  const [showSettings, setShowSettings] = useState(false);
  const { setChannel, currentChannel } = useContext(ChannelContext);

  const handleClose = () => {
    setShowSettings(false);
  };

  const handleClick = () => { 
    setChannel(props.id);
  }

  const isSelected = currentChannel === props.id;

  return (
    <li>
      <div className={`flex flex-row items-center h-11 focus:outline-none ${isSelected ? 'bg-violet-200 text-gray-800' : 'hover:bg-violet-200 text-gray-600 hover:text-gray-800'} border-l-4 ${isSelected ? 'border-black' : 'border-transparent'} pr-6`}>
        <button className="flex items-center" onClick={handleClick}>
          <span className="inline-flex justify-center items-center ml-4">
            <Hash color="black" size={20} />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            {props.id}
          </span>
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="ml-auto inline-flex justify-center items-center transform transition-transform duration-500 hover:rotate-90 hover:scale-110"
          >
          <span className=" ">
            <Settings color="black" size={20} />
          </span>
        </button>
      </div>
      {showSettings && <SettingsComponent onClose={handleClose} id={props.id} />}
    </li>
  );
}

export default Channel;