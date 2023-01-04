import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from "../userContext";
import { Paper, Button } from "@mui/material";

/** Browse renders a page that allows user to peruse the list of animals by clicking on a letter
 * Each letter returns a list of animals whose names begin with that letter
 * User can click on animal name to visit Animal page with information and quiz for that animal
 * If allAnimals has not yet loaded, user will see a message and a gif while it loads
 * 
 */

export function Browse({allAnimals}) {
    
    // Variable to check if user is logged in
    const currentUser = useContext(UserContext);

    // Variable to identify selected letter;
    const [letter, setLetter] = useState('');

    // Function to select letter when user clicks on it
    const handleClick = (event) => {
        setLetter(event.target.value);
    }

    // Alphabet array to facilitate filtering by first letter of animal name
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // function to return animals matching selected letter
    const animalsByAlphabet = allAnimals.filter((animal) => animal.name[0] === letter);

    // function to allow user to clear animal names list
    const reset = () => {
        setLetter("");
    }
    
    return (
        <Paper
        elevation={8}
        sx={{ padding: 20 }}>
        {!currentUser ? 
        <div>
            <h3>Sign up for a free account to earn badges and level up:</h3>
            <NavLink to="/signup" className='navbar-link'><Button>Join the Critter Club!</Button></NavLink>    
        </div>
        :
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
                    {animalsByAlphabet.length > 0 ? <Button id="clear-list-button" onClick={reset}>Clear List</Button> : null}
                </div>            
                {alphabet.map((letter) => (<Button onClick={handleClick} value={letter} key={letter}>{letter}</Button>))}
                {animalsByAlphabet.map((animal, i) => (<NavLink to={`/animals/${animal.name}`} key={i}><p key={i}>{animal.name}</p></NavLink>))}
            </div>}
        </div>}
        </Paper>
    )
}