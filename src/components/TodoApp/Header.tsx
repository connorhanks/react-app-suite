import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Your Tasks
      </h1>
      <p className="text-gray-500 mt-2">Organise your day, get things done</p>
    </div>
  );
};

export default Header; 