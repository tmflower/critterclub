import { NavLink } from "react-router-dom";
import { Button, Alert } from "@mui/material";

export function Home({ justLoggedOut }) {
    
    return (
        <>
        {justLoggedOut ? 
        <Alert severity="success">See ya later, alligator!</Alert>
        :
        <div>
                <h1>Welcome to Critter Club!</h1>
                <p>Ever heard of an uakari?</p>
                <p>Is a sea dragon a real thing?</p>
                <p>Do wild lions only live in Africa?</p>
                <p>Find out these answers to these questions and so many more when you join Critter Club!</p>
                <p>Learn and test your knowledge about all kinds of animals!</p>
                <p>Earn points and collect fun animal badges!</p>
                <p>Level up from Observer to Zoologist!</p>
                <NavLink to="/signup" className="link"><Button variant="contained">Sign me up!</Button></NavLink>
                <NavLink to="/login" className="link"><Button variant="contained">I already signed up</Button></NavLink>
        </div>} 
        </>
    )
}