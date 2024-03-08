import React, { useState } from "react";
import "./../style/index.css";
import { Hash, Settings } from "lucide-react";
import SettingsComponent from './SettingsChannel'; 

function Channel(props: { id: string }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
  };

  return (
    <li>
      <div className="flex flex-row items-center h-11 focus:outline-none hover:bg-purple-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-black pr-6">
        <a href="#channel1" className="flex items-center">
          <span className="inline-flex justify-center items-center ml-4">
            <Hash color="black" size={20} />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Channel {props.id}
          </span>
        </a>
        <button
          onClick={() => setShowSettings(true)}
          className="ml-auto inline-flex justify-center items-center transform transition-transform duration-500 hover:rotate-90 hover:scale-110"
          >
          <span className=" ">
            <Settings color="black" size={20} />
          </span>
        </button>
      </div>
      {showSettings && <SettingsComponent onClose={handleClose} />}
    </li>
  );
}

export default Channel;