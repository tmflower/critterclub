import { useState, useRef } from 'react';

/** ScientificNameForm renders a question with a text input */

export function ScientificNameForm({ commonName, scientificName, message, points, setPoints, numQuestions, setNumQuestions  }) {
    
    // Display form with no default answers and no initial message
    const initialState = {userGuess: ''}
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');
    const ref = useRef();

    // Deconstruct formData properties
    const { userGuess } = formData;
    

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

    // clear form responses & message when user clicks "Try again" button
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