import { PencilLine } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { UserContext } from "../context/authcontext";
import { SocketContext } from "../context/socketcontext";

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
    const [messageState, setMessageState] = useState(message);

    //const for the edit button
    const handleClick = () => {
        setEditMode(!editMode);
    }

    //const for the delete button
    const handleClickDelete = () => {
        // delete here the message
        console.debug("Message éffacé???");
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
                if (msg.id !== id) return;
                setMessageState(msg.contenu);
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
                                <>
                                <button
                                    className="bg-blue-300 text-white rounded-lg p-2 hover:bg-blue-400 transition-colors duration-300"
                                    onClick={handleClickDelete}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Trash2Icon size={20} />
                                </button>
                                <button
                                    className="bg-blue-300 text-white rounded-lg p-2 hover:bg-blue-400 transition-colors duration-300"
                                    onClick={handleClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <PencilLine size={20} />
                                </button>
                                </>
                            )}
                            {!editMode ?
                                <div className="bg-blue-500 text-white rounded-lg py-2 px-4 break-words">
                                    <ReactMarkdown>{messageState.replace(/\n/g, "  \n")}</ReactMarkdown>
                                </div>
                                :
                                <p className="bg-blue-500 text-black rounded-lg py-2 px-4">
                                    <TextareaAutosize
                                        id='editZone'
                                        className="w-full h-full text-black bg-blue-200 p-2 rounded border-2 border-blue-300 focus:outline-none focus:border-blue-500  resize-none"
                                        defaultValue={messageState}
                                        onKeyDown={(e) => e.key === 'Enter' && e.shiftKey === false && handleEdit()}
                                        maxRows={4}
                                    ></TextareaAutosize>
                                </p>
                                }

                        </div>
                    </div>
                </div>
                :
                <div className="mb-2 flex justify-start items-start">
                    <div className="text-left">
                        <div className="text-xs text-gray-500 mb-1">{author}</div>
                        <div className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 break-words">
                            <ReactMarkdown>{messageState.replace(/\n/g, "  \n")}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Message;
