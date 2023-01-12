import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from "../userContext";
import { Paper, Button, Typography, Box } from "@mui/material";
import { theme } from "../theme/theme";
import usersAPI from '../api/usersAPI';

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
    
    // Get photo url in order to display animal icon for the badge
    const [animalIcons, setAnimalIcons] = useState([]);
    useEffect(() => {
            async function getAnimalIcons() {
                const res = await usersAPI.getAllAnimals();
                setAnimalIcons(res.animals);
            }
            getAnimalIcons();     
    }, []);

    console.log(animalIcons)
    console.log(animalIcons.map((animalIcon) => animalIcon.common_name))
    console.log(animalIcons.filter((animalIcon) => (animalIcon.common_name === "Elephant")));
    console.log(animalIcons.map((animalIcon) => animalIcon.photo).filter((animalIcon) => animalIcon.common_name === "Elephant"))

    return (
        <Paper
        elevation={8}
        sx={{ padding: 8 }}>
        {!currentUser ? 
        <div>
            <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Sign up for a free account to earn badges and level up:</Typography>
            <NavLink to="/signup" className='navbar-link'><Button>Join the Critter Club!</Button></NavLink>    
        </div>
        :
        <Box sx={{ maxWidth: '800px' }}>
            {!allAnimals.length ? (
            <div>
                <p>Please wait while we collect all the animals!</p>
                <img src="https://media.giphy.com/media/a9wFQSc0oRQGI/giphy.gif" alt="herding cats"></img>
            </div>) 
            :
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ fontFamily: theme.typography.primary, m: 1, textAlign: 'center' }}>Browse All Animals</Typography>
                
                {animalsByAlphabet.length > 0 ? <Button id="alt-button" onClick={reset}>Clear List</Button> : null}

                {animalsByAlphabet.map((animal, i) => 
                (
                <NavLink className="link" to={`/animals/${animal.name}`} key={i}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>                        
                        <Typography variant="h5" fontFamily={theme.typography.list} sx={{ m: 3 }} key={i}>{animal.name}</Typography>
                        <img src={animalIcons.filter((animalIcon) => (animalIcon.common_name === animal.name)).map((animalIcon) => animalIcon.photo)} alt={animal.name} height='60px' width='auto'/>
                    </Box>
                </NavLink>)
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {alphabet.map((letter) => (<Button id="alphabet-button" onClick={handleClick} value={letter} key={letter}>{letter}</Button>))}   
                </Box>            
            </Box>}           
        </Box>}
        </Paper>
    )
}