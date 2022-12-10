import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Animals({allAnimals}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [browseSelected, setBrowseSelected] = useState(false);
    const [searchSelected, setSearchSelected] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const matchingAnimals = allAnimals.filter((animal) => animal.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const selectSearch = () => {
        setSearchSelected(true);
        setBrowseSelected(false);
    }

    // TODO: REPLACE "LOADING..." WITH LOADING ICON
    return (
        <div>
            {!browseSelected && !searchSelected ? 
                <h1>Explore the Critter Club Animal Collection!</h1> : null}
                <NavLink to="/animals/browse"><button>Browse All Animals</button></NavLink>
                <button onClick={selectSearch}>Search for an Animal</button>           
        {!allAnimals.length ? "Loading..." :            
            <div>
                {searchSelected ? 
                <div>
                    <h1>Search for an Animal</h1>
                    <form onSubmit={handleSubmit}>Search for an animal
                        <input type="search" onChange={handleSearch}></input>
                    </form>
                    {matchingAnimals.length ? 
                    (matchingAnimals.map((animal, i) =>  (<NavLink to={`/animals/${animal.name}`} key={i}><p key={i}>{animal.name}</p></NavLink>)))
                    
                    : (<p>Sorry, we don't have information about that animal.</p>)}
                </div> 
                : null}               
            </div>
        }  
        </div>
    )
}