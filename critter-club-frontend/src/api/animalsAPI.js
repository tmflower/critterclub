import axios from "axios";
import animalsList from "../utils/animalsList";

const completeList = "a";
const BASE_URL_ANIMALS = "https://api.api-ninjas.com/v1/animals?name=";
let API_KEY_ANIMALS;

const getKey = async () => {
    const res = await axios.get("http://localhost:3001/util/keys");
    API_KEY_ANIMALS = res.data.animals_api_key;
    return API_KEY_ANIMALS;
}

class AnimalsAPI {
    
    // This api has only one endpoint, but may return multiple animals in an array (i.e. leopard seal, snow leopard, and leopard will return when the name leopard is the search query)
    // To ensure we get the correct animal, filter results to match the exact name of the selected animal
    static async getSingleAnimal(animalName) {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${animalName}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const animal = response.data.filter(animal => animal.name.toLowerCase() === animalName.toLowerCase());
        return animal[0];
    }    

    // This api has no endpoint for all animals; the only endpoint is at BASE_URL_ANIMALS
    // Use the endpoint with this modification to get all animals for searching and browsing

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

        allAnimals = allAnimals.filter(animal => animalsList.includes(animal.name));
        return allAnimals;
    }

    // static async getAllAnimals() {
    //     if (API_KEY_ANIMALS === undefined) {
    //         await getKey();
    //     }
    //     const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});   
    //     return response.data; 
    // }

    static async getRandomAnimal(randomNum) {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        return response.data[randomNum];   
    } 

    static async getHabitats() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});  
        const allHabitats = new Set(response.data.map(data => data.characteristics.habitat))
        return allHabitats.replace(/[^a-z]/g, '');  
    }

    static async getDiets() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        const allDiets = new Set(response.data.map(data => data.characteristics.diet))
        return allDiets;   
    }

    static async getTaxClasses() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const taxClasses = new Set(response.data.map(data => data.taxonomy.class));
        return taxClasses;   
    }

    static async getLocations() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        const locationData = response.data.map(data => data.locations);
        const allLocations = new Set(locationData.map(location => location[0]));
        return allLocations;  
    }

    static async getFunFacts() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        const factsData = response.data.map(data => data.characteristics.slogan);
        const allFacts = new Set(factsData.map(fact => fact));
        return allFacts;  
    }

    static async getPhylaList() {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const phylaList = new Set(response.data.map(data => data.taxonomy.phylum));
        return phylaList;
    }

    static async getInfo() {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});
        const info = new Set(response.data.map(data => data.taxonomy.phylum));
        console.log(info)
        return info;
    }
}

export default AnimalsAPI;