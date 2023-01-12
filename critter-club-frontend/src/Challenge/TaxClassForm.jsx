import { useState } from 'react';
import { Paper, FormLabel, RadioGroup, Radio, Typography, Button } from '@mui/material';
import { theme } from '../theme/theme';

/** TaxClassForm renders a question with radio button answers */

export function TaxClassForm({commonName, taxClass, setTaxClass, message, points, setPoints, numQuestions, setNumQuestions  }) {
    
    if (taxClass === "sarcopterygii" || taxClass === "actinopterygii" || taxClass === "chondrichthyes") {
        setTaxClass("fish");
    }

    if (!taxClass) setTaxClass("other");
    
    // Display form with no default answers and no initial message
    const initialState = {taxClass: ''};
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');

    // Deconstruct formData properties
    const { vertebrateGroup } = formData;

    // Set formData to user's input
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
		setFormData((formData) => 
            ({ ...formData, [name]: value })); 
    }

    // compare user's selection to animal data to check if correct; provide corresponding feedback message
    // update user's points
    // increment numQuestions; when numQuestions is >=2, user can submit answers and earn badge
    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct; provide corresponding feedback message
        e.preventDefault(); console.log(formData)
        if (vertebrateGroup === taxClass) {
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
        <Paper
        elevation={8}
        sx={{ padding: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <RadioGroup>
                <FormLabel sx={{ fontSize: '1.5rem', fontFamily: 'Lexend Deca, Arial',}}>
                    <legend>What taxonomic class does the {commonName.toLowerCase()} belong to?</legend>
                </FormLabel>
                <label htmlFor='Amphibians'>
                    <Radio 
                        // type="radio"
                        name="vertebrateGroup"
                        value="amphibia"
                        id="Amphibians"
                        onChange={handleChange}
                        checked={vertebrateGroup === "amphibia"}
                    />
                    Amphibians
                </label>
                <label htmlFor='Birds'>
                    <Radio 
                        // type="radio"
                        name="vertebrateGroup"
                        value="aves"
                        id="Birds"
                        onChange={handleChange}
                        checked={vertebrateGroup === "aves"}
                        />
                    Birds
                </label>
                <label htmlFor='Mammals'>
                    <Radio
                        // type="radio"
                        name="vertebrateGroup"
                        value="mammalia"
                        id="Mammals"
                        onChange={handleChange}
                        checked={vertebrateGroup === "mammalia"}
                    />
                    {/* </input> */}
                    Mammals
                </label>
                <label htmlFor='Reptiles'>
                    <Radio
                        // type="radio"
                        name="vertebrateGroup"
                        value="reptilia"
                        id="Reptiles"
                        onChange={handleChange}
                        checked={vertebrateGroup === "reptilia"}
                    />
                    {/* </input> */}
                    Reptiles
                </label>
                <label htmlFor='Fish'>
                    <Radio
                        // type="radio"
                        name="vertebrateGroup"
                        value="fish"
                        id="Fish"
                        onChange={handleChange}
                        checked={vertebrateGroup === "fish"}
                    />
                    {/* </input> */}
                    Fish
                </label>
                <label htmlFor='Other'>
                    <Radio 
                        // type="radio"
                        name="vertebrateGroup"
                        value="other"
                        id="Other"
                        onChange={handleChange}
                        checked={vertebrateGroup === "other"}
                    />
                    {/* </input> */}
                    Other
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