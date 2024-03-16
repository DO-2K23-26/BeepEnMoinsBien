import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";
import { SocketProvider } from "../context/socketcontext";

function Main() {
    return (
        <SocketProvider>
            <div className="App flex flex-row">
                <div className="relative">
                    <Sidebar />
                </div>
                <div className="relative flex-grow">
                    <ChatBox />
                </div>
                {/* Ajoutez ici vos autres composants */}
            </div>
        </SocketProvider>

    );
}

export default Main;