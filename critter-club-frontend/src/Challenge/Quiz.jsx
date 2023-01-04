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
import validLocations from '../Animal/Animal';


/** Quiz renders a set of questions about the selected animal;
 * User can check each answer individually and submit when 3 or more are correct;
 * User receives points and badge and is redirected to dashboard;
 */

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

    // Retrieve list of all animals in db;
    // We'll use this to create a badge for this user & animal;
    useEffect(() => {
        async function getAnimals() {
            const res = await usersAPI.getAllAnimals();
            console.log(res);
            setAnimals(res.animals);
        }
        getAnimals();
    }, [commonName]);

    // From the list of all animals, locate the selected animal by name;
    // Set animalId to be the id number in the animals table in db;
    // We'll use animalId to add a badge for this user & animal
    useEffect(() => {
        async function getAnimalId() {
            if(animals.length) {
                const animal = animals.filter(animal => commonName === animal.common_name);
                console.log(animal[0])
                setAnimalId(animal[0].id);
            }
        } 
        getAnimalId();
    },[animals, commonName])

console.log(animalId)

    /** When user submits all answers, if at least 3 are correct:
     * - Redirect user to dashboard
     * - Update user's points
     * - Update user's badges
     * - Provide congratulations message to user
     * 
     * 
     */
    async function handleSubmit() {
        // if (points / numQuestions === 10) {
            alert(`Congratulations, ${username}! You earned ${points} points and the ${commonName} badge!`);
            await usersAPI.updatePoints({ username, points });
            await usersAPI.addBadge({ animalId, userId });
            navigate("/dashboard", {replace: true});
            refreshPage();
    }

    // This function ensures that user will see updated stats on dashboard;
    function refreshPage(){ 
        window.location.reload(); 
      }

    // This function allows user to return from quiz view to animal info view;  
    const handleClick = () => {
        setAnimalSelected(false);
    }

    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <p>Earn 10 points for each correct answer.</p>
            <p>After answering 3 questions correctly, you can submit your answers to collect your badge, OR:</p>
            <p>Answer any additional questions to earn more points and level up!</p>
            <p>Visit your <Link to="/dashboard">dashboard</Link> to see your current level and how many points you need to level up.</p>
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
                validLocations={validLocations}
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