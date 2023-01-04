import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import usersAPI from "../api/usersAPI";
import UserContext from "../userContext";
import { Badge } from "../Animal/Badge";
import { 
    Grid, 
    Box, 
    Modal, 
    Button, 
    Typography, 
    Paper, 
    IconButton,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Alert
 } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { theme } from "../theme/theme";
import zebra from "../assets/zebra.png";

const levels = {
    0: 'Observer',
    100: 'Explorer', 
    500: 'Adventurer', 
    1000: 'Naturalist', 
    2500: 'Ecologist', 
    5000: 'Zoologist' 
}
/** Dashboard provides personalized user information including badges earned, current points, and level achieved */

export function Dashboard({ alert }) {
    
    const currentUser = useContext(UserContext);
    const [userAnimals, setUserAnimals] = useState([]);
    const [level, setLevel] = useState('Observer');
    const [badge, setBadge] = useState("badge");
    const [noBadges, setNoBadges] = useState(false);
    
    // handle display of any alerts
    const [alertShowing, setAlertShowing] = useState(true);
    const closeAlert = () => setAlertShowing(false);
    
    // handle opening and closing of modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

/** In this function:
 * - userBadges is an array of animal names as a property of the user object;
 * 
 * - We use each of these names to get the animal object from our usersAPI; this provides the path for the badge image;
 * 
 * - We add each animal object and name to userAnimals;
 * 
 * - Updates the user level based on current points;
 * 
 */
    useEffect(() => {
        async function getBadges() {
            if (currentUser) {       
                const userBadges = currentUser.user.userBadges;

                // for development, apply all badges;
                // delete these and uncomment above to restore accurate userBadges

                // const userBadges =[
                //     'Adelie Penguin', 
                //     'Agama Lizard',
                //     'Albatross',
                //     'Alligator',
                //     'Alpaca',
                //     'Arctic Fox',
                //     'Assassin Bug',
                //     'Axolotl',
                //     'Baboon',
                //     'Bald Eagle',
                //     'Banana Ball Python',
                //     'Barn Owl',
                //     'Bearded Vulture',
                //     'Beaver',
                //     'Bee',
                //     'Bengal Tiger',
                //     'Bison',
                //     'Black Rhinoceros',
                //     'Black-Footed Ferret',
                //     'Blue-Ringed Octopus',
                //     'Bobcat',
                //     'Box Turtle',
                //     'Burrowing Owl',
                //     'Camel',
                //     'Caribou',
                //     'Cheetah',
                //     'Clownfish',
                //     'Coral Snake',
                //     'Crocodile',
                //     'Deer',
                //     'Desert Tortoise',
                //     'Dingo',
                //     'Dolphin',
                //     'Dragonfly',
                //     'Earthworm',
                //     'Eel',
                //     'Elephant',
                //     'Elephant Seal',
                //     'Elk',
                //     'Emu',
                //     'Flamingo',
                //     'Flounder',
                //     'Fox',
                //     'Frog',
                //     'Fruit Bat',
                //     'Galapagos Tortoise',
                //     'Gazelle',
                //     'Gecko',
                //     'Giraffe',
                //     'Glass Frog',
                //     'Golden Lion Tamarin',
                //     'Gorilla',
                //     'Hammerhead Shark',
                //     'Hawaiian Goose',
                //     'Heron',
                //     'Hippopotamus',
                //     'Howler Monkey',
                //     'Hummingbird',
                //     'Humpback Whale',
                //     'Ibex',
                //     'Ibis',
                //     'Iguana',
                //     'Impala',
                //     'Jackrabbit',
                //     'Jackson’s Chameleon',
                //     'Jaguar',
                //     'Jellyfish',
                //     'Kangaroo',
                //     'Kestrel',
                //     'King Cobra',
                //     'Kingfisher',
                //     'Kiwi',
                //     'Koala',
                //     'Komodo Dragon',
                //     'Ladybug',
                //     'Leatherback Sea Turtle',
                //     'Lemur',
                //     'Leopard',
                //     'Lion',
                //     'Llama',
                //     'Lobster',
                //     'Macaque',
                //     'Macaroni Penguin',
                //     'Manatee',
                //     'Manta Ray',
                //     'Marmot',
                //     'Moose',
                //     'Narwhal',
                //     'North American Black Bear',
                //     'Northern Cardinal',
                //     'Nudibranch',
                //     'Numbat',
                //     'Octopus',
                //     'Orang-utan',
                //     'Ostrich',
                //     'Otter',
                //     'Oyster',
                //     'Painted Turtle',
                //     'Panther',
                //     'Parrotfish',
                //     'Platypus',
                //     'Polar Bear',
                //     'Porcupine',
                //     'Proboscis Monkey',
                //     'Quetzal',
                //     'Quokka',
                //     'Rabbit',
                //     'Red Panda',
                //     'Reef Shark',
                //     'Robin',
                //     'Roseate Spoonbill',
                //     'Salamander',
                //     'Scarlet Macaw',
                //     'Sea Anemone',
                //     'Sea Dragon',
                //     'Seahorse',
                //     'Skunk',
                //     'Sloth',
                //     'Squid',
                //     'Stork',
                //     'Tapir',
                //     'Tiger',
                //     'Tiger Shark',
                //     'Tree Frog',
                //     'Tropicbird',
                //     'Uakari',
                //     'Umbrellabird',
                //     'Vervet Monkey',
                //     'Vicuña',
                //     'Vulture',
                //     'Walrus',
                //     'Warthog',
                //     'Whale Shark',
                //     'White-Faced Capuchin',
                //     'Wolf',
                //     'X-Ray Tetra',
                //     'Xerus',
                //     'Yak',
                //     'Yellow Anaconda',
                //     'Yellowfin Tuna',
                //     'Zebra',
                //     'Zebra Finch',
                //     'Zebra Mussels',
                //     'Zebu',
                //                     ]
                console.log("USER BADGES:", userBadges)
                let animal;
                const animals = [];
                for (let animalName of userBadges) {  
                    console.log(animalName);              
                    animal = await usersAPI.getAnimal(animalName);
                    if (animal) {
                        animals.push({ animalName, ...animal });
                    }
                }
                console.log(animals);
                setUserAnimals(animals);

                for (let level in levels) { 
                    level = +level;
                    if (currentUser.user.points > level) {
                        setLevel(levels[level])
                    }
                }
                if (currentUser.user.userBadges.length > 1)
                    setBadge("badges");
                if (currentUser.user.userBadges.length === 0)
                    setNoBadges(true);
            }        
        }
        getBadges();
    }, [currentUser]);

console.log("USER ANIMALS:", userAnimals);

return (
    <Box sx={{ mt: 5 }}>
        { !currentUser ?   
        <div>
            <img src={zebra} alt="red panda" width="300"/>
            <h3>Sign up for a free account to earn badges and level up:</h3>
            <NavLink to="/signup" className="link"><Button >Join the Critter Club!</Button></NavLink>    
        </div> 
        :
        <Box>  
        {alertShowing &&
            alert.message.length ? 
            <Alert severity={alert.severity} onClose={() => {closeAlert()}}>{alert.message}</Alert> : null}
        <h1>Hello, {currentUser.user.username}!</h1>
        <p>You're a Critter Club {level}! Click below to see how many points you need to level up.</p>
        
        {noBadges ? <p>You don't have any badges yet. Let's get started!</p> 
        :
        <p>You've collected {currentUser.user.userBadges.length} {badge} so far and you have {currentUser.user.points} points!</p>} 
        <Button onClick={handleOpen}>Critter Club Levels</Button>
        <h3>Explore the Critter Club animal collection to earn more badges and level up:</h3>
        <Box sx={{ mb: 3 }}>
            <NavLink to="/animals/browse" className="link"><Button >Browse All Animals</Button></NavLink>
            <NavLink to="/animals/search" className="link"><Button >Search for an Animal</Button></NavLink>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
            <Paper sx={{ padding: '2rem '}}>
                <IconButton onClick={handleClose}>
                    <Close sx={{ color: theme.typography.primary }}/>
                </IconButton>
                <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ fontFamily: theme.typography.primary }}>
                Critter Club Levels
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '2rem', fontFamily: theme.typography.primary }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '2rem'}}>Level</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '2rem'}}>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Observer</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>0 - 99</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Explorer</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>100 - 499</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Adventurer</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>500 - 999</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Naturalist</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>1000 - 2499</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Ecologist</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>2500 - 4999</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Zoologist</TableCell>
                            <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>5000 +</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Typography>
            </Paper>

        </Box>
        </Modal>
        </Box>}
        {currentUser ? 
        <Box>
            {userAnimals.length ? <h4>Your Badges:</h4> : null}
            <Grid container spacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {userAnimals.map((a, i) => <Badge key={i} animalName={a.animalName} url={a.animal.photo}/>)}
            </Grid>
        </Box>: null}
    </Box>
    )
}