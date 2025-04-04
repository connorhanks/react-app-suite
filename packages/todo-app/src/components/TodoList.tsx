import { useState, useEffect } from 'react';

const TodoList = () => {
  const [value, setValue] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const savedCompleted = localStorage.getItem('completedTasks');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  // Log tasks whenever they change, avoids issue where try to log when setTasks hasn't finished yet
  useEffect(() => {
    console.log('Current tasks:', tasks);
  }, [tasks]);

  const addTask = () => {
    if (value.length > 0) {
      setTasks([...tasks, value]);
      // console.log(`Attempting to add ${value} to 'tasks' list`)
      console.log(tasks)
      setValue(''); // Clear input after submission
    }
  };

  const deleteTask = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    // Create a copy of the array since we can't modify state directly
    const newList = [...list];
    // Remove 1 item at the specified index
    newList.splice(index, 1);
    // Update the state with the new array
    setList(newList);
  };

  const completeTask = (task: string, index: number) => {
    // Add task to completed list
    setCompletedTasks([...completedTasks, task]);
    // console.log(`Attempting to add ${task} to 'completedTasks' list`)
    // console.log(completedTasks)

    deleteTask(tasks, setTasks, index);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl my-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Tasks
        </h1>
        <p className="text-gray-500 mt-2">Organise your day, get things done</p>
      </div>

      {/* Input Group */}
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

      {/* Task Lists Container */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tasks Column */}
        <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Pending Tasks
          </h2>
          <ul className="space-y-3 mt-5">
            {tasks.map((task, index) => (
              <li key={index} className="transform transition-all duration-300 hover:-translate-x-1 hover:translate-y-1">
                <div className="p-4 bg-gradient-to-r from-white to-indigo-50 rounded-lg border border-indigo-100 text-gray-700 flex justify-between items-center group shadow-sm hover:shadow-md">
                  <span className="font-medium">{task}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => completeTask(task, index)} 
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all transform hover:scale-110"
                      title="Complete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteTask(tasks, setTasks, index)} 
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all transform hover:scale-110"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="p-5 text-center">
                <div className="flex flex-col items-center text-gray-400">
                  <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="italic">No tasks yet. Add something!</p>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Completed Tasks Column */}
        <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Completed
          </h2>
          <ul className="space-y-3 mt-5">
            {completedTasks.map((task, index) => (
              <li key={index} className="transform transition-all duration-300 hover:-translate-x-1 hover:translate-y-1">
                <div className="p-4 bg-gradient-to-r from-white to-green-50 rounded-lg border border-green-100 text-gray-400 flex justify-between items-center group shadow-sm hover:shadow-md">
                  <span className="line-through">{task}</span>
                  <div>
                    <button 
                      onClick={() => deleteTask(completedTasks, setCompletedTasks, index)} 
                      className="p-2 rounded-full bg-red-100 text-red-400 hover:bg-red-200 transition-all transform hover:scale-110"
                      title="Remove task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {completedTasks.length === 0 && (
              <li className="p-5 text-center">
                <div className="flex flex-col items-center text-gray-400">
                  <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="italic">Completed tasks will appear here</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-4 border-t border-purple-100 text-center text-gray-500 text-sm">
        {tasks.length === 0 ? (
          <p className="italic">No tasks yet. Add something!</p>
        ) : tasks.length === 1 ? (
          <p>1 task left. You're almost there! 🚀</p>
        ) : (
          <p>{tasks.length} tasks left. You've got this! 🚀</p>
        )} 
      </div>
    </div>
  );
};

export default TodoList; 