import React from "react";

const UserInfoIcon = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g color="#bebebe" fill="#905BFFFF">
        <path
          d="M6 0a3 3 0 100 6 3 3 0 000-6zM4.5 7A4.49 4.49 0 000 11.5v.5c0 1 1 1 1 1h6V8.875c0-.83.587-1.554 1.355-1.79A4.532 4.532 0 007.5 7zM9 9v4h1V9z"
          overflow="visible"
        />
        <path
          d="M8.875 8A.863.863 0 008 8.875v6.25c0 .492.383.875.875.875h6.25a.863.863 0 00.875-.875v-6.25A.863.863 0 0015.125 8zM11 9h2v1h-2zm0 2h2v4h-2z"
          overflow="visible"
        />
      </g>
    </svg>
  );
};

export default React.memo(UserInfoIcon);
