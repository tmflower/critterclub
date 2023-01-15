import { useState, useEffect } from "react";
import usersAPI from "../api/usersAPI";
import { useParams, NavLink } from "react-router-dom";
import { Button, Typography, Paper } from "@mui/material";

/** Code renders the 4-digit number generated when parent registered for account
 * The child will need to enter the access code when setting up their account
 * 
 * Ideally, this code will be emailed to parent upon successful registration
 * For now, we'll reveal the code directly from within the app
 */

export function Code() {
    
    // Retrieve parent username in order to get their code
    const params = useParams();
    const parentUsername = params.username;

    const [accessCode, setAccessCode] = useState(null);

    // Use parent username to retrieve code from parents relation in db
    useEffect(() => {
        async function getCode() {    
            setAccessCode(await usersAPI.getCode(parentUsername));
        }

        getCode();
    },[parentUsername]);

    return (
        <Paper elevation={8} sx={{ p: 4 }}>
            {accessCode ? <Typography>Your access code is: {accessCode}</Typography> : null}
            <Typography>Your child will need to enter this code in order to set up a user account.</Typography>
            <NavLink className="link" exact="true" to="/signup" end><Button>Child signup</Button></NavLink>
        </Paper>
    )
}