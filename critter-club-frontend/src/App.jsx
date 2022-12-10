import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimalsAPI from './api/animalsAPI';
import { Home } from './Home';
import { Animals } from './Animals';
import { Animal } from './Animal';
import { Quiz } from './Quiz';
import { Browse } from './Browse';

export function App() {

  const [allAnimals, setAllAnimals] = useState([]);

  useEffect(() => {
    async function getAllAnimals() {
        setAllAnimals(await AnimalsAPI.getAllAnimals());
    }
    getAllAnimals();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/animals" element={<Animals allAnimals={allAnimals}/>}></Route>
          <Route path="/animals/browse" element={<Browse allAnimals={allAnimals}/>}></Route>
          <Route path="/animals/:animal" element={<Animal/>}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </header>
    </div>
  );
}