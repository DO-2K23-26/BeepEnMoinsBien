import { PencilLine, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/socketcontext";
import { UserContext } from "../context/authcontext";
import ReactMarkdown from "react-markdown";

interface MessageProps {
    message: string;
    author: string;
    id: number;
}

function Message({ message, author, id }: Readonly<MessageProps>) {

    const socketContext = useContext(SocketContext);
    const socket = useRef(socketContext?.socketValue);
    const user = useContext(UserContext).user;

    const [editMode, setEditMode] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setEditMode(!editMode);
    }

    const messageRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => {
        // setTimeout pour donner une petite latence avant de vérifier et cacher le bouton
        // Cela permet de gérer les mouvements rapides de la souris entre le message et le bouton
        setTimeout(() => {
            // Si le curseur n'est pas sur le message ou le bouton, on cache le bouton
            if (messageRef.current && !messageRef.current.contains(document.activeElement)) {
                setVisible(false);
            }
        }, 200); // la latence peut être ajustée selon les besoins
    };

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
        <>
            {author === user?.nickname ?
                <div ref={messageRef} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="mb-2 flex flex-col items-end">
                        <div className="text-xs text-gray-500 mb-1">{author}</div>
                        <div className="flex items-center gap-2">
                            {visible && (
                                <button
                                    className="bg-blue-300 text-white rounded-lg p-2 hover:bg-blue-400 transition-colors duration-300"
                                    onClick={handleClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <PencilLine size={20} />
                                </button>
                            )}
                            {!editMode ?
                                <textarea className="bg-blue-500 text-white rounded-lg py-2 px-4 break-words">
                                    {message}
                                </textarea>
                                :
                                <p className="bg-blue-500 text-black rounded-lg py-2 px-4">
                                    <input id='editZone' type="text" defaultValue={message} onKeyDown={(e) => e.key === 'Enter' && handleEdit} />
                                </p>}

                        </div>
                    </div>
                </div>
                :
                <div className="mb-2 flex justify-start items-start">
                    <div className="text-left">
                        <div className="text-xs text-gray-500 mb-1">{author}</div>
                        <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 break-words">{message}</p>
                    </div>
                </div>
            }
        </>
        // <div className="message mb-2 hover:bg-violet-100 relative" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        //     <div className="flex mb-2">
        //         <div>
        //         <span className="w-10 h-10 rounded bg-slate-200 ">
        //             <User color="black" size={30} />
        //         </span>
        //         </div>
        //         <div>
        //         <strong>{author}</strong>
        //         </div>
        //     </div>

        //     <div className="bg-white rounded-lg p-4 text-black inline-block">
        //         {!editMode && <p id={id.toString()}><ReactMarkdown>{message}</ReactMarkdown></p>}
        //         {editMode && <input id='editZone' type="text" defaultValue={message} onKeyDown={(e) => e.key === 'Enter' && handleEdit()}/>}
        //     </div>
        //     {visible && user?.nickname === author && (
        //         <button type="submit" className="mr-5 bg-white rounded-lg p-2 absolute right-0 -top-5" style={{ float: "right" }} onClick={handleClick}>
        //             <PencilLine size={20} />
        //         </button>
        //     )}
        // </div>
    );
}

export default Message;
