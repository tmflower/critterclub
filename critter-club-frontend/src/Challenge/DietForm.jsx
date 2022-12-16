import { useState } from 'react';

export function DietForm({commonName, diet, message, passed, setPassed}) {

    const [formData, setFormData] = useState('');
    const [feedback, setFeedback] = useState('');
    const { animalDiet } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct; provide corresponding feedback message
        e.preventDefault();
        if (animalDiet === diet) {
            setFeedback(message.correct);
            setPassed(true);
        }
        else setFeedback(message.incorrect);
    }

    const handleReset = (e) => {
        setFormData('');
        setFeedback('');
        setPassed(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>Which term best describe's the {commonName.toLowerCase()}'s diet?</legend>
            <label htmlFor='Carnivore'>
            <input 
                type="radio"
                name="animalDiet"
                value="Carnivore"
                onChange={handleChange}
                >
            </input>
            Carnivore
            </label>
            <label htmlFor='Herbivore'>
            <input 
                type="radio"
                name="animalDiet"
                value="Herbivore"
                onChange={handleChange}
                >
            </input>
            Herbivore
            </label>
            <label htmlFor="Omnivore">
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
            <p>{feedback}</p>
            </fieldset>
        </form>
    )

}