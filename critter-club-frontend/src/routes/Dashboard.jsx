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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { theme } from "../theme/theme";
import observer from "../assets/images/level-icons/observer.gif";
import explorer from "../assets/images/level-icons/explorer.gif";
import adventurer from "../assets/images/level-icons/adventurer.png";
import naturalist from "../assets/images/level-icons/naturalist.gif";
import ecologist from "../assets/images/level-icons/ecologist.png";
import zoologist from "../assets/images/level-icons/zoologist.jpg";


const levels = [
    {points: 0, title: 'Observer', url: observer},
    {points: 100, title: 'Explorer', url: explorer},
    {points: 500, title: 'Adventurer', url: adventurer},
    {points: 1000, title: 'Naturalist', url: naturalist},
    {points: 2500, title: 'Ecologist', url: ecologist},
    {points: 5000, title: 'Zoologist', url: zoologist}
]

/** Dashboard provides personalized user information including badges earned, current points, and level achieved */

export function Dashboard({ alert, getRandomAnimal }) {
    
    const currentUser = useContext(UserContext);
    const [userAnimals, setUserAnimals] = useState([]);
    const [level, setLevel] = useState('Observer');
    const [levelIcon, setLevelIcon] = useState(null);
    const [nextLevel, setNextLevel]= useState({});
    const [badge, setBadge] = useState("badge");
    const [noBadges, setNoBadges] = useState(false); 
    const [pointsNeeded, setPointsNeeded] = useState(null); 
    const [numPoints, setNumPoints] = useState(null);
    const [numBadges, setNumBadges] = useState(null);
    const [didReset, setDidReset] = useState(false);
       
    // handle display of any alerts
    const [alertShowing, setAlertShowing] = useState(true);
    const closeAlert = () => setAlertShowing(false);
    
    // handle opening and closing of modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // handle opening and closing of confirmation dialog
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

/** In this function:
 * - userBadges is an array of animal names as a property of the user object;
 * 
 * - We use each of these names to get the animal object from our usersAPI; this provides the path for the badge image;
 * 
 * - We add each animal object and name to userAnimals;
 * 
 * - We update the user level in UI based on current points;
 * 
 */
    useEffect(() => {
        async function makeBadges() {
            if (currentUser) { console.log(currentUser)
                const updatedUser = await usersAPI.getUser(currentUser.user.username);
                
                console.log(updatedUser);
                    
                // const userBadges = currentUser.user.userBadges;
                const userBadges = updatedUser.user.userBadges;
                
                console.log("USER BADGES:", userBadges);

                setNumBadges(updatedUser.user.userBadges.length);
                setNumPoints(updatedUser.user.points);
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

                for (let level of levels) {
                    if (updatedUser.user.points >= level.points) { 
                        setLevel(level.title);
                        setLevelIcon(level.url);
                        const nextIdx = levels.indexOf(level) + 1;
                        if (nextIdx <= levels.length -1){
                            setNextLevel(levels[nextIdx]);
                        }
                        else {
                            setNextLevel(levels[levels.length -1])
                        }
                    }                    
                }
                if (updatedUser.user.userBadges.length > 1)
                    setBadge("badges");
                if (updatedUser.user.userBadges.length === 0)
                    setNoBadges(true);
            }        
        }
        makeBadges();
    }, [currentUser, didReset]);

    // Let user know how many points needed to reach next level when user opens modal
    useEffect(() => {
        async function calculatePointsNeeded() {
            if (currentUser && nextLevel) {
                setPointsNeeded(nextLevel.points - numPoints);
            }
        }
        calculatePointsNeeded();
    }, [currentUser, nextLevel, numPoints]);
    
    // Allow user to reset their account by deleting all badges and points;
    async function reset() {      
        await usersAPI.deleteBadges(currentUser.user.id);
        await usersAPI.resetPoints({ username: currentUser.user.username });
        setDidReset(true);
        handleCloseDialog();
    }

return (
    <Box sx={{ mt: 5 }}>
        { !currentUser ?   
            <Paper
                elevation={8} sx={{ padding: 20 }}>
                <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 1 }}>Sign up for a free account to earn badges and level up:</Typography>
                <NavLink to="/signup" className='navbar-link'><Button>Join the Critter Club!</Button></NavLink>    
            </Paper>
        :
        <Box>  
        {alertShowing &&
            alert.message.length ? 
            <Alert variant="filled" severity={alert.severity} onClose={() => {closeAlert()}}>{alert.message}</Alert> 
            : null}
        <Grid 
            container
            direction="column"
            alignItems="center"
            textAlign="center"
            >
            <Typography variant="h2" sx={{ fontFamily: theme.typography.primary, m: 3 }}>Hello, {currentUser.user.username}!</Typography>  
            <img src={levelIcon} alt="kid clipart" width="300px"/>
            <Typography variant="h4" sx={{ fontFamily: theme.typography.primary, m: 3 }}>You're a Critter Club <em className="blue-text">{level}</em> !</Typography>                  
        </Grid>

        <Grid 
            container 
            direction="row"            
            alignItems="top"
            marginTop="2rem"           
            >            
            <Grid item xs={12} md={6} sx={{ px: 4 }}>                
                <Paper elevation={8} sx={{ p: 4, mt: 3, mb: 8 }}>
            
                    {noBadges ? <Typography variant="h5" sx={{ fontFamily: theme.typography.primary }}>You don't have any badges yet. Let's get started!</Typography> 
                    :
                    <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 3 }}>You've collected {numBadges} {badge} so far and you have {numPoints} points!</Typography>} 
                    <Button id="alt-button" onClick={handleOpen}>Level Up</Button>
                </Paper>                

                <Paper elevation={8} sx={{ p: 4, mb: 8 }}>
                    <Typography variant="h5" sx={{ fontFamily: theme.typography.primary, m: 3 }}>Explore the Critter Club animal collection to earn more badges and level up:</Typography>

                    <Box sx={{ mb: 3 }}>
                        <NavLink to="/animals/browse" className="link"><Button className="options-btn">Browse All Animals</Button></NavLink>
                        <NavLink to="/animals/search" className="link"><Button className="options-btn">Search for an Animal</Button></NavLink>
                        <Button className="options-btn" onClick={getRandomAnimal}>Get a random animal</Button>
                    </Box>
                </Paper>

                <Paper elevation={8} sx={{ p: 4, mb: 4, backgroundColor: '#1e91d6ff',  }}>
                    <Typography variant="h5" sx={{ fontFamily: theme.typography.secondary, textAlign: 'center', m: 1 }}>Scroll down to see all your badges!</Typography>
                    <Typography variant="h3" sx={{ fontFamily: theme.typography.secondary, textAlign: 'center' }}> ☟  ☟  ☟</Typography>
                </Paper>                
            </Grid> 

            <Grid item xs={12} md={6}>
                <Paper elevation={8} sx={{ p: 4, mt: 3 }}>
                <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '2rem'}}></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '2rem'}}>Level</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '2rem'}}>Points</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem' }}><img src={observer} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Observer
                                </TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>0 - 99</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}><img src={explorer} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Explorer</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>100 - 499</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}><img src={adventurer} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Adventurer</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>500 - 999</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}><img src={naturalist} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Naturalist</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>1000 - 2499</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}><img src={ecologist} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Ecologist</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>2500 - 4999</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}><img src={zoologist} alt="kid clipart" width="80px"/></TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>Zoologist</TableCell>
                                <TableCell sx={{ fontFamily: theme.typography.primary, fontSize: '1.2rem'}}>5000 +</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </Paper>
            </Grid>   
        
        </Grid>

        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
                <Paper sx={{ padding: '2rem '}}>
                    <IconButton onClick={handleClose} autoFocus>
                        <Close sx={{ color: theme.typography.primary }}/>
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ fontFamily: theme.typography.primary }}>
                    Level Up!
                    </Typography>
                    <img src={nextLevel.url} alt="kid clipart" width="80px"/>
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '2rem', fontFamily: theme.typography.primary }}>
                        You need <span className="blue-text">{ pointsNeeded }</span> more points to level up to <span className="blue-text">{ nextLevel.title }</span>. Start earning points now! 
                    </Typography>
                    <NavLink to="/animals/browse" className="link"><Button >Browse</Button></NavLink>
                    <NavLink to="/animals/search" className="link"><Button >Search</Button></NavLink>
                    <Button onClick={getRandomAnimal}>Random</Button>
                </Paper>
            </Box>
        </Modal>
        </Box>}

        {currentUser ? 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5}}>
            {userAnimals.length ? <Typography variant="h3" sx={{ fontFamily: theme.typography.primary, mb: 5 }}>Your Badges:</Typography> : null}
            <Grid 
                container 
                justifyContent="center"
                spacing={{ xs: 2, md: 3 }} 
                columnSpacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12 }}>
                {userAnimals.map((a, i) => <Badge key={i} animalName={a.animalName} url={a.animal.photo}/>)}
            </Grid>
            <Button id="reset-btn" onClick={handleOpenDialog}>Start Over</Button>
        </Box>: null}
        

        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ fontFamily: theme.typography.primary.main}}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: theme.typography.primary, fontSize: '2rem' }}>
          {"WAIT!!! Are you sure?"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" sx={{ fontFamily: theme.typography.primary, fontSize: '1.5rem' }}>
          Do you really want to start over? This will remove all of your badges and points!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{  }}>
          <Button onClick={reset}>Yes, I want to start over with no badges and 0 points.</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Nope! Save my points and badges!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    )
}