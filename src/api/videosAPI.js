import axios from 'axios';

/**
 * Videos class provides a single method for accessing a video id from our MEDIA api;
 * Video id will be used to provide embedded youtube video for each animal
 * 
 */

let MEDIA;
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class VideosAPI {
    static async getVideo(animalName) {
        console.log(animalName)
        const res = await axios.get(`${BASE_URL}/util/media`);
        console.log(res)
        MEDIA = res.data.media;
        const videoId = `${MEDIA[animalName].video}`;
        console.log(videoId)
        return videoId;
    }
}

export default VideosAPI;
