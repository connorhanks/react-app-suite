import React from 'react';

interface FooterProps {
  taskCount: number;
}

const Footer: React.FC<FooterProps> = ({ taskCount }) => {
  return (
    <div className="mt-10 pt-4 border-t border-purple-100 text-center text-gray-500 text-sm">
      {taskCount === 0 ? (
        <p className="italic">No tasks yet. Add something!</p>
      ) : taskCount === 1 ? (
        <p>1 task left. You're almost there! 🚀</p>
      ) : (
        <p>{taskCount} tasks left. You've got this! 🚀</p>
      )}
    </div>
  );
};

export default Footer; 