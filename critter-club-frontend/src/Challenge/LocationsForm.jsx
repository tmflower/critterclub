import { useState } from 'react';
import { Paper, FormLabel, Checkbox, Typography, Button, FormGroup } from '@mui/material';
import { theme } from '../theme/theme';

/** LocationsForm renders a question with checkbox answers */

export function LocationsForm({commonName, locations, message, points, setPoints, numQuestions, setNumQuestions, validLocations  }) {

    // set each location choice to unchecked by default
    const initialState = { 
        Africa: false,
        Antarctica: false,
        Asia: false,
        Europe: false,
        NorthAmerica: false,
        Eurasia: false,
        Ocean: false,
        CentralAmerica: false,
        SouthAmerica: false,
        Oceania: false
    }

    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState('');

    // Deconstruct formData properties
    const {         
        Africa, 
        Antarctica, 
        Asia,
        Europe,
        NorthAmerica,
        Eurasia,
        Ocean,
        CentralAmerica,
        SouthAmerica,
        Oceania
    } = formData;

    // Set formData to user's input
    const handleChange = (e) => {
        const { name, checked } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: checked }));
    }

    // narrow the list of valid locations to compare to user's choices
    // this prevents problems resulting from missing or messy location data from the api
//     const validLocations = [ 
//         "Africa",
//         "Antarctica",
//         "Asia",
//         "Europe",
//         "NorthAmerica",
//         "Eurasia",
//         "Ocean",
//         "CentralAmerica",
//         "SouthAmerica",
//         "Oceania"
//    ];

   // compare user's selection to animal data to check if correct; provide corresponding feedback message
    // update user's points
    // increment numQuestions; when numQuestions is >=3, user can submit answers and earn badge
   const handleSubmit = (e) => {
    e.preventDefault();
    // create an array of values from user input
    let userLocationChoices = [];
    for (let validLocation of validLocations) {
        if (formData[validLocation] === true) {
            userLocationChoices.push(validLocation);
        }
    }
    // compare length of user's array to animal data locations array
    // if not equal, there is no reason to check further; this also handles no user input
    // provide corresponding feedback message
    if (userLocationChoices.length !== locations.length) {
        setFeedback(message.incorrect);
    }
    // sort user's array to match the order of the animal data
    // compare values at matching index from each array
    // provide corresponding feedback message
    userLocationChoices.sort();
    console.log("userLocationChoices:", userLocationChoices);
    console.log("locations:", locations)
    let pointer1 = 0;
    let pointer2 = 0;

    if (userLocationChoices.length === 1 &&
        locations.length === 1 &&
        userLocationChoices[0] === locations[0]) {
            setFeedback(message.correct); 
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
    else {

        while (pointer1 < userLocationChoices.length) {            
            if (userLocationChoices[pointer1] !== locations[pointer2]) {
                setFeedback(message.incorrect);
                break;
            }
                else {
                    pointer1++;
                    pointer2++;
                        if (pointer1 === userLocationChoices.length -1 && 
                            pointer2 === locations.length -1 && 
                            userLocationChoices[pointer1] === locations[pointer2]) {
                                setFeedback(message.correct); 
                                setPoints(points+=10);
                                setNumQuestions(numQuestions+1);
                        }
                }
            }
        }        
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
                {validLocations.includes(locations[0]) ? 
                <div>
                    <fieldset>
                    <FormGroup>
                    <FormLabel sx={{ fontSize: '1.5rem', fontFamily: 'Lexend Deca, Arial',}}>
                        <legend>In which location or locations can the {commonName.toLowerCase()} be found?
                        </legend>
                    </FormLabel>
                        <label htmlFor='Africa'>
                            <Checkbox
                                // type="checkbox"
                                id="Africa"
                                name="Africa"
                                checked={Africa}
                                onChange={handleChange}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            />
                            Africa
                        </label>
                        <label htmlFor='Antarctica'>
                            <Checkbox
                                // type="checkbox"
                                id="Antarctica"
                                name="Antarctica"
                                checked={Antarctica}
                                onChange={handleChange}
                            />
                            Antarctica
                        </label>
                        <label htmlFor='Asia'>
                            <Checkbox
                                // type="checkbox"
                                id="Asia"
                                name="Asia"
                                checked={Asia}
                                onChange={handleChange}
                            />
                            Asia
                        </label>
                        <label htmlFor='Europe'>
                            <Checkbox
                                // type="checkbox"
                                id="Europe"
                                name="Europe"
                                checked={Europe}
                                onChange={handleChange}
                            />
                            Europe
                        </label>
                        <label htmlFor='North America'>
                            <Checkbox
                                // type="checkbox"
                                id="North America"
                                name="NorthAmerica"
                                checked={NorthAmerica}
                                onChange={handleChange}
                            />
                            North America
                        </label>
                        <label htmlFor='Eurasia'>
                            <Checkbox
                                // type="checkbox"
                                id="Eurasia"
                                name="Eurasia"
                                checked={Eurasia}
                                onChange={handleChange}
                            />
                            Eurasia
                        </label>
                        <label htmlFor='Ocean'>
                            <Checkbox
                                // type="checkbox"
                                id="Ocean"
                                name="Ocean"
                                checked={Ocean}
                                onChange={handleChange}
                            />
                            Ocean
                        </label>
                        <label htmlFor='Central America'>
                            <Checkbox
                                // type="checkbox"
                                id="Central America"
                                name="CentralAmerica"
                                checked={CentralAmerica}
                                onChange={handleChange}
                            ></Checkbox>
                            Central America
                        </label>
                        <label htmlFor='South America'>
                            <Checkbox
                                // type="checkbox"
                                id="South America"
                                name="SouthAmerica"
                                checked={SouthAmerica}
                                onChange={handleChange}
                            />
                            South America
                        </label>
                        <label htmlFor='Oceania'>
                            <Checkbox
                                // type="checkbox"
                                id="Oceania"
                                name="Oceania"
                                checked={Oceania}
                                onChange={handleChange}
                            />
                            Oceania
                        </label>
                        <div>
                            { !feedback ? 
                            <Button type="submit">Check answers</Button>
                            : null }
                            { feedback === message.incorrect ?
                            <Button type="reset" onClick={handleReset}>Clear answers</Button>
                            : null }
                        </div>
                        <Typography id="quiz-feedback" variant="h5" sx={{ fontFamily: theme.typography.primary, textAlign: 'center' }}>{feedback}</Typography>  
                    </FormGroup>                      
                    </fieldset>                   
                </div>                 
                : null}
        </form>
        </Paper>
    )
}