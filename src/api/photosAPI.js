import axios from "axios";

/**
 * Photos class provides methods for requesting data from Unsplash api;
 * Unsplash's built-in search method provides unreliable results, so we request images by id to ensure reliable, child-friendly results;
 * Id's are stored in backend MEDIA object
 * 
 */

const BASE_URL_BACKEND = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL_PHOTOS = "https://api.unsplash.com/photos";
let API_KEY_PHOTOS;
let MEDIA;

// Retrieve the required key to access the public api
const getKey = async () => {
    const res = await axios.get(`${BASE_URL_BACKEND}/util/keys`);
    API_KEY_PHOTOS = res.data.photos_api_key;
    return (API_KEY_PHOTOS);
}

// Provide access to stored photo id numbers
const getMedia = async () => {
    const res = await axios.get(`${BASE_URL_BACKEND}/util/keys`);
    MEDIA = res.data.media;
    return MEDIA;
}

class PhotosAPI {

    // Returns a photo from Unsplash, given the image id number
    // If no image id number exists, return a placeholder photo

    static async getPhoto(animalName) {
        if (API_KEY_PHOTOS === undefined) {
            await getKey();
        }
        if (MEDIA === undefined) {
            await getMedia();
        }
        let photoId = `${MEDIA[animalName].image}`;

        if (photoId.length) {
            const res = await axios.get
            (`${BASE_URL_PHOTOS}/${photoId}`,
            {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`}});
            return res.data
        }
    }
}

export default PhotosAPI;