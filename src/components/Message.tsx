import { PencilLine, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/socketcontext";

interface MessageProps {
    message: string;
    author: string;
    id: number;
}

function Message({ message, author, id }: Readonly<MessageProps>) {
    const [editMode, setEditMode] = useState(false);
    const [visible, setVisible] = useState(false);
    const socketContext = useContext(SocketContext);
    const socket = useRef(socketContext?.socketValue);

    const handleClick = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        socket.current = socketContext?.socketValue;

        if (socket.current) {
            socket.current.on("edit", (msg: any) => {
                if (msg.id === id) {
                    const message = document.getElementById(id.toString())
                    if (message) {
                        message.innerHTML = msg.contenu;
                    }
                }
            });
          }
      
          return () => {
            socket.current?.off("edit");
          };

    }, [socketContext?.socketValue, id]);

    const handleEdit = () => { 
        const message = (document.getElementById('editZone') as HTMLInputElement)?.value;
        const payload = {
            contenu: message,
            id: id
        };
        if (socket) {
            socket.current?.emit("edit", payload);
        }
        setEditMode(false);
    }
    
    return (
        <div className="message mb-2 hover:bg-violet-100 relative" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <div className="flex mb-2">
                <div>
                <span className="w-10 h-10 rounded bg-slate-200 ">
                    <User color="black" size={30} />
                </span>
                </div>
                <div>
                <strong>{author}</strong>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 text-black inline-block">
                {!editMode && <p id={id.toString()}>{message}</p>}
                {editMode && <input id='editZone' type="text" defaultValue={message} onKeyDown={(e) => e.key === 'Enter' && handleEdit()}/>}
            </div>
            {visible && (
                <button type="submit" className="mr-5 bg-white rounded-lg p-2 absolute right-0 -top-5" style={{ float: "right" }} onClick={handleClick}>
                    <PencilLine size={20} />
                </button>
            )}
        </div>
    );
}

export default Message;