import AnimalsAPI from '../api/animalsAPI.js';
import { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Photo } from './Photo.jsx';
import { Quiz } from '../Challenge/Quiz.jsx';
import { Video } from './Video.jsx';
import UserContext from "../userContext";
import animalsList from '../utils/animalsList.js';
import { Box, Grid, Paper, List, ListItem, Button } from '@mui/material';
import { theme } from '../theme/theme.js';

/** Animal renders a page with a photo, video and facts about a selected animal;
 * It also renders Quiz, which is only viewable when user clicks on button;
 * animalSelected is a boolean that handles this conditional rendering  */

const validLocations = [ 
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "NorthAmerica",
    "Eurasia",
    "Ocean",
    "CentralAmerica",
    "SouthAmerica",
    "Oceania"
];

export function Animal() {
    
    const currentUser = useContext(UserContext);
    const params = useParams();
    const animalName = params.animal;

    const [animal, setAnimal] = useState(null);
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [habitat, setHabitat] = useState("");
    const [phylum, setPhylum] = useState("");
    const [locations, setLocations] = useState([]);
    const [taxClass, setTaxClass] = useState("");
    const [diet, setDiet] = useState("");
    const [funFact, setFunFact] = useState("");
    const [features, setFeatures] = useState("");
    const [prey, setPrey] = useState([]);
    const [foods, setFoods] = useState("");
    const [simpleGroupName, setSimpleGroupName] = useState("");
    const [animalSelected, setAnimalSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [badgeCollected, setBadgeCollected] = useState(false);
    const [animalExists, setAnimalExists] = useState(true);
    const [showLocations, setShowLocations] = useState(true);
    
    // Retrieve the data about the selected animal from public Animals api;
    // Display message to user if no such animal exists within the app;
    useEffect(() => {
        if (animalsList.includes(animalName)) {
            async function getAnimal() {
                setIsLoading(true);
                setAnimal(await AnimalsAPI.getSingleAnimal(animalName));
            }
            getAnimal();
        }
        else setAnimalExists(false);
    }, [animalName]);

    // Save selected animal details in state
    // These are rendered on the info page and passed to Quiz for use in questions
    useEffect(() => {
        if (animal) {  
            setIsLoading(false);  
            setCommonName(animal.name);
            setScientificName(animal.taxonomy.scientific_name);
            setPhylum(animal.taxonomy.phylum);
            setHabitat(animal.characteristics.habitat);
            setLocations(animal.locations.map(location => location.replace(/[^a-z]/gi, "")));
            setDiet(animal.characteristics.diet);
            setTaxClass(animal.taxonomy.class);
            setFunFact(animal.characteristics.slogan);
            setFeatures(animal.characteristics.most_distinctive_feature);
            setPrey(animal.characteristics.prey);
        }
        if (habitat) setHabitat(habitat.toLowerCase());
        if (taxClass) setTaxClass(taxClass.toLowerCase());
    }, [animal, habitat, taxClass]);

    // This function is called when user clicks the quiz button and reveals quiz to user;
    const selectAnimal = () => {
        setAnimalSelected(true);
    }
    console.log(currentUser);
    console.log(animal);

    // This function sets a second variable with child-friendly language to accompany the taxonomic class of the animal
    useEffect(() => {
        async function modifyGroupName() {
            if (taxClass === "sarcopterygii" || taxClass === "actinopterygii" || taxClass === "chondrichthyes")
                setSimpleGroupName("fish");
            if (taxClass === "mammalia")
                setSimpleGroupName("mammals");
            if (taxClass === "reptilia")
                setSimpleGroupName("reptiles");
            if (taxClass === "amphibia")
                setSimpleGroupName("amphibians");
            if (taxClass === "aves")
                setSimpleGroupName("birds");
            if (taxClass === "insecta")
                setSimpleGroupName("insects");
            if (taxClass === "clitellata")
                setSimpleGroupName("annelid worms");
            if (taxClass === "cephalopoda")
                setSimpleGroupName("cephalopods");
            if (taxClass === "bivalvia")
                setSimpleGroupName("bivalves");
            if (taxClass === "gastropoda")
                setSimpleGroupName("gastropods")
        }
        modifyGroupName();
    }, [taxClass]);

    // This function enables providing the user with a brief definition of each diet term
    useEffect(() => {
        async function defineDiet() {
            if (diet === "Herbivore")
                setFoods("mostly plants");
            if (diet === "Carnivore")
                setFoods("mostly other animals");
            if (diet === "Omnivore")
                setFoods("a combination of plants and animals"); 
        }
        defineDiet();
    }, [diet]);

    // There is data in some of the locations arrays that could be confusing to the user.
    // We limit locations displayed to those on the validLocations list
    useEffect(() => {
        async function checkLocations() {

            for (let location of locations) {
                if (!validLocations.includes(location))
                    setShowLocations(false);
            }            
        }
        checkLocations();
    }, [locations])

    // This function checks to see if the user has already earned the badge for this animal;
    // If already earned, the user receives a message instead of the quiz button;
    useEffect(() => {
        async function checkForAnimal() {
            const badges = currentUser.user.userBadges;
            if (badges.includes(animalName)) {
                setBadgeCollected(true);
            }
        }
        checkForAnimal();
    }, [animalName, currentUser])

    return (            
        <Box >                              
            {isLoading ? <p>Collecting your animal information!</p> :
                <div>{!animalExists ? <p>Sorry, we don't have information about that animal yet!</p> : 
                    <div>{!animalSelected ?                             
                        <Box> 
                            <Grid 
                                container 
                                sx={{ mt: 3 }}
                                direction="column"
                                alignItems="center"
                                >                  
                                    <Grid item xs={12}>
                                        <h1>Meet the {commonName}!</h1>
                                    </Grid> 
                                                            
                                    <Grid item xs={12} sm={6}>
                                        <Photo animalName={animalName}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                    {badgeCollected ? <p>You've already collected this badge. Great job! Let's try for your next one! <NavLink to="/animals/browse">Check out more animals</NavLink></p>
                                    :
                                    <Button onClick={selectAnimal}>Collect the {commonName} badge!</Button>}                           
                                    </Grid>                       
                            </Grid>            

                            <Grid container>
                                
                                {scientificName ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🧠</p>
                                        <p>The {commonName}'s scientific name is <em>{scientificName}</em>.</p>
                                    </Paper>
                                </Grid> 
                                : null}

                                {funFact ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>😎</p>
                                        <p>{commonName} fun fact: {funFact}</p>
                                    </Paper>
                                </Grid> 
                                : null} 

                                {habitat ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🏠</p>
                                        <p>The {commonName} makes its home in {habitat}.</p>
                                    </Paper>
                                </Grid> 
                                : null}

                                {taxClass ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🧬</p>
                                        <p>The {commonName} belongs to a group of animals called {taxClass}, more commonly known as {simpleGroupName}.</p>
                                    </Paper>
                                </Grid> 
                                : null}

                                {diet ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🍔</p>
                                        <p>{diet}s like the {commonName} eat {foods}.</p>
                                    </Paper>
                                </Grid> 
                                : null}  

                                {prey ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>😋</p>
                                        <span>Its diet includes yummy things like: {prey}!</span>
                                    </Paper>
                                </Grid> 
                                : null} 

                                {features ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🧐</p>
                                        <p>A notable {commonName} feature: {features}</p>
                                    </Paper>
                                </Grid> 
                                : null} 

                                {locations && showLocations ? 
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{ 
                                            padding: 3, 
                                            margin: 3, 
                                            color: theme.typography.secondary.color, 
                                            backgroundColor: theme.palette.primary.main }}>
                                        <p className='emoji'>🌍</p>
                                        <List>Where in the world you'll find the {commonName}:{locations.map((location, i) => <ListItem key={i}>{location}</ListItem>)}</List>
                                    </Paper>
                                </Grid> 
                                : null}
                            </Grid>
                            <Grid 
                                container 
                                sx={{ mt: 3 }}
                                direction="column"
                                alignItems="center"
                                >  
                                <h3>Check out this video for more about the {commonName}!</h3>

                                <Video animalName={animalName}></Video>
                            </Grid>
                        </Box>                    
                        :
                        <Quiz 
                            commonName={commonName}
                            scientificName={scientificName}
                            locations={locations}
                            diet={diet}
                            phylum={phylum}
                            taxClass={taxClass}
                            setTaxClass={setTaxClass}
                            prey={prey}
                            features={features}
                            setAnimalSelected={setAnimalSelected}
                            validLocations={validLocations}
                        ></Quiz>
                        }
                </div>}
            </div>}
            
        </Box> 
    );
}

export default validLocations;