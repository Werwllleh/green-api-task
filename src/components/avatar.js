import React from 'react';
import {useUserStore} from "@/stores/user-store";

const Avatar = () => {

  const userData = useUserStore((state) => state.data);

  return (
    <div className="avatar">
      <img src={userData.avatar} alt="avatar"/>
    </div>
  );
};

export default Avatar;
