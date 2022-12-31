import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { Box, Alert } from '@mui/material';
import { theme } from './theme/theme';

export function App() {

  const navigate = useNavigate();
  const [allAnimals, setAllAnimals] = useState([]);
  const [username, setUsername] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  // if there is a token in localStorage, save it in state;
  // token is saved to localStorage upon successful signup and login
  const [token, setToken] = useState(() => {
    let value;
    value = JSON.parse(window.localStorage.getItem('token') || null);
    return value;
  });

  useEffect(() => {
    async function getAllAnimals() {
        // retrieve curated list from public api; pass allAnimals to Browse and Search
        const animals = await AnimalsAPI.getAllAnimals();
        // we sort the animals alphabetically to ensure that their index numbers will align with id numbers in animals relation; needed for tracking each user's collected animal badges
        const sortedAnimals = animals.sort((a, b) => a.name.localeCompare(b.name));
        setAllAnimals(sortedAnimals);
    }
    getAllAnimals();
  }, []);

console.log(allAnimals);

  useEffect(() => {
    async function getUserData() {
      // if signup/login is successful, we save the token in localStorage, decode it to access the user data, and add it to the User model for this user;
      // we set the currentUser in state for access across the app via UserContext
      if(token) { console.log("THERE IS A TOKEN!!!")
        window.localStorage.setItem('token', `"${token}"`);
        const user = jwt.decode(token);
        usersAPI.token = token;
        console.log("***************USER", user);
        setUsername(user.username);
        console.log("***************USERNAME", username);
        setCurrentUser(await usersAPI.getUser(username));
      }
    }
    getUserData();
  }, [token, username]);

  async function signup(userData) {
    // responses for successful and unsuccessful signup
    try {
      setToken(await usersAPI.registerUser(userData));
      setUsername(userData.username);     
      alert(`Welcome to Critter Club, ${ userData.username }!`);
      navigate("/dashboard", { replace: true });
    }
    catch (err) {
      alert("Please enter the access code from your parent.")
    }
  }

  async function login(userData) {
    // responses for successful and unsuccessful login
    try {
      setToken(await usersAPI.loginUser(userData));
      setUsername(userData.username);  
      // alert(`Welcome back, ${ userData.username }!`);
      navigate("/dashboard", { replace: true });
    }
    catch(err) {
      alert("Please enter a valid username and password");
    }
  }

  async function logout() {
    // clear user data upon logout
    setToken('');
    setUsername('');
    setCurrentUser(null);
    setJustLoggedOut(true);
    navigate("/", { replace: true });
    // alert('See ya later, alligator!');
  }

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}> 
      <Navbar logout={logout}/>
      <Box
        sx={{
          color: 'black',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: theme.typography.primary,
          padding: '3rem'
        }}>
          <Routes>
            <Route path="/" element={<Home justLoggedOut={justLoggedOut}/>} ></Route>
            <Route path="/parent" element={<ParentSignup />}></Route>
            <Route path="/parent/:username" element={<Code />}></Route>
            <Route path="/signup" element={<Signup signup={signup}/>}></Route>
            <Route path="/login" element={<Login login={login} />}></Route>
            <Route path="/logout" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/animals/browse" element={<Browse allAnimals={allAnimals}/>}></Route>
            <Route path="/animals/search" element={<Search allAnimals={allAnimals} />}></Route>
            <Route path="/animals/:animal" element={<Animal />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
          </Routes>       
      </Box>
      </UserContext.Provider>
    </div>
  );
}