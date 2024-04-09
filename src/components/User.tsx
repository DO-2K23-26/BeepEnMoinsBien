import React, { useEffect } from "react";

// Définir les types de props
type UserProps = {
  name: string;
  status: string;
  profileImage: string;
};

function User({ name, status, profileImage }: UserProps) {
  // Utiliser useEffect pour imprimer un message dans la console chaque fois que le composant est rendu
  useEffect(() => {
    console.log(`Le composant User a été rendu avec le nom ${name}`);
  }, [name]);

  // Fonction pour obtenir la classe de couleur en fonction du statut
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

  // Rendu du composant
  return (
    <div className="flex items-center hover:bg-violet-400 rounded-xl p-3 my-1 mx-2 transition-colors duration-200">
      <img src={profileImage} className="mr-2 w-10 h-10 border-2 border-black rounded"/>
      <div className="flex justify-between w-full">
        <h2 className="text-black">{name}</h2>
        <p className={`text-black text-sm p-1 rounded-xl ${getStatusColor(status)}`}>{status}</p>
      </div>
    </div>
  );
}

// Exporter le composant
export default User;