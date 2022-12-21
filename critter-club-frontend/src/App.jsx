import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimalsAPI from './api/animalsAPI';
import { Home } from './routes/Home';
import { Dashboard } from './routes/Dashboard';
import { Animal } from './Animal/Animal';
import { Quiz } from './Challenge/Quiz';
import { Browse } from './routes/Browse';
import { Search } from './routes/Search';
import { Navbar } from './Navbar';
import { Signup } from './routes/Signup';
import { Login } from './routes/Login';
import { Code } from './routes/Code';
import ParentSignup from './routes/ParentSignup';


export function App() {

  const [allAnimals, setAllAnimals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getAllAnimals() {
        setAllAnimals(await AnimalsAPI.getAllAnimals());
    }
    getAllAnimals();
  }, []);


  return (
    <div className="App">
      <Navbar />
      <header className="App-header">      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/parent" element={<ParentSignup />}></Route>
          <Route path="/parent/:username" element={<Code />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/animals/browse" element={<Browse allAnimals={allAnimals} />}></Route>
          <Route path="/animals/search" element={<Search allAnimals={allAnimals} />}></Route>
          <Route path="/animals/:animal" element={<Animal />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </header>
    </div>
  );
}