import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect,  } from 'react';
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
import usersAPI from './api/usersAPI';
import UserContext from './userContext';
import jwt from 'jsonwebtoken';

export function App() {

  const [allAnimals, setAllAnimals] = useState([]);
  const [username, setUsername] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useState(() => {
    let value;
    value = JSON.parse(window.localStorage.getItem('token') || null);
    return value;
  });

  useEffect(() => {
    async function getAllAnimals() {
        setAllAnimals(await AnimalsAPI.getAllAnimals());
    }
    getAllAnimals();
  }, []);

  useEffect(() => {
    async function getUserData() {
      if(token) {
        window.localStorage.setItem('token', `"${token}"`);
        const user = jwt.decode(token);
        usersAPI.token = token;
        setUsername(user.username);
        setCurrentUser(await usersAPI.getUser(username));
      }
    }
    getUserData();
  }, [token, username]);

  async function login(userData) {
    setToken(await usersAPI.loginUser(userData));
    setUsername(userData.username);   
  }

async function logout() {
  setToken('');
  setUsername('');
  setCurrentUser(null);
  alert('see ya later alligator!');
}

  return (
    <div className="App">
    <UserContext.Provider value={currentUser}>    
      <Navbar logout={logout}/>
      <header className="App-header">      
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/parent" element={<ParentSignup />}></Route>
          <Route path="/parent/:username" element={<Code />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login login={login} />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/animals/browse" element={<Browse allAnimals={allAnimals} />}></Route>
          <Route path="/animals/search" element={<Search allAnimals={allAnimals} />}></Route>
          <Route path="/animals/:animal" element={<Animal />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </header>
      </UserContext.Provider>
    </div>
  );
}