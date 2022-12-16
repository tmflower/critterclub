import { useState, useEffect } from "react";
import PhotosAPI from '../api/photosAPI.js';

export function Photo ({ animalName }) {
    
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        async function getAnimalPhoto() {
            setPhoto(await PhotosAPI.getPhoto(animalName));

            // use this to prevent calls to api; delete or comment out when requesting photo
            // setPhoto("");
        }
        getAnimalPhoto();
    }, [animalName]);

    return (
        <>
            <img src={photo} alt={animalName}></img>
        </>
    )
}