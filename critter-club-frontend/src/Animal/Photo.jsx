import { useState, useEffect } from "react";
import PhotosAPI from '../api/photosAPI.js';
import { Box } from '@mui/material';

export function Photo ({ animalName }) {
    
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        async function getAnimalPhoto() {
            setPhoto(await PhotosAPI.getPhoto(animalName));
        }
        getAnimalPhoto();
    }, [animalName]);

    return (
        <Box sx={{ width: "auto"}}>
            <img src={photo} alt={animalName} width="200px" className="photo"></img>
        </Box>
    )
}