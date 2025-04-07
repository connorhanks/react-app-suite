import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TodoApp from './components/TodoApp'
import WeatherApp from './components/WeatherApp'
import { WeatherProvider } from './context/WeatherContext'
import './App.css'

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Array of micro-apps for dashboard
  const microApps = [
    { id: 'todo', name: 'Todo List', emoji: '📝', color: 'bg-gradient-to-r from-orange-400 to-orange-600', disabled: false },
    { id: 'weather', name: 'Weather App', emoji: '🌤️', color: 'bg-gradient-to-r from-blue-400 to-indigo-600', disabled: false },
    { id: 'notes', name: 'Notes App', emoji: '📓', color: 'bg-gradient-to-r from-green-400 to-teal-600', disabled: true },
    { id: 'pomodoro', name: 'Pomodoro Timer', emoji: '⏱️', color: 'bg-gradient-to-r from-red-400 to-pink-600', disabled: true },
    { id: 'calculator', name: 'Calculator', emoji: '🧮', color: 'bg-gradient-to-r from-purple-400 to-purple-600', disabled: true },
    { id: 'gallery', name: 'Photo Gallery', emoji: '🖼️', color: 'bg-gradient-to-r from-yellow-400 to-amber-600', disabled: true }
  ];

  // Get the current active app from the URL
  const activeApp = location.pathname.slice(1) || 'todo';

  // Update the page title when the route changes
  useEffect(() => {
    const currentApp = microApps.find(app => app.id === activeApp);
    document.title = currentApp ? `${currentApp.name} | App Collection` : 'App Collection';
  }, [activeApp]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${microApps.find(app => app.id === activeApp)?.color.replace('to-r', 'to-b').replace('from-orange-400', 'from-orange-50').replace('from-blue-400', 'from-blue-50').replace('from-red-400', 'from-red-50').replace('from-green-400', 'from-green-50').replace('from-purple-400', 'from-purple-50').replace('from-yellow-400', 'from-yellow-50').replace('to-orange-600', 'to-orange-100').replace('to-indigo-600', 'to-indigo-100').replace('to-pink-600', 'to-pink-100').replace('to-teal-600', 'to-teal-100').replace('to-purple-600', 'to-purple-100').replace('to-amber-600', 'to-amber-100')}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">App Collection</h1>
        <p className="text-center text-gray-600 mb-8">A collection of my micro-apps, built to learn React</p>
        
        {/* App selection tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {microApps.map(app => (
            <button
              key={app.id}
              onClick={() => !app.disabled && navigate(`/${app.id}`)}
              disabled={app.disabled}
              className={`${app.disabled 
                ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                : app.color} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform ${
                  !app.disabled && 'hover:-translate-y-1'
                } ${activeApp === app.id ? 'ring-4 ring-pink-200' : ''}`}
            >
              <div className="text-2xl mb-1">{app.emoji}</div>
              <div className="font-medium text-sm">
                {app.name}
                {app.disabled && <span className="block text-xs">(Coming Soon)</span>}
              </div>
            </button>
          ))}
        </div>
        
        {/* Active app container */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 transition-all duration-500 overflow-hidden border border-gray-100">
          {/* Title bar with status dots */}
          <div className="flex items-center mb-5 border-b border-gray-100 pb-3">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-center flex-1 font-medium text-gray-600 pr-10">
              {microApps.find(app => app.id === activeApp)?.name || 'Todo List'}
            </div>
          </div>
          
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50 z-0 pointer-events-none"></div>
          
          {/* Content container */}
          <div className="relative z-10">
            <Routes>
              <Route path="/todo" element={<TodoApp />} />
              <Route path="/weather" element={
                <WeatherProvider>
                  <WeatherApp />
                </WeatherProvider>
              } />
              <Route path="/notes" element={<div className="p-6 text-center text-gray-500">Notes Placeholder 📓</div>} />
              <Route path="/pomodoro" element={<div className="p-6 text-center text-gray-500">Pomodoro Placeholder ⏱️</div>} />
              <Route path="/calculator" element={<div className="p-6 text-center text-gray-500">Calculator Placeholder 🧮</div>} />
              <Route path="/gallery" element={<div className="p-6 text-center text-gray-500">Gallery Placeholder 🖼️</div>} />
              <Route path="/" element={<TodoApp />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App