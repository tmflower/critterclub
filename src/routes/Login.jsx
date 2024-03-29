import { useState } from 'react';
import { Paper, FormControl, TextField, Button, Stack, Box, Alert } from '@mui/material';
import { NavLink } from 'react-router-dom';

/** Login renders a form with inputs for username and password
 * Enables returning user to access their account */

export function Login({ login, alert }) {
     
    // set initial form fields to blank
    const initial_state = {
        username: '',
        password: '',
    }
    
    // control masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }
    // variable and function to control display of alerts
    const [alertShowing, setAlertShowing] = useState(true);
    const closeAlert = () => setAlertShowing(false);

    // when user submits form, call login function passed from App.js
    async function handleSubmit(evt) {
        evt.preventDefault();
        const user = { username, password }; 
        await login(user);  
        setAlertShowing(true);
        setFormData(initial_state);
    }

    return (        
        <Paper 
            elevation={8}
            sx={{ padding: 3 }}>
            {alertShowing &&
            alert.message.length ? 
                <Alert 
                    variant="filled" 
                    severity={alert.severity} 
                    onClose={() => {closeAlert()}}>{alert.message}
                </Alert> 
            : null}
            <h1>Login to collect your next badge and level up!</h1>
            <form>
                <FormControl sx={{ width: '25ch', m: 2 }}>
                <Stack spacing={2}>
                <TextField 
                    name="username" 
                    value={username} 
                    id="username" 
                    label="Username"
                    onChange={handleChange}
                />
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
                        <span 
                            className="material-symbols-outlined" 
                            onClick={toggle}>visibility
                        </span>
                        :
                        <span 
                            className="material-symbols-outlined" 
                            onClick={toggle}>visibility_off
                        </span>}
                </Box>                
                <Button 
                    id="login-button" 
                    onClick={handleSubmit}>Submit
                </Button> 
                </Stack>
                </FormControl>                             
            </form>
            <NavLink to="/signup">Need to sign up for an account?</NavLink>
            <p>Just want a quick demo without signing up? Use our demo account:</p>
            <ul>
                <li>username: SadieCat</li>
                <li>password: meow!345</li>
            </ul>
        </Paper>
    )
}