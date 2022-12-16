import { useState } from 'react';

export function PreyForm({commonName, prey, message}) {

    const [formData, setFormData] = useState('');
    const [feedback, setFeedback] = useState('');
    const { userGuess } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct; provide corresponding feedback message
        e.preventDefault();
        const newPrey = prey.replace(/[,.]/gi, "").toLowerCase().split(' ');
        console.log(newPrey, userGuess)
        if (newPrey.includes(userGuess.toLowerCase())) {
            setFeedback(message.correct);
        }
        else setFeedback(message.incorrect);
    }

    const handleReset = (e) => {
        setFormData('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>What is one of the {commonName.toLowerCase()}'s prey animals?</legend>
            <label htmlFor='Prey'>Prey
            
            <input 
                type="text"
                name="userGuess"
                onChange={handleChange}
                >
            </input>
            </label>
            <div>
                <button type="submit">Check answer</button>
                <button type="reset" onClick={handleReset}>Clear answer</button>
            </div>
            <p>{feedback}</p>
            </fieldset>
        </form>
    )
}