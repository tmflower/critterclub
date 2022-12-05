import axios from "axios";

const completeList = "a";
const BASE_URL_ANIMALS = "https://api.api-ninjas.com/v1/animals?name=";

const getKey = async function() {
    const res = await axios.get("http://localhost:3001/keys");
    console.log(res.data.animals_api_key);
    return res.data.animals_api_key;
}

const key = getKey();
const API_KEY_ANIMALS = key;

class AnimalsAPI {
    
    static async getAllAnimals() {
        const response = await axios.get(`${BASE_URL_ANIMALS}${completeList}`, {headers: {"X-Api-Key": API_KEY_ANIMALS}});   
        return response.data; 
    }

    static async getSingleAnimal(animalName) {
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
}

export default AnimalsAPI;