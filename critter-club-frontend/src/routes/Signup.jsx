import { useState } from 'react';
import { NavLink } from 'react-router-dom';
 
/** Signup renders a form with inputs for username, password, and access code from parent
 * Enables a user to sign up for a new account  */

export function Signup({ signup }) {

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
        setFormData(initial_state);
    }

    return (
        <div>
            <h1>Join the Critter Club!</h1>
            <p>You'll need the access code from your parent's account to sign up.</p>
            <p>Don't have an access code yet? Grab your nearest parent and ask them to hop on over to the <NavLink to="/parent">Parent Page</NavLink>.</p>
            <form>
                <label htmlFor="username">Username<small> (don't use your real name!)</small>:
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    id="username" 
                    onChange={handleChange}>
                </input></label>
                <label htmlFor="password">Password:
                <input 
                    type={passwordShowing ? "text" : "password"} 
                    name="password" 
                    value={password} 
                    id="password" 
                    onChange={handleChange}>
                    </input>
                    <div>
                        {!passwordShowing ?
                        <span className="material-symbols-outlined" onClick={toggle}>visibility</span>
                        :
                        <span className="material-symbols-outlined" onClick={toggle}>visibility_off</span>}
                    </div>
                    </label>
                <label htmlFor="accessCode">Access code:
                <input 
                    type="text" 
                    name="accessCode" 
                    value={accessCode} 
                    id="accessCode" 
                    onChange={handleChange}>
                    </input></label>
                <button className="signup-button" onClick={handleSubmit}>Submit</button>               
            </form>
        </div>
    )
}