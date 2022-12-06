import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Animals } from './Animals';
import { Animal } from './Animal';
import { Quiz } from './Quiz';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/animals" element={<Animals />}></Route>
          <Route path="/animals/:animal" element={<Animal/>}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </header>
    </div>
  );
}