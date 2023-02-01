import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Paper, FormControl, TextField, Button, Stack, Box, Alert } from '@mui/material';
 
/** Signup renders a form with Inputs for username, password, and access code from parent
 * Enables a user to sign up for a new account  */

export function Signup({ signup, alert }) {

    // set initial form fields to blank
    const initial_state = {
        username: '',
        password: '',
        accessCode: ''
    }

    // control masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password, accessCode } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    // when user submits form, call signup function passed from App.js
    async function handleSubmit (evt) {
        evt.preventDefault();
        const newUser = { username, password, accessCode };        
        await signup(newUser);
        localStorage.setItem("username", username);
        setFormData(initial_state);       
    }

    return (
        <Paper
        elevation={8}
        sx={{ padding: 3 }}>            
            {alert.message.length ? 
            <Alert 
                variant="filled" 
                severity={alert.severity}>{alert.message}
            </Alert> 
            : null}            
            <h1>Join the Critter Club!</h1>
            <p>You'll need the access code from your parent's account to sign up.</p>
            <p>Don't have an access code yet? Grab your nearest parent and ask them to hop on over to the <NavLink to="/parent">Parent Page</NavLink>.
            </p>
            <form>                
                <FormControl sx={{ width: '25ch', m: 2 }}>
                <Stack spacing={2}>
                    <TextField 
                        type="text" 
                        name="username" 
                        value={username} 
                        id="username" 
                        label="Username"
                        onChange={handleChange}>
                    </TextField>

                    <Box>
                        <TextField 
                            type={passwordShowing ? "text" : "password"} 
                            name="password" 
                            value={password} 
                            id="password" 
                            label="Password"
                            onChange={handleChange}>
                        </TextField>
                            {!passwordShowing ?
                            <span className="material-symbols-outlined" onClick={toggle}>visibility</span>
                            :
                            <span className="material-symbols-outlined" onClick={toggle}>visibility_off</span>}
                    </Box>

                    <TextField                
                        type="text" 
                        name="accessCode" 
                        value={accessCode} 
                        id="accessCode"
                        label="Access code" 
                        onChange={handleChange}>
                    </TextField>

                    <Button 
                        id="signup-button" 
                        onClick={handleSubmit}>Submit
                    </Button> 
                </Stack> 
                </FormControl>                           
            </form>
            <p>Just want a quick demo without signing up? Go to <NavLink to="/login">Login</NavLink> and use our demo account.</p>           
        </Paper>
    )
}