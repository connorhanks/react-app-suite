import React, { useState, useEffect } from 'react';
import Header from './Header';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Footer from './Footer';

const TodoApp: React.FC = () => {
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

  const addTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const completeTask = (task: string, index: number) => {
    setCompletedTasks([...completedTasks, task]);
    deleteTask(tasks, setTasks, index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl my-10">
      <Header />
      <TaskInput onAddTask={addTask} />
      
      <div className="grid md:grid-cols-2 gap-8">
        <TaskList
          title="Pending Tasks"
          tasks={tasks}
          type="pending"
          onComplete={completeTask}
          onDelete={(index) => deleteTask(tasks, setTasks, index)}
        />
        <TaskList
          title="Completed"
          tasks={completedTasks}
          type="completed"
          onDelete={(index) => deleteTask(completedTasks, setCompletedTasks, index)}
        />
      </div>

      <Footer taskCount={tasks.length} />
    </div>
  );
};

export default TodoApp; 