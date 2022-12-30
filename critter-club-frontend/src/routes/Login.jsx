import { useState } from 'react';

/** Login renders a form with inputs for username and password
 * Enables returning user to access their account */

export function Login({ login }) {
     
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

    return (        
        <div>
            <h1>Login to collect your next badge and level up!</h1>
            <form>
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
                <button className="signup-button" onClick={handleSubmit}>Submit</button>               
            </form>
        </div>
    )
}