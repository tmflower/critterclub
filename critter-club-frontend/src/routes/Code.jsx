import { useState, useEffect } from "react";
import usersAPI from "../api/usersAPI";
import { useParams } from "react-router-dom";

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
        <div>
            {accessCode ? <p>Your access code is: {accessCode}</p> : null}
            <p>Your child will need to enter this code in order to set up a user account.</p>
        </div>
    )
}