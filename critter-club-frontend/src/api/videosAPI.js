import axios from 'axios';
let MEDIA;

class VideosAPI {
    static async getVideo(animalName) {
        const res = await axios.get("http://localhost:3001/media");
        MEDIA = res.data.media;
        const modifiedAnimalName = animalName.replaceAll(' ', '_');
        const videoId = `${MEDIA[modifiedAnimalName].video}`;
        return videoId;
    }
}

export default VideosAPI;
