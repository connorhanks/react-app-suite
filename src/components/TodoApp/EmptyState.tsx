import React from 'react';

interface EmptyStateProps {
  type: 'pending' | 'completed';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <li className="p-5 text-center">
      <div className="flex flex-col items-center text-gray-400">
        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {type === 'pending' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
        </svg>
        <p className="italic">
          {type === 'pending' 
            ? "No tasks yet. Add something!" 
            : "Completed tasks will appear here"}
        </p>
      </div>
    </li>
  );
};

export default EmptyState; 