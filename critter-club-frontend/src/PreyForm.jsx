import { useState } from 'react';

export function PreyForm({commonName, prey}) {

    const [formData, setFormData] = useState('');
    const { userGuess } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct
        // TODO: add functionality for user feedback
        e.preventDefault();
        const newPrey = prey.replace(/[,]/gi, "").toLowerCase().split(' ')
        if (newPrey.includes(userGuess.toLowerCase())) {
            console.log("Correct on prey!")
        }
        else console.log("Sorry, try again!")
    }

    const handleReset = (e) => {
        setFormData('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>What is one of the {commonName.toLowerCase()}'s prey animals?</legend>
            <label>Prey
            
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
            </fieldset>
        </form>
    )
}