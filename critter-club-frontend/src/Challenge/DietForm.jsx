import { useState } from 'react';
import { Paper, FormLabel, RadioGroup, Radio, Typography, Button } from '@mui/material';
import { theme } from '../theme/theme';

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
        e.preventDefault();
        if (animalDiet === diet) {
            setFeedback(message.correct);
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else setFeedback(message.incorrect);
    }

    // clear form responses & message when user clicks "Clear answer" button
    const handleReset = (e) => {
        setFormData(initialState);
        setFeedback('');
    }

    return (
        <Paper
        elevation={8}
        sx={{ padding: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
            <fieldset>
            <RadioGroup>
                <FormLabel sx={{ fontSize: '1.5rem', fontFamily: 'Lexend Deca, Arial',}}>
                    <legend>Which term best describes the {commonName.toLowerCase()}'s diet?</legend>
                </FormLabel>
            
            <label htmlFor='Carnivore'>
            <Radio 
                name="animalDiet"
                value="Carnivore"
                id="Carnivore"
                onChange={handleChange}
                checked={animalDiet === "Carnivore"}
            />
            Carnivore
            </label>
            <label htmlFor='Herbivore'>
            <Radio 
                name="animalDiet"
                value="Herbivore"
                id="Herbivore"
                onChange={handleChange}
                checked={animalDiet === "Herbivore"}
            />
            Herbivore
            </label>
            <label htmlFor="Omnivore">
            <Radio
                name="animalDiet"
                value="Omnivore"
                id="Omnivore"
                onChange={handleChange}
                checked={animalDiet === "Omnivore"}
            />
            Omnivore
            </label>
            <div>
                { !feedback ? 
                <Button type="submit">Check answer</Button>
                : null }
                { feedback === message.incorrect ?
                <Button id="alt-button" type="reset" onClick={handleReset}>Clear answer</Button>
                : null }
            </div>
            <Typography id="quiz-feedback" variant="h5" sx={{ fontFamily: theme.typography.primary, textAlign: 'center' }}>{feedback}</Typography>
            </RadioGroup>
            </fieldset>
        </form>
        </Paper>
    )

}