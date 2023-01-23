import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../userContext";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { theme } from "../theme/theme";
import usersAPI from "../api/usersAPI";

/** Search renders a page that allows user to search for animals by typing in their name or part of their name
 * A list of animal names will display dynamically as the user types
 * If there are no animals matching user input, user will receive a message
 * User can click on animal name to visit Animal page with information and quiz for that animal
 * If allAnimals has not yet loaded, user will see a message and a gif while it loads
 * 
 */

export function Search({ allAnimals }) {

    // Variable to check if user is logged in
    const currentUser = useContext(UserContext);

    // Initialize variable for user input and set to blank
    const [searchTerm, setSearchTerm] = useState("");

    // Function to set search term to match user input; called onChange to respond as user types
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    // Function to prevent page reload if user presses enter
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // Function to return list of animals containing letters typed by user
    const matchingAnimals = allAnimals.filter((animal) => animal.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Get photo url in order to display animal icon for the badge
    const [animalIcons, setAnimalIcons] = useState([]);
    useEffect(() => {
            async function getAnimalIcons() {
                const res = await usersAPI.getAllAnimals();
                setAnimalIcons(res.animals);
            }
            getAnimalIcons();     
    }, []);

    return (
        <Paper
            elevation={8}
            sx={{ padding: 20 }}>
        {!currentUser ? 
            <div>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 1 }}>Sign up for a free account to earn badges and level up:
                </Typography>
                <NavLink 
                    to="/signup" 
                    className='navbar-link'>
                    <Button>Join the Critter Club!</Button>
                </NavLink>    
            </div>
        :
        <div>
            {!allAnimals.length ? 
            (<div>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 1}}>
                    Please wait while we collect all the animals!
                </Typography>
                <img 
                    src="https://media.giphy.com/media/a9wFQSc0oRQGI/giphy.gif" 
                    alt="herding cats"/>
            </div>) 
            :
            <div>
                <Typography 
                    variant="h3" 
                    sx={{ fontFamily: theme.typography.primary, m: 1 }}>
                    Search for an Animal
                </Typography>
                <form onSubmit={handleSubmit}>                    
                    <TextField 
                        type="search" 
                        onChange={handleSearch} 
                        value={searchTerm} 
                        label="Search">
                    </TextField>                    
                </form>
                {!searchTerm.length ? 
                    <Typography 
                        variant="h5" 
                        sx={{ fontFamily: theme.typography.primary, m: 1 }}>
                        Start typing to search for an animal.
                    </Typography> 
                : 
                    <Box>
                        {matchingAnimals.length ? 
                        (matchingAnimals.map((animal, i) => 
                            (<NavLink 
                                className="link" 
                                to={`/animals/${animal.name}`} 
                                key={i}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                        <Typography 
                                            variant="h5" 
                                            fontFamily={theme.typography.list} 
                                            sx={{ m: 3 }} 
                                            key={i}>{animal.name}
                                        </Typography>
                                        <img 
                                            src={animalIcons.filter((animalIcon) => 
                                                (animalIcon.common_name === animal.name))
                                                .map((animalIcon) => animalIcon.photo)} 
                                            alt={animal.name} 
                                            height='60px' 
                                            width='auto'/>
                                    </Box>
                            </NavLink>)))                    
                        : (<p>Sorry, we don't have information about that animal.</p>)}
                    </Box>
                }
            </div> }       
            <div/>
        </div>}
        </Paper>
    )
}