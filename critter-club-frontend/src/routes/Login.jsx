import { useState } from 'react';
import { Paper, FormControl, TextField, Button, Stack, Box, Alert } from '@mui/material';

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
    
    // when user submits form, call login function passed from App.js
    async function handleSubmit(evt) {
        evt.preventDefault();
        const user = { username, password }; 
        await login(user);     
        setFormData(initial_state);
    }

    // variable and function to control display of alerts
    const [alertShowing, setAlertShowing] = useState(true);
    const closeAlert = () => setAlertShowing(false);

    return (        
        <Paper 
            elevation={8}
            sx={{ padding: 3 }}>
            {alertShowing &&
            alert.message.length ? 
            <Alert severity={alert.severity} onClose={() => {closeAlert()}}>{alert.message}</Alert> : null}
            <h1>Login to collect your next badge and level up!</h1>
            <form>
                <FormControl sx={{ width: '25ch', m: 2 }}>
                <Stack spacing={2}>
                {/* <label htmlFor="username">Username: */}
                <TextField 
                    type="text" 
                    name="username" 
                    value={username} 
                    id="username" 
                    label="Username"
                    onChange={handleChange}>
                </TextField>
                {/* </label> */}
                {/* <label htmlFor="password">Password: */}
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
                    {/* </label> */}
                </Box>                
                <Button id="login-button" onClick={handleSubmit}>Submit</Button> 
                </Stack>
                </FormControl>                             
            </form>
        </Paper>
    )
}