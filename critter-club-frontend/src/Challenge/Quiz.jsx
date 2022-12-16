import { useState } from 'react';
import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';

// TODO: add logic to accummulate points
// TODO: add functionality to submit button
// TODO: add button to return directly to animal info page for selected animal

export function Quiz({ taxClass, setTaxClass, commonName, scientificName, locations, diet, phylum, prey }) {
    
    const message = {
        correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
        incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
    };

    const [passed, setPassed] = useState(false);

    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <DietForm 
                commonName={commonName} 
                diet={diet}
                message={message}
                passed={passed}
                setPassed={setPassed}
                >
            </DietForm>
            <LocationsForm 
                commonName={commonName} 
                locations={locations}
                message={message}
                >
            </LocationsForm>
            {phylum === "Chordata" ?  
            <TaxClassForm 
                commonName={commonName} 
                taxClass={taxClass} 
                setTaxClass={setTaxClass} 
                phylum={phylum}
                message={message}
                >
            </TaxClassForm> 
            : null}            
            { prey ? 
            <PreyForm 
                commonName={commonName} 
                prey={prey}
                message={message}
                >
            </PreyForm> 
            : null }
            <ScientificNameForm 
                commonName={commonName} 
                scientificName={scientificName}
                message={message}
                >
            </ScientificNameForm>                
            <button type="submit">Submit Your Answers</button>
        </div>
    )
}