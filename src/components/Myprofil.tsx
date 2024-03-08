import React, { useState } from "react";
import "./../style/index.css";
import { Settings, Mic, Phone } from "lucide-react";

function Myprofil() {
  return (
    <div>
      <ul className="flex flex-col py-4 space-y-1 ml-3">
        <li className="px-5 mb-3">
          <div className="flex flex-row items-center">
            <img src="chemin_vers_votre_image" className="w-10 h-10 rounded" />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">Thomas</div>
              <div className="text-xs font-light text-green-500">En ligne</div>
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
  );
}

export default Myprofil;
