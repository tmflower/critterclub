import { useState } from 'react';
import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';

export function Quiz({ 
                    taxClass,
                    setTaxClass, 
                    commonName, 
                    scientificName, 
                    locations, 
                    diet, 
                    phylum, 
                    prey, 
                    setAnimalSelected }) {
    
    const message = {
        correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
        incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
    };

    const [points, setPoints] = useState(0);
    const [numQuestions, setNumQuestions] = useState(0);
    
    /** TODO: update handle submit to:
     * 1. Add points to user points
     * 2. Add badge to user badges
     * 3. Display congratulations message to user & redirect to dashboard */

    const handleSubmit = () => {
        if (points / numQuestions === 10) alert(`You earned ${points} points and the ${commonName} badge!`);
        else alert("Sorry, you lose!")
    }

    const handleClick = () => {
        setAnimalSelected(false);
    }

    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <DietForm 
                commonName={commonName} 
                diet={diet}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </DietForm>
            <LocationsForm 
                commonName={commonName} 
                locations={locations}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </LocationsForm>
            {phylum === "Chordata" ?  
            <TaxClassForm 
                commonName={commonName} 
                taxClass={taxClass} 
                setTaxClass={setTaxClass} 
                phylum={phylum}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </TaxClassForm> 
            : null}            
            { prey ? 
            <PreyForm 
                commonName={commonName} 
                prey={prey}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </PreyForm> 
            : null }
            {scientificName ?
            <ScientificNameForm 
                commonName={commonName} 
                scientificName={scientificName}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </ScientificNameForm>  
            : null }   
            <button type="button" onClick={handleClick}>Return to animal</button>
            { numQuestions >= 3 ?           
            <button type="submit" onClick={handleSubmit}>Submit Your Answers</button> : null }
        </div>
    )
}