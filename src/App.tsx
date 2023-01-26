import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Alarm from './Alarm';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Alarm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
