import { useState } from "react";
import { NavLink } from "react-router-dom";
// import Cache from "./Cache";

export function Animals({allAnimals}) {

    const [searchTerm, setSearchTerm] = useState("");
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
    }

    // TODO: Move search into its own component with direct navigation
    return (
        <div>
            {/* <Cache animals={allAnimals}></Cache> */}
            {!searchSelected ? 
                <h1>Explore the Critter Club Animal Collection!</h1> : null}
                <NavLink to="/animals/browse"><button>Browse All Animals</button></NavLink>
                <button onClick={selectSearch}>Search for an Animal</button>           
        {!allAnimals.length ? (
            <div>
                <p>Please wait while we collect all the animals!</p>
                <img src="https://media.giphy.com/media/a9wFQSc0oRQGI/giphy.gif" alt="herding sheep"></img>
                </div>) 
                :            
            <div>
                {searchSelected ? 
                <div>
                    <h1>Search for an Animal</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="searchTerm">Search
                        <input type="search" onChange={handleSearch} value={searchTerm}></input>
                        </label>
                    </form>
                    {!searchTerm.length ? <p>Start typing to search for an animal.</p> : 
                    <div>
                        {matchingAnimals.length ? 
                        (matchingAnimals.map((animal, i) => (<NavLink to={`/animals/${animal.name}`} key={i}><p key={i}>{animal.name}</p></NavLink>)))                    
                        : (<p>Sorry, we don't have information about that animal.</p>)}
                    </div>
                    }
                </div> 
                : null}               
            </div>
        }  
        </div>
    )
}