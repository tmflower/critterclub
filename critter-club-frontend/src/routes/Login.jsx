import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ login }) {
       
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

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const user = { username, password }; 
            await login(user);     
            setFormData(initial_state);
            alert(`Welcome back, ${ username }!`);
            navigate("/dashboard", { replace: true });
        }
        catch(err) {
            alert(err);
        }
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