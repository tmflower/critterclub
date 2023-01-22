import AnimalsAPI from '../api/animalsAPI.js';
import usersAPI from '../api/usersAPI.js';
import { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Photo } from './Photo.jsx';
import { Quiz } from '../Challenge/Quiz.jsx';
import { Video } from './Video.jsx';
import UserContext from "../userContext";
import animalsList from '../assets/animalsList.js';
import { Box, Grid, Paper, Button, Typography, Stack } from '@mui/material';
import { theme } from '../theme/theme.js';
import { Fact } from './Fact.jsx'

/** Animal component renders a page with a photo, video and facts about a selected animal;
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
    const animalName = params.animalName;

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
    const [animalIcon, setAnimalIcon] = useState(null);
    
    // Retrieve the data about the selected animal from public Animals api;
    // Display message to user if no such animal exists within the app;
    useEffect(() => {
        if (animalsList.includes(animalName)) {
            async function getAnimalInfo() {
                setIsLoading(true);
                setAnimal(await AnimalsAPI.getSingleAnimal(animalName));
            }
            getAnimalInfo();            
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
    // We limit locations displayed to those on the validLocations list & add correct spacing for multi-word locations
    useEffect(() => {
        async function checkLocations() {
            for (let location of locations) {
                if (!validLocations.includes(location))
                    setShowLocations(false);
                if (location === "NorthAmerica")
                    locations.splice(locations.indexOf("NorthAmerica"), 1, "North America")
                if (location === "SouthAmerica")
                locations.splice(locations.indexOf("SouthAmerica"), 1, "South America")
                if (location === "CentralAmerica")
                locations.splice(locations.indexOf("CentralAmerica"), 1, "Central America")
            }            
        }
        checkLocations();
    }, [locations]);

    // This function checks to see if the user has already earned the badge for this animal;
    // If already earned, the user receives a message instead of the quiz button;
    useEffect(() => {
        async function checkForBadge() {
            if (currentUser) {
                const updatedUser = await usersAPI.getUser(currentUser.user.username);
                const badges = updatedUser.user.userBadges;
                if (badges.includes(animalName)) {
                    setBadgeCollected(true);
                }
            }
        }
        checkForBadge();
    }, [animalName, currentUser])
    
    // Get photo url in order to display animal icon for the badge
    useEffect(() => {
            async function getAnimalIcon() {
                setAnimalIcon(await usersAPI.getAnimal(animalName));
            }
            getAnimalIcon();      
    }, [animalName, animal]);

    const scientificNameText = `The ${commonName}'s scientific name is ${scientificName}.`
    const taxonomicGroupText = `The ${commonName} belongs to a group of animals called ${taxClass}, more commonly known as ${simpleGroupName}.`
    const dietText = `${diet}s, including the ${commonName}, eat ${foods}.`
    const locationsText = `Where in the world you'll find the ${commonName}:`
    const featuresText = `A notable ${commonName} feature: ${features}`
    const preyText = `Its diet includes yummy things like: ${prey}!`
    const habitatText = `The ${commonName} makes its home in ${habitat}.`
    const funFactText = `Fun fact about the ${commonName}: ${funFact}`
    
    return (            
        <Box> 
            { !currentUser ?   
            <Paper
                elevation={8} sx={{ padding: 20 }}>
                <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Sign up for a free account to earn badges and level up:</Typography>
                <NavLink to="/signup" className='navbar-link'><Button>Join the Critter Club!</Button></NavLink>    
            </Paper>
            :
            <>                            
            {isLoading ? <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Collecting your animal information!</Typography> :
                <div>{!animalExists ? <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Sorry, we don't have information about that animal yet!</Typography> : 
                    <div>{!animalSelected ?                             
                        <Box> 
                            <Grid 
                                container 
                                sx={{ mt: 8 }}
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                >                  
                                    <Grid item xs={12} lg={6}>
                                        <Typography variant="h2" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Meet the {commonName}!</Typography>
                                        
                                        <Stack
                                            alignItems="center">
                                        {badgeCollected ? 
                                        <>
                                        <Typography variant="h6" sx={{ fontFamily: theme.typography.primary, m: 1 }}>You've already collected this badge. Great job! Let's try for your next one!</Typography>
                                        <Typography variant="h6" sx={{ fontFamily: theme.typography.primary, m: 1 }}> <NavLink to="/animals/browse">Check out more animals</NavLink></Typography>
                                        </>
                                        :
                                        <Button onClick={selectAnimal}>Earn the {commonName} badge</Button>} 
                                            {animalIcon ?                                           
                                            <Paper 
                                                elevation={18} 
                                                sx={{ 
                                                    borderRadius: '50%', 
                                                    height: 200, 
                                                    width: 320, 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    margin: 2 }}>
                                                        <img 
                                                            src={animalIcon.animal.photo} 
                                                            alt={animalName}
                                                            style={{ maxWidth: 150, maxHeight: 130 }}/>        
                                            </Paper> : null}                                       
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Photo animalName={animalName}/>
                                    </Grid>
                            </Grid>            

                            <Grid container textAlign="center"> 
                                <Grid item xs={12} sx={{ mt: 3 }}>
                                    <Typography variant="h4" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Click on each topic to learn about the {commonName}</Typography>
                                </Grid>


                            {scientificName ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact 
                                        emoji="🧠"
                                        title="Scientific Name"
                                        text={scientificNameText}/>
                                </Grid> 
                                : null}

                            {taxClass ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="🧬"
                                        title="Taxonomic Group"
                                        text={taxonomicGroupText}
                                        >
                                    </Fact>
                                </Grid> 
                                : null}

                            {diet ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="🍔"
                                        title="Diet Category"
                                        text={dietText}
                                    >
                                    </Fact>
                                </Grid> 
                                : null} 

                            {prey ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="😋"
                                        title="Favorite Foods"
                                        text={preyText}
                                    >  
                                    </Fact>                                        
                                </Grid> 
                                : null} 

                            {locations && showLocations ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="🌍"
                                        title="Locations"
                                        text={locationsText}
                                        listItems={locations}
                                    >
                                    </Fact>                                                                  
                                </Grid> 
                                : null}

                            {features ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="🧐"
                                        title="Features"
                                        text={featuresText}
                                    >
                                    </Fact>
                                </Grid> 
                                : null} 
                            
                            {habitat ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="🏠"
                                        title="Habitat"
                                        text={habitatText}
                                    >
                                    </Fact>
                                </Grid> 
                                : null}


                            {funFact ? 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <Fact
                                        emoji="😎"
                                        title="Fun Fact"
                                        text={funFactText}>
                                    </Fact>
                                </Grid> 
                                : null} 
                            </Grid>

                            <Grid 
                                container 
                                sx={{ mt: 3 }}
                                direction="column"
                                alignItems="center"
                                >  
                                <Typography variant="h4" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Check out this video for more about the {commonName}!</Typography>

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
                            icon={animalIcon.animal.photo}
                        ></Quiz>
                        }
                </div>}
            </div>}
            </>}
        </Box> 
    );
}

export default validLocations;