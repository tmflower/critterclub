import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Alert, Paper, Box, Grid, Typography } from "@mui/material";
import { theme } from "../theme/theme";
import uakari from "../assets/uakari.jpeg";
import seadragon from "../assets/seadragon.png";
import lion from "../assets/lion.png";

export function Home({ justLoggedOut }) {
    const [alertShowing, setAlertShowing] = useState(true);
    const closeAlert = () => setAlertShowing(false);

    return (
        <Box sx={{ mt: 5 }}>
            {justLoggedOut && alertShowing ? 
            <Alert severity="success" onClose={() => {closeAlert()}}>See ya later, alligator!</Alert>
            :
            <Grid 
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                textAlign="center">
                <Grid item xs={12}>
                    <Typography variant="h2" fontFamily={theme.typography.primary} color={theme.palette.secondary.main}>Welcome to Critter Club!</Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper
                        elevation={8}
                        sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                        
                        <img src={uakari} className="img-home" alt="uakari"/>
                        <p>Ever heard of an uakari?</p>
                    </Paper>                
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper
                        elevation={8}
                        sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                                                
                        <p>Is a sea dragon a real thing?</p>
                        <img src={seadragon} className="img-home" alt="seadragon"/>
                    </Paper>                   
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper
                        elevation={8}
                        sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src={lion} className="img-home" alt="lion"/>
                        <p>Do wild lions only live in Africa?</p>                        
                    </Paper>                     
                </Grid>

                    <Typography variant="h4" fontFamily={theme.typography.primary} sx={{ m: 1 }}>Find out the answers to these questions and SO many more when you join Critter Club!</Typography>

                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper
                            elevation={8}
                            sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h3">🧐  🧠  💭</Typography>
                            <Typography variant="h5" fontFamily={theme.typography.primary} sx={{ m: 1 }}>Learn and test your knowledge about all kinds of animals!</Typography>                      
                        </Paper>                     
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper
                            elevation={8}
                            sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h3">🦊  🐼  🐷</Typography>
                            <Typography variant="h5" fontFamily={theme.typography.primary} sx={{ m: 1 }}>Earn points and collect fun animal badges!</Typography>                     
                        </Paper>                     
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper
                            elevation={8}
                            sx={{ padding: 8, borderRadius: '50%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h3">🔬  🏆  🥼</Typography>
                            <Typography variant="h5" fontFamily={theme.typography.primary} sx={{ m: 1 }}>Level up from Observer to Zoologist!</Typography>                    
                        </Paper>                     
                    </Grid>
                   
                    <Grid item xs={12}>
                        <NavLink to="/signup" className="link"><Button variant="contained">Sign me up!</Button></NavLink>
                    </Grid>
                        
                    <Grid item xs={12}>
                        <NavLink to="/login" className="link"><Button variant="contained">I already signed up</Button></NavLink>
                    </Grid>                   
                </Grid>}
        </Box>
    )
}