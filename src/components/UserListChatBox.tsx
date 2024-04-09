import React from "react";
import "./../style/index.css";
import User from "./User";

function UserListChatBox() {
  // Données factices
  const dummyData = [
    {
      name: "Tom",
      role: "Owner",
      avatar: "url_to_tom_avatar",
      status: "Online",
    },
    {
      name: "Nina",
      role: "Super User",
      avatar: "url_to_nina_avatar",
      status: "Offline",
    },
    {
      name: "Paul",
      role: "Super User",
      avatar: "url_to_paul_avatar",
      status: "Online",
    },
    {
      name: "Lise",
      role: "User",
      avatar: "url_to_lise_avatar",
      status: "Away",
    },
    {
      name: "Mike",
      role: "User",
      avatar: "url_to_mike_avatar",
      status: "Online",
    },
    {
      name: "Lise",
      role: "Time Out",
      avatar: "url_to_lise_avatar",
      status: "Offline",
    },
    {
      name: "Mike",
      role: "Time Out",
      avatar: "url_to_mike_avatar",
      status: "Away",
    },
  ];

  return (
    <div className="h-screen flex flex-col top-0 left-0 w-80 bg-violet-300 h-full border-r justify-between">
      <div className="flex flex-col h-full">
        <div className="flex  h-14 ">
          <div>Utilisateur</div>
        </div>
        {dummyData.map((user, index) => (
          <User
            key={index}
            name={user.name}
            status={user.status}
            profileImage={user.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default UserListChatBox;
