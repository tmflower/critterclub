import { useState } from "react";
import { NavLink } from "react-router-dom";

/** Search renders a page that allows user to search for animals by typing in their name or part of their name
 * A list of animal names will display dynamically as the user types
 * If there are no animals matching user input, user will receive a message
 * User can click on animal name to visit Animal page with information and quiz for that animal
 * If allAnimals has not yet loaded, user will see a message and a gif while it loads
 * 
 */

export function Search({ allAnimals }) {

    // Initialize variable for user input and set to blank
    const [searchTerm, setSearchTerm] = useState("");

    // Function to set search term to match user input; called onChange to respond as user types
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    // Function to prevent page reload if user presses enter
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // Function to return list of animals containing letters typed by user
    const matchingAnimals = allAnimals.filter((animal) => animal.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            {!allAnimals.length ? (
            <div>
                <p>Please wait while we collect all the animals!</p>
                <img src="https://media.giphy.com/media/a9wFQSc0oRQGI/giphy.gif" alt="herding cats"></img>
            </div>) 
            :
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
            </div> }       
            <div/>
        </div>
    )
}