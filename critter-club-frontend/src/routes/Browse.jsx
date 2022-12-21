import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Browse({allAnimals}) {
    
    const [letter, setLetter] = useState('');

    const handleClick = (event) => {
        setLetter(event.target.value);
    }

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const animalsByAlphabet = allAnimals.filter((animal) => animal.name[0] === letter);

    const reset = () => {
        setLetter("");
    }
    
    return (
        <div>
            {!allAnimals.length ? (
            <div>
                <p>Please wait while we collect all the animals!</p>
                <img src="https://media.giphy.com/media/a9wFQSc0oRQGI/giphy.gif" alt="herding cats"></img>
            </div>) 
            :
            <div>
                <h1>Browse All Animals</h1>
                <div>
                    {animalsByAlphabet.length > 0 ? <button onClick={reset}>Clear List</button> : null}
                </div>            
                {alphabet.map((letter) => (<button onClick={handleClick} value={letter} key={letter}>{letter}</button>))}
                {animalsByAlphabet.map((animal, i) => (<NavLink to={`/animals/${animal.name}`} key={i}><p key={i}>{animal.name}</p></NavLink>))}
            </div>}
        </div>
    )
}