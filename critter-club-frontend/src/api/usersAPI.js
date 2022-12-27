import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class usersAPI {
    /** Methods:
     * 
     * 
     * authenticate user
     * register user
     * login user
     * get by username
     * 
     * register parent
     * 
     * create badge
     * get badge
     * add badge to user
     */

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

    static async registerUser(newUser) {
        const registerData = await this.request(`auth/register`, 
        newUser, "post");
        console.log(registerData);
        return registerData.token;
    }

    static async loginUser(userData) {
        const loginData = await this.request(`auth/login`,
        userData, "post");
        console.log(loginData)
        return loginData.token;
    }

    static async getUser(username) {
        const userData = await this.request(`users/${username}`);
        return userData;
    }

    static async registerParent(parent) {
        const regParentData = await this.request(`parents/register`, 
        parent, "post");
        return regParentData.token;
    }

    static async getParent(parentUsername) {
        const parentData = await this.request(`parents/${parentUsername}`);
        console.log(parentData);
        return parentData;
    }

    static async getCode(parentUsername) {
        const codeData = await this.request(`parents/${parentUsername}`);
        return codeData.parent.access_code;
    }

    static async getAnimal(id) {
        const animalData = await this.request(`animals/${id}`);
        console.log(animalData);
        return animalData;
    }

    static async updatePoints(userData) {
        console.log("USERDATA:", userData)
        const pointsData = await this.request(`users/points`, userData, "patch");
        console.log("UPDATE POINTS DATA:", pointsData);
        return pointsData;
    }

    static async getAllAnimals() {
        const animals = await this.request(`animals/`);
        console.log("ANIMALS:", animals);
        return animals;
    }

    // updates the users_animals table so that user badges will automatically update

    // static async getUserBadges() {
    //     const badgesData = await this.request(`users/badges`);
    //     return badgesData;
    // }
    
    static async addBadge(userData) {
        console.log("BADGEUSERDATA:", userData)
        const badgesData = await this.request(`users/badges`, userData, "post");
        console.log("UPDATE BADGES DATA:", badgesData);
        return badgesData;
    }
}

export default usersAPI;