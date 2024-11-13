import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="loader">
      <img
        src="/logo2.png"
        alt="Spinning logo"

        className="logo"
      />
    </div>
  </div>
  );
};

export default Loading;
