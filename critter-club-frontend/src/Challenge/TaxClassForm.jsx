import { useState } from 'react';

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
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    // compare user's selection to animal data to check if correct; provide corresponding feedback message
    // update user's points
    // increment numQuestions; when numQuestions is >=3, user can submit answers and earn badge
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
        <div>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>What taxonomic class does the {commonName.toLowerCase()} belong to?</legend>
                <label htmlFor='Amphibians'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="amphibia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "amphibia"}
                        >
                    </input>
                    Amphibians
                </label>
                <label htmlFor='Birds'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="aves"
                        onChange={handleChange}
                        checked={vertebrateGroup === "aves"}
                        >
                    </input>
                    Birds
                </label>
                <label htmlFor='Mammals'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="mammalia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "mammalia"}
                        >
                    </input>
                    Mammals
                </label>
                <label htmlFor='Reptiles'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="reptilia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "reptilia"}
                        >
                    </input>
                    Reptiles
                </label>
                <label htmlFor='Fish'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="fish"
                        onChange={handleChange}
                        checked={vertebrateGroup === "fish"}
                        >
                    </input>
                    Fish
                </label>
                <label htmlFor='Other'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="other"
                        onChange={handleChange}
                        checked={vertebrateGroup === "other"}
                        >
                    </input>
                    Other
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
        </div>
    )
}