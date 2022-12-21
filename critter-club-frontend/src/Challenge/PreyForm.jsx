import { useState } from 'react';

export function PreyForm({ commonName, prey, message, points, setPoints, numQuestions, setNumQuestions  }) {

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
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else setFeedback(message.incorrect);
    }

    const handleReset = (e) => {
        setFormData('');
        let text = document.querySelector('#userGuess');
        text.value = '';
        setFeedback('');
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
                { !feedback ? 
                <button type="submit">Check answer</button>
                : null }
                { feedback === message.incorrect ?
                <button type="reset" onClick={handleReset}>Clear answer</button>
                : null }
            </div>
            <p>{feedback}</p>
            </fieldset>
        </form>
    )
}