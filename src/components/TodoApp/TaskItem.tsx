import React from 'react';

interface TaskItemProps {
  task: string;
  index: number;
  isCompleted?: boolean;
  onComplete?: (task: string, index: number) => void;
  onDelete: (index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  index, 
  isCompleted = false, 
  onComplete, 
  onDelete 
}) => {
  return (
    <li className="transform transition-all duration-300 hover:-translate-x-1 hover:translate-y-1">
      <div className={`p-4 bg-gradient-to-r from-white ${isCompleted ? 'to-green-50 border-green-100' : 'to-indigo-50 border-indigo-100'} rounded-lg border text-gray-700 flex justify-between items-center group shadow-sm hover:shadow-md`}>
        <span className={isCompleted ? 'line-through text-gray-400' : 'font-medium'}>{task}</span>
        <div className="flex space-x-2">
          {!isCompleted && onComplete && (
            <button 
              onClick={() => onComplete(task, index)} 
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all transform hover:scale-110"
              title="Complete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          <button 
            onClick={() => onDelete(index)} 
            className={`p-2 rounded-full ${isCompleted ? 'bg-red-100 text-red-400' : 'bg-red-100 text-red-600'} hover:bg-red-200 transition-all transform hover:scale-110`}
            title={isCompleted ? "Remove task" : "Delete task"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem; 