import { useState } from 'react';

export function ScientificNameForm({commonName, scientificName}) {

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
        if (userGuess === scientificName) {
            console.log("Correct on scientific name!")
        }
        else console.log("sorry, try again");
    }

    const handleReset = (e) => {
        setFormData('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>What is the {commonName.toLowerCase()}'s scientific name?</legend>
            <label>Scientific name
            
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