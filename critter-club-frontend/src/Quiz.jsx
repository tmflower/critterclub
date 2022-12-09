import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';


export function Quiz({taxClass, setTaxClass, commonName, scientificName, locations, diet, phylum, prey }) {
    
    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <DietForm commonName={commonName} diet={diet}></DietForm>
            <LocationsForm commonName={commonName} locations={locations}></LocationsForm>
            <TaxClassForm commonName={commonName} taxClass={taxClass} setTaxClass={setTaxClass} phylum={phylum}></TaxClassForm>
            <ScientificNameForm commonName={commonName} scientificName={scientificName}></ScientificNameForm>
            { prey ? <PreyForm commonName={commonName} prey={prey}></PreyForm> : null }
                {/* add a bonus question of scientific name with text input */}
                
            <button type="submit">Submit Answers</button>
        </div>
    )
}