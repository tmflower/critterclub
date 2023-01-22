import { useState, useEffect } from "react";
import PhotosAPI from '../api/photosAPI.js';
import { Box, Typography, Stack } from '@mui/material';
import  { theme } from '../theme/theme';

export function Photo ({ animalName }) {
    
    const [photo, setPhoto] = useState("");
    const [photographer, setPhotographer] = useState("");
    const [photographerLink, setPhotographerLink] = useState("");

    useEffect(() => {
        async function getAnimalPhoto() {
            const photoData = await PhotosAPI.getPhoto(animalName);
            if (photoData) {
                setPhoto(photoData.urls.small);
                setPhotographer(photoData.user.name);
                setPhotographerLink(photoData.user.links.html);
            }
        }
        getAnimalPhoto();
    }, [animalName]);

    return (
        <Box sx={{ width: "auto", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {photo.length ?
            <Stack>
                <img src={photo} alt={animalName} width="200px" className="photo"/>
                <small>Photo by <a href={photographerLink} target="_blank" rel="noreferrer">{photographer}</a> on <a href="https://unsplash.com/?utm_source=critterclub&utm_medium=referral" target="_blank" rel="noreferrer">Unsplash</a></small>
            </Stack>
            :
            <Stack>
                <img src="https://media.giphy.com/media/WTVw3goakrX68WnHk8/giphy.gif" alt="none available" width="200px" className="photo"/>
                <Typography variant="h5" sx={{ fontFamily: theme.typography.primary }}>We don't have a photo of the {animalName} yet.</Typography>
            </Stack>
            }

        </Box>
    )
}