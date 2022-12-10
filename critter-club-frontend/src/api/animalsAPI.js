import axios from "axios";

const completeList = "a";
const BASE_URL_ANIMALS = "https://api.api-ninjas.com/v1/animals?name=";
let API_KEY_ANIMALS;

const getKey = async () => {
    const res = await axios.get("http://localhost:3001/keys");
    API_KEY_ANIMALS = res.data.animals_api_key;
    return API_KEY_ANIMALS;
}

// TODO: fix getAllAnimals; current "complete" list excludes a handful of animals without the letter a. To get a truly complete list, get results from each vowel and create a new Set to eliminate duplicates

class AnimalsAPI {
    
    static async getAllAnimals() {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});   
        return response.data; 
    }

    static async getSingleAnimal(animalName) {
        if (API_KEY_ANIMALS === undefined) {
            await getKey();
        }
        const response = await axios.get(`${BASE_URL_ANIMALS}${animalName}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}}); 
        return response.data[0];  
    }    

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