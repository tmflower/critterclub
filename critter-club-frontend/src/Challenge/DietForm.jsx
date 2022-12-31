import { useState } from 'react';


/** DietForm renders a question with radio button answers */

export function DietForm({commonName, diet, message, points, setPoints, numQuestions, setNumQuestions }) {

    // Display form with no default answers and no initial message
    const initialState = {animalDiet: ''};
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');

    // Deconstruct formData properties
    const { animalDiet } = formData;

    // Set formData to user's input
    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    // compare user's selection to animal data to check if correct; provide corresponding feedback message
    // update user's points
    // increment numQuestions; when numQuestions is >=3, user can submit answers and earn badge
    const handleSubmit = (e) => {
        e.preventDefault(); console.log(formData)
        if (animalDiet === diet) {
            setFeedback(message.correct);
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else setFeedback(message.incorrect);
    }

    // clear form responses & message when user clicks "Try again" button
    const handleReset = (e) => {
        setFormData(initialState);
        setFeedback('');
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
                id="Carnivore"
                onChange={handleChange}
                checked={animalDiet === "Carnivore"}
                >
            </input>
            Carnivore
            </label>
            <label htmlFor='Herbivore'>
            <input 
                type="radio"
                name="animalDiet"
                value="Herbivore"
                id="Herbivore"
                onChange={handleChange}
                checked={animalDiet === "Herbivore"}
                >
            </input>
            Herbivore
            </label>
            <label htmlFor="Omnivore">
            <input 
                type="radio"
                name="animalDiet"
                value="Omnivore"
                id="Omnivore"
                onChange={handleChange}
                checked={animalDiet === "Omnivore"}
                >
            </input>
            Omnivore
            </label>
            <div>
                { !feedback ? 
                <button type="submit">Check answer</button>
                : null }
                { feedback === message.incorrect ?
                <button type="reset" onClick={handleReset}>Try again</button>
                : null }
            </div>
            <p>{feedback}</p>
            </fieldset>
        </form>
    )

}