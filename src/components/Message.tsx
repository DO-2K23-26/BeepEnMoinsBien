import { User } from "lucide-react";

interface MessageProps {
    message: string;
    author: string;
}

function Message({ message, author }: Readonly<MessageProps>) {
  return (
    <div className="message mb-2">
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

        <div className="mr-7 bg-white rounded-lg p-4 text-black inline-block">
            {message}
        </div>
    </div>
  );
}

export default Message;