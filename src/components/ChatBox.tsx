import { useContext, useEffect, useRef, useState } from 'react';
import { SendHorizonal, Plus } from "lucide-react";
import Message from './Message';
import { SocketContext } from '../context/socketcontext';
import axios from 'axios';
import { api_url } from '../context/envar';
import { ChannelContext } from '../context/channel';

function ChatBox() {
  const socketContext = useContext(SocketContext);
  const socket = useRef(socketContext?.socketValue);
  const url = useContext(api_url);
  const { currentChannel } = useContext(ChannelContext);

  const [messages, setMessages] = useState<{message: any, author: any}[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      if(!currentChannel) return;
      const response = await axios.get(url + '/message/groupe/'+currentChannel);
      const data = response.data.map((item: any) => ({ message: item.contenu, author: item.author }));
      setMessages(data);
    }
    fetchdata();
  } , [currentChannel, url]);

  useEffect(() => {
    socket.current = socketContext?.socketValue;

    if (socket.current) {
      console.log("socket is connected");
      socket.current.on("chat", (msg: any) => {
        setMessages((prev) => [...prev, {message: msg.contenu, author: msg.author}]);
      });
    }

    return () => {
      console.log("socket is disconnected");
      socket.current?.off("chat");
    };
  }, [socketContext?.socketValue]);

  const handleClick = () => {
    const payload = {
      contenu: document.querySelector("input")?.value,
      timestamp: new Date().getTime(),
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
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container flex flex-col h-screen  bg-violet-200 w-full" ref={chatContainerRef}>
      <div className="chat-header p-2 ">
        <h2># Channel Name</h2>
      </div>
      <div className="chat-messages flex-grow overflow-y-auto p-2">
        {messages.map((msg, index) => <Message key={index} message={msg.message} author={msg.author} />)}
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
