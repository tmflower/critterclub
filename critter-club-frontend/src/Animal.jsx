import AnimalsAPI from './api/animalsAPI.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from './Photo.jsx';
import { Quiz } from './Quiz.jsx';

export function Animal() {

    const params = useParams();
    const animalName = params.animal;

    const [animal, setAnimal] = useState(null);
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [group, setGroup] = useState("");
    // habitat data is very messy; okay to include in animal info but not on quiz
    const [habitat, setHabitat] = useState("");
    const [phylum, setPhylum] = useState("");
    const [locations, setLocations] = useState([]);
    const [taxClass, setTaxClass] = useState("");
    const [diet, setDiet] = useState("");
    const [funFact, setFunFact] = useState("");
    const [features, setFeatures] = useState("");
    const [prey, setPrey] = useState([]);
    const [animalSelected, setAnimalSelected] = useState(false);
    
    useEffect(() => {
        async function getAnimal() {
            setAnimal(await AnimalsAPI.getSingleAnimal(animalName))
        }
        getAnimal();
    }, [animalName]);

    useEffect(() => {
        if (animal) {     
            setCommonName(animal.name);
            setScientificName(animal.taxonomy.scientific_name);
            setGroup(animal.characteristics.group);
            setPhylum(animal.taxonomy.phylum);
            setHabitat(animal.characteristics.habitat);
            setLocations(animal.locations.map(location => location.replace(/[^a-z]/gi, "")));
            setDiet(animal.characteristics.diet);
            setTaxClass(animal.taxonomy.class);
            setFunFact(animal.characteristics.slogan);
            setFeatures(animal.characteristics.most_distinctive_feature);
            setPrey(animal.characteristics.prey);
        }
    }, [animal]);
    
    const selectAnimal = () => {
        setAnimalSelected(true);
    }

    return (
        <div>
            {!animal ? "Loading..." :
            <div>
                {!animalSelected ? 
                <div>
                    <h2>{commonName}</h2>
                    <Photo animalName={animalName}/>
                    <p>{scientificName}</p>
                    <p>{group}</p>
                    <p>{habitat}</p>
                    <p>{taxClass}</p>
                    <p>{diet}</p>
                    <p>{prey}</p>
                    <p>{features}</p>
                    {phylum === "Chordata" ? <p>Vertebrate</p> : <p>Invertebrate</p>}
                    <ul>Found in:{locations.map((location, i) => <li key={i}>{location}</li>)}</ul>
                    <p>{funFact}</p>
                    <button onClick={selectAnimal}>Earn the {commonName} card!</button>
                </div>
                :
                <Quiz 
                    commonName={commonName}
                    scientificName={scientificName}
                    locations={locations}
                    diet={diet}
                    phylum={phylum}
                    taxClass={taxClass}
                    setTaxClass={setTaxClass}
                    prey={prey}
                ></Quiz>
                }
            </div>}
        </div>
    );
}