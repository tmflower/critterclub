import AnimalsAPI from './api/animalsAPI.js';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Photo } from './Photo.jsx';

export function Animal() {

    const params = useParams();
    const animalName = params.animal;

    const [animal, setAnimal] = useState(null);
    const [commonName, setCommonName] = useState("");
    const [group, setGroup] = useState("");
    // habitat data is very messy; okay to include in animal info but not on quiz
    const [habitat, setHabitat] = useState("");
    const [phylum, setPhylum] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function getAnimal() {
            setAnimal(await AnimalsAPI.getSingleAnimal(animalName))
        }
        getAnimal();
    }, [animalName]);

    useEffect(() => {
        if (animal) {     
            setCommonName(animal.name);
            localStorage.setItem("animal", animal.name);
            setGroup(animal.characteristics.group);
            setPhylum(animal.taxonomy.phylum);
            setHabitat(animal.characteristics.habitat);
            setLocations(animal.locations);
        }
    }, [animal]);
    
    return (
        <div>
            {!animal ? "Loading..." :
            <div>
                <div>
                    <h2>Animal Info</h2>
                    <Photo animalName={animalName}/>
                    <p>{commonName}</p>
                    <p>{group}</p>
                    <p>{habitat}</p>
                    {phylum === "Chordata" ? <p>Vertebrate</p> : <p>Invertebrate</p>}
                    <ul>Found in:{locations.map((location, i) => <li key={i}>{location}</li>)}</ul>
                </div>
                <div>
                    <NavLink to={"/quiz"}><button>Earn the {commonName} card!</button></NavLink>
                </div>
            </div>}
        </div>
    );
}