import React, { useState, useEffect } from "react";
import { User, Crown, Swords, Timer } from "lucide-react";

type UserProps = {
  name: string;
  status: string;
  role: string;
  profileImage: string;
};

function UserLine({ name, status, role, profileImage }: UserProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(`Le composant User a été rendu avec le nom ${name}`);
  }, [name]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-300';
      case 'Away':
        return 'bg-yellow-300';
      case 'Offline':
        return 'bg-red-300';
      default:
        return '';
    }
  }

  // Fonction pour obtenir l'icône en fonction du rôle
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner':
        return <div title="Owner"><Crown /></div>;
      case 'Super User':
        return <div title="Super User"><Swords /></div>;
      case 'Time Out':
        return <div title="Time Out"><Timer /></div>;
      default:
        return null;
    }
  }

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(false);
  }

  const handleTimeout = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Ici, vous pouvez ajouter la logique pour mettre l'utilisateur en "Time Out"
    console.log(`${name} a été mis en Time Out`);
    handleCloseModal(event);
  }

  return (
    <div onClick={handleOpenModal} className="flex items-center hover:bg-violet-400 rounded-2xl p-3 my-1 mx-2 transition-colors duration-200">
      <img src={profileImage} className="mr-2 w-10 h-10 border-2 border-black rounded"/>
      <div className="flex justify-between w-full">
        <div className="flex ">
        <h2 className="text-black mr-2">{name} </h2>
          <div className="flex ">
            {getRoleIcon(role)}
          </div>
        </div>
        <p className={`text-black text-sm p-1 w-16 text-center rounded-xl ${getStatusColor(status)}`}>{status}</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-lg font-medium mb-2">User Info</h2>
            <p>Name: {name}</p>
            <p>Status: {status}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
              onClick={handleTimeout}
            >
              Time Out
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default UserLine;