import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Animals } from './Animals';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/animals" element={<Animals />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
