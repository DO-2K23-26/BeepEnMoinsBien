import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";
import { SocketProvider } from "../context/socketcontext";
import { ChannelProvider } from "../context/channel";

function Main() {
    return (
        <SocketProvider>
        <ChannelProvider>
            <div className="App flex flex-row">
                <div className="relative">
                    <Sidebar />
                </div>
                <div className="relative flex-grow">
                    <ChatBox />
                </div>
                {/* Ajoutez ici vos autres composants */}
            </div>
        </ChannelProvider>
        </SocketProvider>

    );
}

export default Main;