import { useNavigate } from "react-router-dom";
import usersAPI from "../api/usersAPI";
import AnimalsAPI from "../api/animalsAPI";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import QuestionMarkTwoToneIcon from '@mui/icons-material/QuestionMarkTwoTone';

/** Random requests a photo, video and facts about a randomly selected animal;
 * When animal data is available, user clicks on button to redirect to the animal page
*/

const totalAnimals = 144;

export function Random() {
    const [randomAnimal, setRandomAnimal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getRandomAnimal() {
            const randomNum = Math.floor(Math.random() * totalAnimals);  
            const animalInfo = await usersAPI.getAnimalById(randomNum);            
            setRandomAnimal(await AnimalsAPI.getSingleAnimal(animalInfo.animal.common_name));
        }
        getRandomAnimal();
    }, []);

    const goToAnimal = () => {
        navigate(`/animals/${randomAnimal.name}`, { replace: true });
    }

    return (
        <>
            {randomAnimal ?
            <>
            <QuestionMarkTwoToneIcon sx={{ fontSize: '12rem', color: '#1e91d6ff' }}/>
            <Button onClick={goToAnimal}>Surprise me!</Button>
            </>
            :
            <CircularProgress />}
        </>
    )
}