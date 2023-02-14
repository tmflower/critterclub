import { useEffect, useState } from 'react';
import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';
import usersAPI from '../api/usersAPI';
import { useContext } from 'react';
import UserContext from '../userContext';
import { useNavigate, Link } from 'react-router-dom';
import validLocations from '../Animal/Animal';
import { Button, Modal, Box, Paper, IconButton, Typography, Stack } from '@mui/material';
import Close from "@mui/icons-material/Close";
import { theme } from "../theme/theme";
import gifs from '../assets/gifs';


/** Quiz component renders a set of questions about the selected animal;
 * User can check each answer individually;
 * Submit button only displays when 2 or more answers are correct;
 * User may go back to review facts on animal page, then return to Quiz;
 * On submit, user receives points and badge and is redirected to dashboard;
 * User will also see a congratulations messages with a celebration gif;
 */
const minNumQuestionsRequired = 2;

/** Quiz accepts props from Animal component; these provide the basis for the questions 
* Logged-in user is accessed with useContext;
* If user is not logged in, Quiz is not displayed; user will be prompted to sign up or log in
*/

export function Quiz({
                    taxClass,
                    setTaxClass, 
                    commonName, 
                    scientificName, 
                    locations, 
                    diet, 
                    phylum, 
                    prey, 
                    setAnimalSelected,
                    icon }) {

    const currentUser = useContext(UserContext);
    const username = currentUser.user.username;
    const userId = currentUser.user.id;
    const navigate = useNavigate();

    const message = {
        correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
        incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
    };

    const [points, setPoints] = useState(0);
    const [numQuestions, setNumQuestions] = useState(0);
    const [animalId, setAnimalId] = useState();
    const [animals, setAnimals] = useState([]);

    // Retrieve list of all animals in db;
    // We'll use this to create a badge for this user & animal;
    useEffect(() => {
        async function getAnimals() {
            const res = await usersAPI.getAllAnimals();
            setAnimals(res.animals);
        }
        getAnimals();
    }, [commonName]);

    // From the list of all animals, locate the selected animal by name;
    // Set animalId to be the id number in the animals table in db;
    // We'll use animalId to add a badge for this user & animal
    useEffect(() => {
        async function getAnimalId() {
            if(animals.length) {
                const animal = animals.filter(animal => commonName === animal.common_name);
                setAnimalId(animal[0].id);
            }
        } 
        getAnimalId();
    },[animals, commonName]);

    /** When user submits answers:
     * - Redirect user to dashboard
     * - Update user's points
     * - Update user's badges
     * - Provide congratulations message to user
     */
    async function handleSubmit() {
            await usersAPI.updatePoints({ username, points });
            await usersAPI.addBadge({ animalId, userId });
            handleOpen();
    }

    // Handle opening and closing of modal to with congratulations message when user earns badge;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
    navigate("/dashboard", {replace: true});         
    }

    // This function allows user to return from quiz view to animal info view;  
    const handleClick = () => {
        setAnimalSelected(false);
    }
    
    // Selects a gif at random to display in modal when user earns badge;
    const randomNum = Math.floor(Math.random() * gifs.length);
    const gif = gifs[randomNum];

    return (
        <Box sx={{ mt: 5 }}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
                <Paper 
                    className="popup" 
                    sx={{ padding: '2rem '}}>
                    <IconButton onClick={handleClose}>
                        <Close sx={{ color: theme.typography.primary }}/>
                    </IconButton>
                    <Stack>
                        <img 
                            id="modal-img"
                            src={gif} 
                            alt="celebration"/>
                        <Typography 
                            id="modal-modal-title" 
                            variant="h4" 
                            sx={{ fontFamily: theme.typography.primary, textAlign: 'center' }}>Congratulations, {username}!
                        </Typography>
                        <Typography 
                            id="modal-modal-description" 
                            variant="h5" 
                            sx={{ mt: 2, fontFamily: theme.typography.primary, textAlign: 'center' }}>You earned {points} points and the {commonName} badge!
                        </Typography>
                    </Stack>

                </Paper>
                </Box>
            </Modal>

            <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center'}}>
                <Typography 
                    variant="h3" 
                    sx={{ fontFamily: theme.typography.primary, m: 1 }}>Take the {commonName.toUpperCase()} challenge!
                </Typography>
                <img 
                    src={icon} 
                    alt={commonName} 
                    width="400px" 
                    className="animalIcon"/>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 2 }}>Earn 10 points for each correct answer. Check each answer as you go. If you get it wrong, you can check the animal info and try again.
                </Typography>
                <img 
                    src={icon} 
                    alt={commonName} 
                    width="80px"/>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 2 }}>When at least 2 answers are correct, the <span id="mock-btn">Submit Answers</span> button will appear at the bottom of the page.
                </Typography>
                <img 
                    src={icon} 
                    alt={commonName} 
                    width="80px"/>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 2 }}>For more points and faster leveling up, answer any additional questions before you submit your answers.
                </Typography>
                <img 
                    src={icon} 
                    alt={commonName} 
                    width="80px"/>
                <Typography 
                    variant="h5" 
                    sx={{ fontFamily: theme.typography.primary, m: 2 }}>Visit your <Link to="/dashboard">dashboard</Link> to see your current level and how many points you need to level up.
                </Typography>
            </Box>

            <DietForm 
                commonName={commonName} 
                diet={diet}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </DietForm>

            <LocationsForm 
                commonName={commonName} 
                locations={locations}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                validLocations={validLocations}
                >
            </LocationsForm>

            {phylum === "Chordata" ?  
                <TaxClassForm 
                    commonName={commonName} 
                    taxClass={taxClass} 
                    setTaxClass={setTaxClass} 
                    phylum={phylum}
                    message={message}
                    points={points}
                    setPoints={setPoints}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    >
                </TaxClassForm> 
            : null} 

            { prey ? 
                <PreyForm 
                    commonName={commonName} 
                    prey={prey}
                    message={message}
                    points={points}
                    setPoints={setPoints}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    >
                </PreyForm> 
            : null }

            {scientificName ?
                <ScientificNameForm 
                    commonName={commonName} 
                    scientificName={scientificName}
                    message={message}
                    points={points}
                    setPoints={setPoints}
                    numQuestions={numQuestions}
                    setNumQuestions={setNumQuestions}
                    >
                </ScientificNameForm>  
            : null }   

            <Button 
                type="button" 
                onClick={handleClick} 
                id="alt-button">Return to animal info
            </Button>
            { numQuestions >= minNumQuestionsRequired ?           
                <Button 
                    type="submit" 
                    onClick={handleSubmit} 
                    id="alt-button">Submit Your Answers
                </Button> 
            : null }
        </Box>
    )
}
