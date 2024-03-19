import React from "react";
import { useSelector } from "react-redux";
const UserUpdatePersonalData = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      personal data
      {user.firstName}
    </div>
  );
};

export default UserUpdatePersonalData;
