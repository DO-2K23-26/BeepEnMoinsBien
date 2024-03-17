import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { Plus, SendHorizonal } from "lucide-react";
import { useContext, useEffect, useRef, useState } from 'react';
import { ChannelContext } from '../context/channel';
import { api_url } from '../context/envar';
import { SocketContext } from '../context/socketcontext';
import Message from './Message';

function ChatBox() {
  const socketContext = useContext(SocketContext);
  const socket = useRef(socketContext?.socketValue);
  const url = useContext(api_url);
  const { currentChannel } = useContext(ChannelContext);

  const [messages, setMessages] = useState<{ message: string, author: string, id: number }[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      if (!currentChannel) return;
      try {
        const response = await axios.get(url + '/message/groupe/' + currentChannel);
        if (!response.data) return;
        const data = response.data.map((item: any) => ({ message: item.contenu, author: item.author, id: item.id }));
        setMessages(data);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchdata();
  }, [currentChannel, url]);

  useEffect(() => {
    socket.current = socketContext?.socketValue;

    if (socket.current) {
      socket.current.on("chat", (msg: any) => {
        setMessages((prev) => [...prev, { message: msg.contenu, author: msg.author, id: msg.id }]);
      });
    }

    return () => {
      socket.current?.off("chat");
    };
  }, [socketContext?.socketValue]);

  const handleJoin = () => {
    if (socket) {
      socket.current?.emit("join_room", "channel1");
    }
  }

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight);
    }
  }, [messages]);

  const sendMessage = async (values: any) => {
    const payload = {
      contenu: values.message,
      timestamp: new Date().getTime(),
    };
    if (socket) {
      socket.current?.emit("chat", payload);
    }
    values.message = '';
  }

  return (
    <div className="chat-container flex flex-col h-screen  bg-violet-200 w-full">

      <div className="chat-header p-2 ">
        <h2># Channel Name</h2>
      </div>
      <div className="chat-messages flex-grow overflow-y-auto p-2" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} author={msg.author} id={msg.id} />
        ))}
      </div>


      <Formik
        initialValues={{ message: '' }}
        onSubmit={sendMessage}
      >
        <Form>
          <div className="chat-input flex items-center p-4 ">
            <Field
              as="textarea"
              name="message"
              className="flex-grow mr-7 bg-white rounded-lg p-4 text-black"
              placeholder="Type a message..."
            />
            <button type="submit" className="mr-7 bg-white rounded-lg p-4">
              <SendHorizonal size={20} />
            </button>
            <button className="mr-2 bg-white rounded-lg p-4" onClick={handleJoin}>
              <Plus size={20} />
            </button>
          </div>
        </Form>
      </Formik>

    </div>
  );
}

export default ChatBox;
