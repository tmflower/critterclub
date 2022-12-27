import AnimalsAPI from '../api/animalsAPI.js';
import { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Photo } from './Photo.jsx';
import { Quiz } from '../Challenge/Quiz.jsx';
import { Video } from './Video.jsx';
import UserContext from "../userContext";
import usersAPI from '../api/usersAPI.js';

export function Animal() {
    
    const currentUser = useContext(UserContext);
    const params = useParams();
    const animalName = params.animal;

    const [animal, setAnimal] = useState(null);
    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [group, setGroup] = useState("");
    const [habitat, setHabitat] = useState("");
    const [phylum, setPhylum] = useState("");
    const [locations, setLocations] = useState([]);
    const [taxClass, setTaxClass] = useState("");
    const [diet, setDiet] = useState("");
    const [funFact, setFunFact] = useState("");
    const [features, setFeatures] = useState("");
    const [prey, setPrey] = useState([]);
    const [animalSelected, setAnimalSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [badges, setBadges] = useState([]);
    const [badgeCollected, setBadgeCollected] = useState(false);
    
    useEffect(() => {
        async function getAnimal() {
            setIsLoading(true);
            setAnimal(await AnimalsAPI.getSingleAnimal(animalName));
        }
        getAnimal();
    }, [animalName]);

    useEffect(() => {
        if (animal) {  
            setIsLoading(false);  
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
        setIsLoading(false);
    }, [animal]);
    
    // useEffect(() => {
    //     async function getUserBadges() {
    //         setBadges(await usersAPI.getUserBadges);
    //     }
    // });

    const selectAnimal = () => {
        setAnimalSelected(true);
    }

    if (badges.includes(animalName)) {
        setBadgeCollected(true);
    }
    console.log(badges)
    console.log("BADGE COLLECTED?", badgeCollected)
    return (
        <div>
            {isLoading ? <p>Collecting your animal information!</p> :
            <div>
                {/* {!animal ? <p>Invalid Animal</p> :  */}
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
                        <Video animalName={animalName}></Video>
                        {badgeCollected ? <p>You've already collected this badge. Great job! Let's try for your next one! <NavLink to="/browse"></NavLink></p>
                        :
                        <button onClick={selectAnimal}>Collect the {commonName} badge!</button>}
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
                        features={features}
                        setAnimalSelected={setAnimalSelected}
                    ></Quiz>
                    }
                </div>
            </div>}
        </div>
    );
}