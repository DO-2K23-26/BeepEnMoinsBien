
import { Mic, Phone, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./../style/index.css";

function Myprofil() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <div>
      <ul className="flex flex-col py-4 space-y-1 ml-3">
        <li className="px-5 mb-3">
          <div className="flex flex-row items-center">
            <span className="w-10 h-10 rounded bg-slate-200">
              <User color="black" size={40} />
            </span>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">Thomas</div>
              <div className="text-xs font-light text-green-500">En ligne</div>
            </div>
            <div className="ml-auto flex flex-row items-center mr-4">
              <a
                href="#phone"
                className="ml-auto inline-flex justify-center items-center mr-3"
              >
                <span className="ml-auto inline-flex justify-center items-center transform transition-transform hover:animate-swing hover:scale-150">
                  <Phone color="black" size={20} />
                </span>
              </a>
              <a
                href="#mic"
                className="ml-auto inline-flex justify-center items-center mr-3"
              >
                <span className="ml-auto inline-flex justify-center items-center transform transition-transform hover:animate-swing hover:scale-150">
                  <Mic color="black" size={20} />
                </span>
              </a>
              <a
                href="#settings"
                className="ml-auto inline-flex justify-center items-center"
              >
                <span
                  className="ml-auto inline-flex justify-center items-center transform transition-transform duration-500 hover:rotate-90 hover:scale-150"
                  onClick={() => setShowModal(!showModal)}
                >
                  <Settings color="black" size={20} />
                </span>
              </a>
            </div>
          </div>
        </li>
      </ul>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-lg font-medium mb-2">User Info</h2>
            <p>Name: Thomas</p>
            <p>Status: En ligne</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Myprofil;
