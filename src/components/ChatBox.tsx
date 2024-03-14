import React, { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import env from "react-dotenv";
import { SendHorizonal, Plus, User } from "lucide-react";

function ChatBox() {
  const socket = useRef(null as unknown as Socket);

  useEffect(() => {
    socket.current = io(env.SOCKET_URL ?? 'http://localhost:4000');
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
          <div className="message mb-2">
            <div className="flex mb-2">
              <div>
                <span className="w-10 h-10 rounded bg-slate-200 ">
                  <User color="black" size={30} />
                </span>
              </div>
              <div>
                <strong>User1</strong>
              </div>
            </div>

            <div className="mr-7 bg-white rounded-lg p-4 text-black inline-block">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              sint temporibus odio, eligendi, ab delectus eos repellendus
              tempore modi obcaecati adipisci magnam? Magnam laborum enim, eius
              facere error, asperiores pariatur temporibus voluptatum nihil
              minus sint. Natus a tempore voluptatem excepturi doloribus eum
              inventore corrupti porro quisquam, error atque qui quam, esse
              repudiandae architecto omnis reiciendis doloremque ipsa recusandae
              molestiae exercitationem. Maxime culpa quasi, officia obcaecati
              repellendus atque illo corrupti dolorum debitis totam amet in
              possimus maiores voluptatum rerum qui beatae aspernatur quisquam
              explicabo consequuntur enim nesciunt aliquid? Debitis placeat
              eveniet officiis beatae, sed blanditiis ex accusamus saepe autem
              distinctio ipsum.
            </div>
          </div>

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
