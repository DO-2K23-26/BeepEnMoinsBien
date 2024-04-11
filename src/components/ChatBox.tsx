import { customAxios } from "../axios";
import { Form, Formik } from "formik";
import { Plus, SendHorizonal } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import * as Yup from "yup";
import { ChannelContext } from "../context/channel";
import { api_url } from "../context/envar";
import { SocketContext } from "../context/socketcontext";
import Message from "./Message";

function ChatBox() {
  const socketContext = useContext(SocketContext);
  const socket = useRef(socketContext?.socketValue);
  const url = useContext(api_url);
  const { currentChannel } = useContext(ChannelContext);

  const [messages, setMessages] = useState<
    { message: string; author: string; id: number }[]
  >([]);
  const [messageToRemove, setMessageToRemove] = useState<number | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      if (!currentChannel) return;
      try {
        const response = await customAxios.get(
          url + "/message/groupe/" + currentChannel
        );
        if (!response.data) return;
        const data = response.data.map((item: any) => ({
          message: item.contenu,
          author: item.author,
          id: item.id,
        }));
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentChannel !== null) fetchdata();
  }, [currentChannel, url]);

  useEffect(() => {
    if (messageToRemove !== null) {
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== messageToRemove)
      );
      setMessageToRemove(null); // Reset the messageToRemove state
    }
  }, [messageToRemove]);

  useEffect(() => {
    socket.current = socketContext?.socketValue;

    if (socket.current) {
      socket.current.on("chat", (msg: any) => {
        setMessages((prev) => [
          ...prev,
          { message: msg.contenu, author: msg.author, id: msg.id },
        ]);
      });
      socket.current.on("delete", (msg: number) => {
        if (messages.find((message) => message.id === msg)) {
          setMessageToRemove(msg);
        }
      });
    }

    return () => {
      socket.current?.off("chat");
      socket.current?.off("delete");
    };
  }, [socketContext?.socketValue, messages]);

  const handleJoin = () => {
    if (socket) {
      socket.current?.emit("join_room", "channel1");
    }
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo(
        0,
        chatContainerRef.current.scrollHeight
      );
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
    values.message = "";
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("A message is required"),
  });

  return (
    <div className="chat-container flex flex-col h-screen  bg-violet-200 w-full">
    <div className="chat-header p-2 ">
      <h2>{currentChannel ? `# ${currentChannel}` : ""}</h2>
    </div>
    <div
      className="chat-messages flex-grow overflow-y-auto p-2"
      ref={chatContainerRef}
    >
      {!currentChannel ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '2em' }}>
          Bienvenue sur Beep !
        </div>
      ) : (
        messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg.message}
            author={msg.author}
            id={msg.id}
          />
        ))
      )}
    </div>

      <Formik
        initialValues={{ message: "" }}
        onSubmit={sendMessage}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <div className="chat-input flex items-center p-4 ">
              <TextareaAutosize
                name="message"
                className="flex-grow mr-7 bg-white rounded-lg p-4 text-black resize-none"
                placeholder="Type a message..."
                value={values.message}
                onChange={(e) => setFieldValue("message", e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                maxRows={4}
              />
              <button type="submit" className="mr-7 bg-white rounded-lg p-4">
                <SendHorizonal size={20} />
              </button>
              <button
                className="mr-2 bg-white rounded-lg p-4"
                onClick={handleJoin}
              >
                <Plus size={20} />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChatBox;
