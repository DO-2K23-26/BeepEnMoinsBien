import { Component } from "react";
import React, { useState } from "react";
import "./../style/index.css";
import { Hash, Settings } from "lucide-react";
import Channel from "./Channel";

function ChannelList() {

  return (
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
  );
}

export default ChannelList;