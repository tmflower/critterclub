import { useState } from 'react';

export function DietForm({commonName, diet}) {

    const [formData, setFormData] = useState('');
    const { animalDiet } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct
        // TODO: add functionality for user feedback
        e.preventDefault();
        if (animalDiet === diet) {
            console.log("Correct on diet!")
        }
        else console.log("sorry, try again");
    }

    const handleReset = (e) => {
        setFormData('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>Which term best describe's the {commonName.toLowerCase()}'s diet?</legend>
            <label>
            <input 
                type="radio"
                name="animalDiet"
                value="Carnivore"
                onChange={handleChange}
                >
            </input>
            Carnivore
            </label>
            <label>
            <input 
                type="radio"
                name="animalDiet"
                value="Herbivore"
                onChange={handleChange}
                >
            </input>
            Herbivore
            </label>
            <label>
            <input 
                type="radio"
                name="animalDiet"
                value="Omnivore"
                onChange={handleChange}
                >
            </input>
            Omnivore
            </label>
            <div>
                <button type="submit">Check answer</button>
                <button type="reset" onClick={handleReset}>Clear answer</button>
            </div>
            </fieldset>
        </form>
    )

}