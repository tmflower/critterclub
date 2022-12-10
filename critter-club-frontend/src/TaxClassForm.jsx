import { useState } from 'react';

export function TaxClassForm({commonName, taxClass, setTaxClass, phylum}) {
    
    if (taxClass === "Sarcopterygii" || taxClass === "Actinopterygii" || taxClass === "Chondrichthyes") {
        setTaxClass("Fish");
    }

    if (!taxClass) setTaxClass("Other");
    

    const [formData, setFormData] = useState('');
    const { vertebrateGroup } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: value }));
    }

    const handleSubmit = (e) => {
        // compare user's selection to animal data to check if correct
        // TODO: add functionality for user feedback
        e.preventDefault();
        console.log(vertebrateGroup, taxClass)
        if (vertebrateGroup === taxClass) {
            console.log("YOU ARE CORRECT---class!!! 😀😀😀");
        }
        else console.log("SORRY, NOT THIS TIME--class 😫😫😫"); 
    }

    const handleReset = (e) => {
        setFormData('');
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>What taxonomic class does the {commonName.toLowerCase()} belong to?</legend>
                <label>
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
                <label>
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
                <label>
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
                <label>
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
                <label>
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
                <label>
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
                    <button type="submit">Check answer</button>
                    <button type="reset" onClick={handleReset}>Clear answer</button>
                </div>
            </fieldset>
        </form>
        </div>
    )
}