import React from "react";
import Channel from "./Channel";
import "./../style/index.css";
import { Mic, Phone } from "lucide-react";
import { Settings } from "lucide-react";
import Myprofil from "./Myprofil";
import ChannelList from "./ChannelList";

function Sidebar() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-80 bg-purple-200 h-full border-r justify-between">
        <div className="flex flex-col h-full">
          {/* Titre du serveur */}
          <div className="flex items-center justify-center h-14 border-b border-black">
            <div>DO3</div>
          </div>

          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ChannelList />
          </div>

          <div className="mt-auto">
            <Myprofil />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;