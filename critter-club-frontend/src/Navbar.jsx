import { React, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./userContext";
import { 
    AppBar,
    Box,
    IconButton, 
    Typography,
    Toolbar,
    Button,
    Container,
    Hidden,
    Dialog
 } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { theme } from './theme/theme';


export function Navbar({ logout }) {
    
    const currentUser = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const onOpenHandler = () => setOpen(true);
    const onCloseHandler = () => setOpen(false);

    console.log(currentUser)

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            {/* <Container > */}
            <Toolbar>
                <Hidden smUp>
                    <IconButton
                        size="large"
                        edge="start"                        
                        aria-label="menu"
                        sx={{ mr: 2, color: theme.typography.secondary }}
                        onClick={onOpenHandler}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Dialog open={open}
                            fullScreen
                            fullWidth>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h5" sx={{ flexGrow: 1, fontFamily: theme.typography.secondary }}>
                                    Menu
                                </Typography>
                                <IconButton onClick={onCloseHandler}>
                                    <Close sx={{ color: theme.typography.secondary }}/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        {currentUser ? 
                        <>
                            <NavLink onClick={onCloseHandler} className="navbar-link-mobile" exact="true" to="/dashboard" end>Dashboard</NavLink>
                            <NavLink onClick={onCloseHandler} className="navbar-link-mobile" exact="true" to="/animals/browse" end>Browse</NavLink>
                            <NavLink onClick={onCloseHandler}className="navbar-link-mobile"exact="true" to="/animals/search">Search</NavLink>
                            <Button variant="contained" sx={{ fontFamily: theme.typography.secondary }} onClick={logout}>Logout</Button>
                        </>
                        :
                        <>
                            <NavLink onClick={onCloseHandler} className="navbar-link-mobile" exact="true" to="/" end>Home</NavLink>
                            <NavLink onClick={onCloseHandler} className="navbar-link-mobile" exact="true" to="/signup" end>Signup</NavLink>
                            <NavLink onClick={onCloseHandler} className="navbar-link-mobile" exact="true" to="/parent" end>Parent Page</NavLink>
                            <NavLink onClick={onCloseHandler} className="navbar-link" exact="true" to="/login" end><Button variant="contained" sx={{ fontFamily: theme.typography.secondary, textAlign: 'center' }}>Login</Button></NavLink>
                        </>}
                    </Dialog>
                </Hidden>

              <Hidden smDown>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        flexGrow: 1, 
                        fontFamily: theme.typography.secondary, 
                        color: theme.typography.secondary
                        }}>
                    {currentUser ? 
                    <>
                        <NavLink className="navbar-link" exact="true" to="/dashboard" end>Dashboard</NavLink>
                        <NavLink className="navbar-link" exact="true" to="/animals/browse" end>Browse</NavLink>
                        <NavLink className="navbar-link" exact="true" to="/animals/search" end>Search</NavLink>
                        
                    </>
                    :
                    <>
                        <NavLink className="navbar-link" exact="true" to="/" end>Home</NavLink>                           
                        <NavLink className="navbar-link" exact="true" to="/signup" end>Signup</NavLink>
                        <NavLink className="navbar-link" exact="true" to="/parent" end>Parent Page</NavLink>
                    </>}                   
                </Typography>
                {currentUser ? 
                    <Button variant="contained" sx={{ fontFamily: theme.typography.secondary }} onClick={logout}>Logout</Button>
                    :
                    <NavLink className="navbar-link" exact="true" to="/login" end><Button variant="contained" sx={{ fontFamily: theme.typography.secondary, textAlign: 'center' }}>Login</Button></NavLink>
                }
                    
              </Hidden>             
            </Toolbar>
            {/* </Container> */}
          </AppBar>
        </Box>
      );
}

    // return (
    //     <AppBar>
    //         <nav>
    //             {currentUser ?
    //             <div>
    //                 <NavLink className="navbar-link" exact="true" to="/dashboard" end>Dashboard</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/animals/browse" end>Browse</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/animals/search" end>Search</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/" onClick={logout} end>Logout</NavLink>
    //             </div>         
    //             :
    //             <div>
    //                 <NavLink className="navbar-link" exact="true" to="/" end>Home</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/login" end>Login</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/signup" end>Signup</NavLink>
    //                 <NavLink className="navbar-link" exact="true" to="/parent" end>Parent Page</NavLink>
    //             </div>
    //             }
    //         </nav>
    //     </AppBar>
    // )