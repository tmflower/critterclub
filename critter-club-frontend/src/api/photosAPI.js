import axios from "axios";

const BASE_URL_PHOTOS = "https://api.unsplash.com/photos";
let API_KEY_PHOTOS;
let MEDIA;

const getKey = async () => {
    const res = await axios.get("http://localhost:3001/keys");
    API_KEY_PHOTOS = res.data.photos_api_key;
    return (API_KEY_PHOTOS);
}

const getMedia = async () => {
    const res = await axios.get("http://localhost:3001/media");
    MEDIA = res.data.media;
    return MEDIA;
}

class PhotosAPI {

    static async getPhoto(animalName) {
        if (API_KEY_PHOTOS === undefined) {
            await getKey();
        }
        if (MEDIA === undefined) {
            await getMedia();
        }

        const modifiedAnimalName = animalName.replaceAll(' ', '_');

        const photoId = `${MEDIA[modifiedAnimalName].image}`;
        
        const res = await axios.get
        (`${BASE_URL_PHOTOS}/${photoId}`,
        {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`},
        //  params: {id: `${photoId}`, orientation: "landscape", content_filter: "high", order_by: "relevant"}
        });
        console.log("check headers for current usage:", res);
        console.log(res.data);
        return res.data.urls.regular;
    }




    // static async getPhoto(animalName) {
    //     // console.log("MAKING UNSPLASH REQUEST");
    //     if (API_KEY_PHOTOS === undefined) {
    //         await getKey();
    //     }
    //     console.log("MAKING UNSPLASH REQUEST");
    //     const res = await axios.get
    //     (`${BASE_URL_PHOTOS}/random`, 
    //     {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`},
    //      params: {query: animalName, content_filter: "high"}});
    //     console.log("check headers for current usage:", res);
    //     return res.data.urls.regular;
    // }

    // static async getPhoto(animalName) {
    //     if (API_KEY_PHOTOS === undefined) {
    //         await getKey();
    //     }
    //     const res = await axios.get
    //     (`https://api.unsplash.com/search/photos`, 
    //     {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`},
    //      params: {query: `${animalName}`, orientation: "landscape", content_filter: "high", order_by: "relevant"}});
    //     console.log("check headers for current usage:", res);
    //     console.log(res.data.results[0]);
    //     return res.data.results[0];
    // }

    // static async getPhoto(photoId) {
    //     if (API_KEY_PHOTOS === undefined) {
    //         await getKey();
    //     }
    //     const res = await axios.get
    //     (`${BASE_URL_PHOTOS}/${photoId}`,
    //     {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`},
    //      params: {id: `${photoId}`, orientation: "landscape", content_filter: "high", order_by: "relevant"}});
    //     console.log("check headers for current usage:", res);
    //     console.log(res.data);
    //     return res.data.urls.regular;
    // }

    // static async getAllNaturePhotos() {
    //     if (API_KEY_PHOTOS === undefined) {
    //         await getKey();
    //     }
    //     const res = await axios.get
    //     (`https://api.unsplash.com/topics/nature/photos`, 
    //     {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`}});
    //     console.log("check headers for current usage:", res);
    //     console.log(res.data);
    // }

    // static async getPhoto(animalName) {
    //     if (API_KEY_PHOTOS === undefined) {
    //         await getKey();
    //     }
    //     const res = await axios.get
    //     (`https://api.unsplash.com/topics/nature/search/photos`, 
    //     {headers: {"Authorization": `Client-ID ${API_KEY_PHOTOS}`},
    //      params: {query: `${animalName}`, orientation: "landscape", content_filter: "high", order_by: "relevant"}});
    //     console.log("check headers for current usage:", res);
    //     console.log(res.data.results[0]);
    //     return res.data.results[0];       
    // }
}
// PhotosAPI.getAllNaturePhotos();

// "https://api.unsplash.com/topics/nature/photos"

export default PhotosAPI;