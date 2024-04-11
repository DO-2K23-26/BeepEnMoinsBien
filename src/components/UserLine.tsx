import React, { useState, useContext } from "react";
import { Crown, Swords, Timer } from "lucide-react";
import { customAxios } from '../axios';
import { api_url } from "../context/envar";
import { ChannelContext } from "../context/channel";
import { toast } from "react-toastify";

type UserProps = {
  name: string;
  status: string;
  role: string;
  profileImage: string;
};

function UserLine({ name, status, role, profileImage }: UserProps) {
  const [showModal, setShowModal] = useState(false);
  const url = useContext(api_url);
  const { currentChannel } = useContext(ChannelContext);

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

  const handleIsSuperUser = async () => {
    try {
      const response: any = await customAxios.get(url + '/groupe/' + currentChannel + '/superuser');
      if (!response.data) return;
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleIsOwner = async () => {
    try {
      const response: any = await customAxios.get(url + '/groupe/' + currentChannel + '/owner');
      if (!response.data) return;
      return response.data;
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleOpenModal = async () => {
    const isSuperUser = await handleIsSuperUser();
    const isOwner = await handleIsOwner();
    if (!isSuperUser && !isOwner) return;
    setShowModal(true);
  }

  const handleCloseModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(false);
  }

  const timeout = async () => {
    try {
      const reason = (document.getElementById('motif') as HTMLInputElement)?.value;
      const time = (document.getElementById('timer') as HTMLInputElement)?.value;
      console.log(reason, time);
      const response: any = await customAxios.post(url + '/groupe/' + currentChannel + '/timeout', { user: name, time: time, reason: reason});
      if (!response.data) return;
    }
    catch (error) {
      console.error(error);
      toast.error("Error timing out user");
    }
  }

  const handleTimeout = (event: React.MouseEvent, ) => {
    event.stopPropagation();
    // Ici, vous pouvez ajouter la logique pour mettre l'utilisateur en "Time Out"

    timeout();

    handleCloseModal(event);
  }

  return (
    <div onClick={handleOpenModal} className="flex items-center hover:bg-violet-400 rounded-2xl p-3 my-1 mx-2 transition-colors duration-200">
      <img src={profileImage} className="mr-2 w-10 h-10 border-2 border-black rounded" />
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
            <p>
              <label>Motif : 
                <input required type="text" id="motif" name="motif" className="rounded-lg border-2 border-black-100"/>(s)
              </label>
            </p>
            <p>
              <label>Durée : 
                <input type="number" id="timer" name="timer" min="10" className="rounded-lg border-2 border-black-100"/>(s)
              </label>
            </p>
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