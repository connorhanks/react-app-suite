import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [value, setValue] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (value.length > 0) {
      onAddTask(value);
      setValue('');
    }
  };

  return (
    <div className="mb-10 relative group">
      <div className="relative">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?" 
          className="w-full px-5 py-4 pl-12 text-gray-700 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-md cursor-pointer"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </span>
      </div>
      <button 
        onClick={addTask} 
        className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput; 