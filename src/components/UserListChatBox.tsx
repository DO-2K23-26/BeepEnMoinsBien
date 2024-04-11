import "./../style/index.css";
import UserLine from "./UserLine";
import { customAxios } from '../axios';
import { useContext, useEffect, useState } from "react";
import { api_url } from "../context/envar";
import { ChannelContext } from "../context/channel";

function UserListChatBox() {
  const [users, setUsers] = useState({ owner: "", superUsers: [], users: [], timeOut: [] });
  const url = useContext(api_url);
  const { currentChannel } = useContext(ChannelContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await customAxios.get(url + '/groupe/' + currentChannel);
        if (!response.data) return;
        console.log(response.data);
        setUsers(response.data);
      }
      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, currentChannel]);

  return (
    <div className="h-screen flex flex-col top-0 left-0 w-80 bg-violet-300 h-full border-r justify-between">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-14 border-b border-black">
          <div>Utilisateur</div>
        </div>
        <UserLine
          name={users.owner}
          role="Owner"
          status="Offline"
          profileImage="To be implemented"
        />
        {users.superUsers.map((user, index) => (
          <UserLine
            key={index}
            name={user}
            role="Super User"
            status="Offline"
            profileImage="To be implemented"
          />
        ))}
        {users.users.map((user, index) => (
          <UserLine
            key={index}
            name={user}
            role="User"
            status="Offline"
            profileImage="To be implemented"
          />
        ))}
        {users.timeOut.map((user, index) => (
          <UserLine
            key={index}
            name={user}
            role="Time Out"
            status="Offline"
            profileImage="To be implemented"
          />
        ))}
      </div>
    </div>
  );
}

export default UserListChatBox;
