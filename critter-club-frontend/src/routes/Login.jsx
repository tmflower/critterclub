import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersAPI from '../api/usersAPI';

export function Login() {
    const navigate = useNavigate();

    const initial_state = {
        username: '',
        password: '',
    }
    
    // controls masking and unmasking of password field
    const [passwordShowing, setPasswordShowing] = useState(false);
    const toggle = () => {setPasswordShowing(!passwordShowing)}

    const [formData, setFormData] = useState(initial_state);

    const { username, password } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const user = { username, password }    
        
        usersAPI.authenticateUser(user);
        setFormData(initial_state);
        alert(`Welcome back, ${ user.username }!`)
        navigate("/animals", { replace: true });
    }

    return (
        <div>
            <h1>Login to collect your next badge!</h1>
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