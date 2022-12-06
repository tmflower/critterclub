import { useState, useEffect } from "react";
import AnimalsAPI from "./api/animalsAPI";
import { NavLink } from "react-router-dom";

export function Animals() {

    const [allAnimals, setAllAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [animalName, setAnimalName] = useState("");

    useEffect(() => {
        async function getAllAnimals() {
            setAllAnimals(await AnimalsAPI.getAllAnimals());
        }
        getAllAnimals();
    }, [])

    // console.log(allAnimals);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    // TODO: have search term list all matches and user choose desired one...this means rendering Animal component after clicking
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        setAnimalName(searchTerm);
        setSearchTerm("");
    }

    // TODO: REPLACE "LOADING..." WITH LOADING ICON
    return (
        <div>
        {!allAnimals.length ? "Loading..." :
            <div>
                <h1>Animals</h1>
                <form onSubmit={handleSubmit}>Search for an animal
                    <input type="search" onChange={handleSearch}></input>
                </form>
                {animalName ? <NavLink to={`/animals/${animalName}`}><p>{animalName}</p></NavLink> : null}
                {allAnimals.map((animal, i) =>  (<NavLink to={`/animals/${animal.name}`} key={i}><p key={i}>{animal.name}</p></NavLink>))}
            </div>}
        
        </div>
    )
}