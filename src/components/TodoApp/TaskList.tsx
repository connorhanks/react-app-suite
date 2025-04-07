import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

interface TaskListProps {
  title: string;
  tasks: string[];
  type: 'pending' | 'completed';
  onComplete?: (task: string, index: number) => void;
  onDelete: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  title, 
  tasks, 
  type,
  onComplete, 
  onDelete 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className={`w-8 h-8 ${type === 'pending' ? 'bg-indigo-100' : 'bg-green-100'} rounded-full flex items-center justify-center mr-3`}>
          <svg className={`w-4 h-4 ${type === 'pending' ? 'text-indigo-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {type === 'pending' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
        </span>
        {title}
      </h2>
      <ul className="space-y-3 mt-5">
        {tasks.length === 0 ? (
          <EmptyState type={type} />
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              isCompleted={type === 'completed'}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList; 