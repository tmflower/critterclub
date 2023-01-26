import axios from "axios";
import animalsList from "../assets/animalsList";

/**
 * Animals class provides methods for requesting data from public animals api;
 * This api offers only one endpoint! Shown in BASE_URL_ANIMALS below;
 * There is no built-in endpoint for requesting all animals, or even more than one at a time
 * 
 */

const BASE_URL_BACKEND = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL_ANIMALS = "https://api.api-ninjas.com/v1/animals?name=";
let API_KEY_ANIMALS;

// Retrieve the required key to access the public api
const getKey = async () => {
    const res = await axios.get(`${BASE_URL_BACKEND}/util/keys`);
    API_KEY_ANIMALS = res.data.animals_api_key;
    return API_KEY_ANIMALS;
}

class AnimalsAPI {
    
    // When calling this method, the api may return multiple animals in an array (i.e. leopard seal, snow leopard, and leopard will return when the name leopard is the search query)
    // To ensure we get the correct animal, we filter results to match the exact name of the selected animal
    static async getSingleAnimal(animalName) {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${animalName}`, {headers: {"X-Api-Key": API_KEY_ANIMALS }});
        const animal = response.data.filter(animal => animal.name.toLowerCase() === animalName.toLowerCase());
        return animal[0];
    }    

    // This api has no endpoint for all animals; the only endpoint is at BASE_URL_ANIMALS
    // To get all animals for searching and browsing, collect a list of all animals containing each vowel, then filter to remove duplicates
    // Limit results to those animals on the animalsList, for which we have photos and videos

    static async getAllAnimals() {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        
        // use vowels to ensure every animal is included in all animals list
        const A = await axios.get(`${BASE_URL_ANIMALS}a`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        const E = await axios.get(`${BASE_URL_ANIMALS}e`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const I = await axios.get(`${BASE_URL_ANIMALS}i`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        const O = await axios.get(`${BASE_URL_ANIMALS}o`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const U = await axios.get(`${BASE_URL_ANIMALS}u`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 

        const allAnimalsWithDuplicates = [...A.data, ...E.data, ...I.data, ...O.data, ...U.data];

        const uniqueAnimals = new Set();

        // filter to remove duplicates from vowel lists
        let allAnimals = allAnimalsWithDuplicates.filter(animal => {
            const isDuplicate = uniqueAnimals.has(animal.name);
            uniqueAnimals.add(animal.name);

            if (!isDuplicate) return true;
            return false;
        });

        // narrow the list of animals to include down to those on animalsList, for which media exists
        allAnimals = allAnimals.filter(animal => animalsList.includes(animal.name));
        return allAnimals;
    }
}

export default AnimalsAPI;