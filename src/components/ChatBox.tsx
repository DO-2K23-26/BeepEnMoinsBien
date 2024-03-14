import React, { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import env from "react-dotenv";
import { SendHorizonal, Plus } from "lucide-react";
import Message from './Message';

function ChatBox() {
  const socket = useRef(null as unknown as Socket);

  useEffect(() => {
    socket.current = io(env.SOCKET_URL ?? 'http://api.beep.gay:4000');
    socket.current.on("chat", (message) => {
      console.log(message);
    });}
    , []
  );

  const handleClick = () => {
    const payload = {
      message: document.querySelector("input")?.value,
      timestamp: new Date().getTime(),
      author: "User1",
      roomName: "channel1"
    };
    console.log(payload);
    socket.current.emit("chat", payload);
  };
  
    return (
      <div className="chat-container flex flex-col h-screen  bg-violet-200 w-full">
        <div className="chat-header p-2 ">
          <h2># Channel Name</h2>
        </div>
        <div className="chat-messages flex-grow overflow-y-auto p-2">
          <Message message="Hello" author="User1" />

        </div>
        <div className="chat-input flex items-center p-4 ">
          <input
            type="text"
            className="flex-grow mr-7 bg-white rounded-lg p-4 text-black"
            placeholder="Type a message..."
          />
          <button className="mr-7 bg-white rounded-lg p-4" onClick={handleClick}>
            <SendHorizonal size={20} />
          </button>
          <button className="mr-2 bg-white rounded-lg p-4">
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
}

export default ChatBox;
