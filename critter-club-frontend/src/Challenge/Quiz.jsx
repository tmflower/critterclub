import { useEffect, useState } from 'react';
import { DietForm } from './DietForm';
import { LocationsForm } from './LocationsForm';
import { TaxClassForm } from './TaxClassForm';
import { ScientificNameForm } from './ScientificNameForm';
import { PreyForm } from './PreyForm';
import usersAPI from '../api/usersAPI';
import { useContext } from 'react';
import UserContext from '../userContext';
import { useNavigate, Link } from 'react-router-dom';

export function Quiz({ 
                    taxClass,
                    setTaxClass, 
                    commonName, 
                    scientificName, 
                    locations, 
                    diet, 
                    phylum, 
                    prey, 
                    setAnimalSelected }) {
    
    const currentUser = useContext(UserContext); 
    const username = currentUser.user.username;
    const userId = currentUser.user.id;
    const navigate = useNavigate();

    const message = {
        correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
        incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
    };

    const [points, setPoints] = useState(0);
    const [numQuestions, setNumQuestions] = useState(0);
    const [animalId, setAnimalId] = useState();
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        async function getAnimals() {
            const res = await usersAPI.getAllAnimals();
            console.log(res);
            setAnimals(res.animals);
        }
        getAnimals();
    }, [commonName]);
console.log(animals);

    useEffect(() => {
        async function getAnimalId() {
            if(animals.length) { console.log(commonName)
                const animal = animals.filter(animal => commonName === animal.common_name);
                console.log(animal)
                setAnimalId(animal[0].id);
            }
        } 
        getAnimalId();
    },[animals, commonName])


console.log(animalId)

    async function handleSubmit() {
        if (points / numQuestions === 10) {
            alert(`Congratulations, ${username}! You earned ${points} points and the ${commonName} badge!`);
            await usersAPI.updatePoints({ username, points });
            await usersAPI.addBadge({ animalId, userId });
            navigate("/dashboard", {replace: true});
            refreshPage();
        } 
        else {
            alert("Sorry, you lose!");
            navigate("/dashboard", {replace: true});
        }
    }

    function refreshPage(){ 
        window.location.reload(); 
      }
    const handleClick = () => {
        setAnimalSelected(false);
    }

    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <DietForm 
                commonName={commonName} 
                diet={diet}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </DietForm>
            <LocationsForm 
                commonName={commonName} 
                locations={locations}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </LocationsForm>
            {phylum === "Chordata" ?  
            <TaxClassForm 
                commonName={commonName} 
                taxClass={taxClass} 
                setTaxClass={setTaxClass} 
                phylum={phylum}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </TaxClassForm> 
            : null}            
            { prey ? 
            <PreyForm 
                commonName={commonName} 
                prey={prey}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </PreyForm> 
            : null }
            {scientificName ?
            <ScientificNameForm 
                commonName={commonName} 
                scientificName={scientificName}
                message={message}
                points={points}
                setPoints={setPoints}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                >
            </ScientificNameForm>  
            : null }   
            <button type="button" onClick={handleClick}>Return to animal</button>
            { numQuestions >= 3 ?           
            <button type="submit" onClick={handleSubmit}>Submit Your Answers</button> : null }
            <Link to="/dashboard"></Link>
        </div>
    )
}