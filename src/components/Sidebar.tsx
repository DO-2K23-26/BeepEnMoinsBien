import React from "react";
import Channel from "./Channel";
import "./../style/index.css";
import { Hash, Mic, Phone } from "lucide-react";
import { Settings } from "lucide-react";

function Sidebar() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-80 bg-purple-200 h-full border-r justify-between">
        <div>
          <div className="flex items-center justify-center h-14 border-b border-black">
            <div>DO3</div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="">
                <div className="flex flex-row items-center px-5 h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Channels
                  </div>
                </div>
              </li>
              <Channel id="1" />
              <Channel id="2" />
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex flex-col py-4 space-y-1 ml-3">
            <li className="px-5 mb-3">
              <div className="flex flex-row items-center">
                <img
                  src="chemin_vers_votre_image"
                  className="w-10 h-10 rounded"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    Thomas
                  </div>
                  <div className="text-xs font-light text-green-500">
                    En ligne
                  </div>
                </div>
                <div className="ml-auto flex flex-row items-center mr-4">
                  <a
                    href="#phone"
                    className="ml-auto inline-flex justify-center items-center mr-3"
                  >
                    <span className="">
                      <Phone color="black" size={20} />
                    </span>
                  </a>
                  <a
                    href="#mic"
                    className="ml-auto inline-flex justify-center items-center mr-3"
                  >
                    <span className="">
                      <Mic color="black" size={20} />
                    </span>
                  </a>
                  <a
                    href="#settings"
                    className="ml-auto inline-flex justify-center items-center"
                  >
                    <span className="">
                      <Settings color="black" size={20} />
                    </span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
