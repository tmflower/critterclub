import { useState } from "react";
import { NavLink } from "react-router-dom";
import usersAPI from "../api/usersAPI";

// displays a form that allows parent to register and get access code
// child will need parent access code to set up a user account

const ParentSignup = () => {

    const initial_state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    }
    
    // controls masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password, firstName, lastName, email } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    const [formWasSubmitted, setFormWasSubmitted] = useState(false);
    const [parentUsername, setParentUsername] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const parent = { username, password, firstName, lastName, email }    
        usersAPI.registerParent(parent);
        setParentUsername(username);
        setFormWasSubmitted(true);
        setFormData(initial_state);
    }

    return (
        <div className="signup-page">
            {!formWasSubmitted ?
            <div>
                <h2>Register for a parent account</h2>
                <form className="signup-form">
                    <label htmlFor="username">Username:
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
                    <label htmlFor="firstName">First name:
                    <input 
                        type="text" 
                        name="firstName" 
                        value={firstName} 
                        id="firstName" 
                        onChange={handleChange}>
                        </input></label>
                    <label htmlFor="lastName">Last name:
                    <input 
                        type="text" 
                        name="lastName" 
                        value={lastName} 
                        id="lastName" 
                        onChange={handleChange}>
                        </input></label>
                    <label htmlFor="email">Email:
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        id="email" 
                        onChange={handleChange}>
                        </input></label> 
                    <button className="signup-button" onClick={handleSubmit}>Submit</button>               
                </form>
            </div>
            :
            <div>
                <p>You have registered!</p>
                <NavLink exact="true" to={`/parent/${parentUsername}`} end>Click to reveal your access code</NavLink>
            </div>
            }
        </div>        
    )
}

export default ParentSignup;