import { useState } from 'react';

export function LocationsForm({commonName, locations, message, points, setPoints, numQuestions, setNumQuestions  }) {

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

    const handleChange = (e) => {
        const { name, checked } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: checked }));
    }

    // narrow the list of valid locations to compare to user's choices
    // this prevents problems resulting from missing or messy location data from the api
    const validLocations = [ 
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "NorthAmerica",
        "Eurasia",
        "Ocean",
        "CentralAmerica",
        "SouthAmerica",
        "Oceania"
   ];

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

    const handleReset = (e) => {
        setFormData(initialState);
        setFeedback('');
    }

    return (
        <form onSubmit={handleSubmit}>
                {validLocations.includes(locations[0]) ? 
                <div>
                    <fieldset>
                        <legend>In which location or locations can the {commonName.toLowerCase()} be found?
                        </legend>
                        <label htmlFor='Africa'>
                            <input
                                type="checkbox"
                                id="Africa"
                                name="Africa"
                                checked={Africa}
                                onChange={handleChange}
                            ></input>
                            Africa
                        </label>
                        <label htmlFor='Antarctica'>
                            <input
                                type="checkbox"
                                id="Antarctica"
                                name="Antarctica"
                                checked={Antarctica}
                                onChange={handleChange}
                            ></input>
                            Antarctica
                        </label>
                        <label htmlFor='Asia'>
                            <input
                                type="checkbox"
                                id="Asia"
                                name="Asia"
                                checked={Asia}
                                onChange={handleChange}
                            ></input>
                            Asia
                        </label>
                        <label htmlFor='Europe'>
                            <input
                                type="checkbox"
                                id="Europe"
                                name="Europe"
                                checked={Europe}
                                onChange={handleChange}
                            ></input>
                            Europe
                        </label>
                        <label htmlFor='North America'>
                            <input
                                type="checkbox"
                                id="NorthAmerica"
                                name="NorthAmerica"
                                checked={NorthAmerica}
                                onChange={handleChange}
                            ></input>
                            North America
                        </label>
                        <label htmlFor='Eurasia'>
                            <input
                                type="checkbox"
                                id="Eurasia"
                                name="Eurasia"
                                checked={Eurasia}
                                onChange={handleChange}
                            ></input>
                            Eurasia
                        </label>
                        <label htmlFor='Ocean'>
                            <input
                                type="checkbox"
                                id="Ocean"
                                name="Ocean"
                                checked={Ocean}
                                onChange={handleChange}
                            ></input>
                            Ocean
                        </label>
                        <label htmlFor='Central America'>
                            <input
                                type="checkbox"
                                id="CentralAmerica"
                                name="CentralAmerica"
                                checked={CentralAmerica}
                                onChange={handleChange}
                            ></input>
                            Central America
                        </label>
                        <label htmlFor='South America'>
                            <input
                                type="checkbox"
                                id="SouthAmerica"
                                name="SouthAmerica"
                                checked={SouthAmerica}
                                onChange={handleChange}
                            ></input>
                            South America
                        </label>
                        <label htmlFor='Oceania'>
                            <input
                                type="checkbox"
                                id="Oceania"
                                name="Oceania"
                                checked={Oceania}
                                onChange={handleChange}
                            ></input>
                            Oceania
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
                </div>                 
                : null}
        </form>
    )
}