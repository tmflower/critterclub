import { useState, useEffect } from "react";
import PhotosAPI from './api/photosAPI.js';

export function Photo ({ animalName }) {
    
    const [photo, setPhoto] = useState("");
    // photoId would need to come from media object
    // const photoId = "pmeMohVpL2c";

    useEffect(() => {
        async function getAnimalPhoto() {
            setPhoto(await PhotosAPI.getPhoto(animalName));
        }
        getAnimalPhoto();
    }, [animalName]);

    return (
        <>
            <img src={photo} alt={animalName}></img>
        </>
    )
}