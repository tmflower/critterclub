import { useState, useEffect } from "react";
import usersAPI from "../api/usersAPI";
import { useParams } from "react-router-dom";

export function Code() {
    
    const params = useParams();
    const parentUsername = params.username;

    const [accessCode, setAccessCode] = useState(1111);

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