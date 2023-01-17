import axios from "axios";

/**
 * Users class provides methods for requesting user-related data from our api;
 * Routes include users, parents, and animals;
 * 
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class usersAPI {

    static token;
    
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        // provides a template for api calls and passes token via the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${usersAPI.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

    /** User Routes */

    // Register a new user
    static async registerUser(newUser) {
        const registerData = await this.request(`auth/register`, 
        newUser, "post");
        console.log(registerData);
        return registerData.token;
    }

    // Login a returning user
    static async loginUser(userData) {
        const loginData = await this.request(`auth/login`,
        userData, "post");
        console.log(loginData)
        return loginData.token;
    }

    // Retrieve user's information
    static async getUser(username) {
        const userData = await this.request(`users/${username}`);
        return userData;
    }

    // Update user's points as they earn badges
    static async updatePoints(userData) {
        console.log("USERDATA:", userData)
        const pointsData = await this.request(`users/points`, userData, "patch");
        console.log("UPDATE POINTS DATA:", pointsData);
        return pointsData;
    }

    // Reset user's points to 0 when they choose to start over
    static async resetPoints(username) {
        const resetPointsData = await this.request(`users/reset`, username, "patch");
        return resetPointsData;
    }

    // Update user's badges as they earn them
    static async addBadge(userData) {
        console.log("BADGEUSERDATA:", userData)
        const badgesData = await this.request(`users/badges`, userData, "post");
        console.log("UPDATE BADGES DATA:", badgesData);
        return badgesData;
    }

    /** Parent Routes */

    // Register a parent
    static async registerParent(parent) {
        const regParentData = await this.request(`parents/register`, 
        parent, "post");
        return regParentData.token;
    }

    // Get parent's information
    static async getParent(parentUsername) {
        const parentData = await this.request(`parents/${parentUsername}`);
        console.log(parentData);
        return parentData;
    }

    // Get access code from parent registration
    static async getCode(parentUsername) {
        const codeData = await this.request(`parents/${parentUsername}`);
        return codeData.parent.access_code;
    }

    /** Animal Routes 
     * 
     *  These routes are different from the animal object requested from public api (see animalsAPI.js);
     *  These routes provide data from the animals relation in db
    */
   
    // Retrive animal info by name
    // We need this in order to provide and track user badges
    static async getAnimal(animalName) {
        const animalData = await this.request(`animals/${animalName}`);
        console.log(animalData);
        return animalData;
    }

    // Retrieve all the animals
    // We need this to compare to user's badges and determine if badge already earned for given animal
    static async getAllAnimals() {
        const animals = await this.request(`animals/`);
        console.log("ANIMALS:", animals);
        return animals;
    }

    // Retrieve single animal by ID
    // We use this to allow user to select a random animal
    static async getAnimalById(id) {
        const animalData = await this.request(`animals/animal/${id}`);
        console.log(animalData);
        return animalData;
    }

    // Delete all of user's badges
    static async deleteBadges(userId) {
        const resp = await this.request(`users/badges/${userId}`, userId, "delete");
        return resp;
    }
}

export default usersAPI;