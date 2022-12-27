import { useState, useRef } from 'react';

export function ScientificNameForm({ commonName, scientificName, message, points, setPoints, numQuestions, setNumQuestions  }) {
    
    const initialState = {userGuess: ''}
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');
    const { userGuess } = formData;
    const ref = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct; provide corresponding feedback message
        e.preventDefault();
        if (userGuess.toLowerCase() === scientificName.toLowerCase()) {
            setFeedback(message.correct);
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else {
            setFeedback(message.incorrect);
        }
    }

    const handleReset = (e) => {
        ref.current.value = "";
        setFeedback('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
            <legend>What is the {commonName.toLowerCase()}'s scientific name?</legend>
            <label htmlFor='Scientific name'>Scientific name            
            <input 
                id="userGuess"
                type="text" 
                defaultValue="" 
                ref={ref} 
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
                <button type="reset" onClick={handleReset}>Try again</button>
                : null }
            </div>
            <p>{feedback}</p>
            </fieldset>
        </form>
    )
}