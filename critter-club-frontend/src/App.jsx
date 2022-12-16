import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimalsAPI from './api/animalsAPI';
import { Home } from './routes/Home';
import { Animals } from './routes/Animals';
import { Animal } from './Animal/Animal';
import { Quiz } from './Challenge/Quiz';
import { Browse } from './routes/Browse';
import { Navbar } from './Navbar';
import { Signup } from './routes/Signup';
import { Login } from './routes/Login';

export function App() {

  const [allAnimals, setAllAnimals] = useState([]);

  useEffect(() => {
    async function getAllAnimals() {
        setAllAnimals(await AnimalsAPI.getAllAnimals());
    }
    getAllAnimals();
  }, []);

  // const animalsList = ['cheetah', 'adelie_penguin', 'african_palm_civet'];

  // useEffect(() => {
  //   async function getAnimals() {
  //     const animals = await AnimalsAPI.getAnimal(animalsList);
  //     setAllAnimals(animals);
  //   }
  //   getAnimals()
  //   }, []);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/animals" element={<Animals allAnimals={allAnimals}/>}></Route>
          <Route path="/animals/browse" element={<Browse allAnimals={allAnimals}/>}></Route>
          <Route path="/animals/:animal" element={<Animal/>}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </header>
    </div>
  );
}