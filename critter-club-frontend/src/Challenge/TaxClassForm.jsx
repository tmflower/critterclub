import { useState } from 'react';

export function TaxClassForm({commonName, taxClass, setTaxClass, message, points, setPoints, numQuestions, setNumQuestions  }) {
    
    if (taxClass === "Sarcopterygii" || taxClass === "Actinopterygii" || taxClass === "Chondrichthyes") {
        setTaxClass("Fish");
    }

    if (!taxClass) setTaxClass("Other");
    

    const [formData, setFormData] = useState('');
    const [feedback, setFeedback] = useState('');
    const { vertebrateGroup } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct; provide corresponding feedback message
        e.preventDefault();
        if (vertebrateGroup === taxClass) {
            setFeedback(message.correct);
            setPoints(points+=10);
            setNumQuestions(numQuestions+1);
        }
        else setFeedback(message.incorrect); 
    }

    const handleReset = (e) => {
        setFormData('');
        let selection = document.querySelector('#userGuess');
        selection.value = '';
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
                        value="Amphibia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Amphibia"}
                        >
                    </input>
                    Amphibians
                </label>
                <label htmlFor='Birds'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="Aves"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Aves"}
                        >
                    </input>
                    Birds
                </label>
                <label htmlFor='Mammals'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="Mammalia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Mammalia"}
                        >
                    </input>
                    Mammals
                </label>
                <label htmlFor='Reptiles'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="Reptilia"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Reptilia"}
                        >
                    </input>
                    Reptiles
                </label>
                <label htmlFor='Fish'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="Fish"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Fish"}
                        >
                    </input>
                    Fish
                </label>
                <label htmlFor='Other'>
                    <input 
                        type="radio"
                        name="vertebrateGroup"
                        value="Other"
                        onChange={handleChange}
                        checked={vertebrateGroup === "Other"}
                        >
                    </input>
                    Other
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
        </div>
    )
}