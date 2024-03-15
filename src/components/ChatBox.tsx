import React, { useContext, useEffect, useRef } from 'react';
import { SendHorizonal, Plus } from "lucide-react";
import Message from './Message';
import { SocketContext } from '../pages/App';

function ChatBox() {
  const socket = useRef(useContext(SocketContext)?.socketValue);
  const setSocketValue = useContext(SocketContext)?.setSocketValue;

  useEffect(() => {
    if (setSocketValue && socket) {
      socket.current?.on("chat", (message) => {
      console.log(message);
      });
    }
  }, []);

  const handleClick = () => {
    const payload = {
      contenu: document.querySelector("input")?.value,
      timestamp: new Date().getTime(),
      author: "dodo@gmail.com",
      groupe: "channel1"
    };
    if (socket) {
      socket.current?.emit("chat", payload);
    }
  };

  const handleJoin = () => {
    if (socket) {
      socket.current?.emit("join_room", "channel1");
    }
  }
  
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
          <button className="mr-2 bg-white rounded-lg p-4" onClick={handleJoin}>
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
}

export default ChatBox;
