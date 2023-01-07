import { useState, useRef } from 'react';
import { Paper, FormLabel, Typography, Button } from '@mui/material';
import { theme } from '../theme/theme';

/** PreyForm renders a question with a text input */

export function PreyForm({ commonName, prey, message, points, setPoints, numQuestions, setNumQuestions  }) {

    // Display form with no default answers and no initial message
    const ref = useRef();
    const initialState = {userGuess: ''}
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');

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
        const modifiedPrey = prey.replace(/[,.]/gi, "").toLowerCase().split(' ');
        console.log(modifiedPrey, userGuess)
        if (modifiedPrey.includes(userGuess.toLowerCase())) {
            setFeedback(message.correct);
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else setFeedback(message.incorrect);
    }
    
    // clear form responses & message when user clicks "Try again" button
    const handleReset = (e) => {
        console.log(ref);
        ref.current.value = '';
        setFormData(initialState)
        setFeedback('');
    }

    return (
        <Paper
        elevation={8}
        sx={{ padding: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
            <fieldset>

            <FormLabel sx={{ fontSize: '1.5rem', fontFamily: 'Lexend Deca, Arial',}}>
                <legend>What is one thing the {commonName.toLowerCase()} eats?</legend>
            </FormLabel>
            <label htmlFor='Prey'>Prey
            
            <input
                type="text"
                name="userGuess"
                id="Prey"
                defaultValue="" 
                className="input-nonMUI"
                ref={ref} 
                onChange={handleChange}
            />               
            </label>
            <div>
                { !feedback ? 
                <Button type="submit">Check answer</Button>
                : null }
                { feedback === message.incorrect ?
                <Button type="reset" onClick={handleReset}>Clear answer</Button>
                : null }
            </div>
            <Typography id="quiz-feedback" variant="h5" sx={{ fontFamily: theme.typography.primary, textAlign: 'center' }}>{feedback}</Typography>

            </fieldset>
        </form>
        </Paper>
    )
}