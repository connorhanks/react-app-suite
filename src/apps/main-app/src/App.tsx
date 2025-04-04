import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoApp from '@react-app-suite/todo-app';
import WeatherApp from '@react-app-suite/weather-app';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/weather" element={<WeatherApp />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
