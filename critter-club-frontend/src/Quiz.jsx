import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';

// TODO: provide user feedback on each question
// TODO: add logic to accummulate points
// TODO: add functionality to submit button

export function Quiz({taxClass, setTaxClass, commonName, scientificName, locations, diet, phylum, prey }) {
    
    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <DietForm 
                commonName={commonName} 
                diet={diet}>
            </DietForm>
            <LocationsForm 
                commonName={commonName} 
                locations={locations}>
            </LocationsForm>
            {phylum === "Chordata" ?  
            <TaxClassForm 
                commonName={commonName} 
                taxClass={taxClass} 
                setTaxClass={setTaxClass} 
                phylum={phylum}>
            </TaxClassForm> 
            : null}            
            { prey ? 
            <PreyForm 
                commonName={commonName} 
                prey={prey}>
            </PreyForm> 
            : null }
            <ScientificNameForm 
                commonName={commonName} 
                scientificName={scientificName}>
            </ScientificNameForm>                
            <button type="submit">Submit Your Answers</button>
        </div>
    )
}