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
     * authenticate parent
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
        //   let message = err.response.data.error.message;
        //   throw Array.isArray(message) ? message : [message];
        }
      }

    static async registerUser(newUser) {
        const data = await this.request(`users/register`, 
        newUser, "post");
        console.log(data);
        usersAPI.token = data.token;
    }

    static async getUser(username) {
        const data = await this.request(`users/${username}`);
        console.log(data.user);
        return data;
    }
    
}

export default usersAPI;