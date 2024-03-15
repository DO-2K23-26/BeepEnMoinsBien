import ChatBox from "../components/ChatBox";
import Sidebar from "../components/Sidebar";

function Main() {
    return (
        <div className="App flex flex-row">
            <div className="relative">
                <Sidebar />
            </div>
            <div className="relative flex-grow">
                <ChatBox />
            </div>
            {/* Ajoutez ici vos autres composants */}
        </div>

    );
}

export default Main;