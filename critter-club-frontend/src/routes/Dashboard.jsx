import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import usersAPI from "../api/usersAPI";
import UserContext from "../userContext";
import { Badge } from "../Animal/Badge";

const levels = {
    0: 'Observer',
    100: 'Explorer', 
    500: 'Adventurer', 
    1000: 'Naturalist', 
    2500: 'Ecologist', 
    5000: 'Zoologist' 
}

export function Dashboard() {
    
    const currentUser = useContext(UserContext);
    const [userAnimals, setUserAnimals] = useState([]);

    const [level, setLevel] = useState('Observer');

console.log(level);

console.log(currentUser);

    useEffect(() => {
        async function getBadges() {
            if (currentUser) {            
                const userBadges = currentUser.user.userBadges;
                let animal;
                const animals = [];
                for (let id of userBadges) {  
                    console.log(id);              
                    animal = await usersAPI.getAnimal(id);
                    if (animal) {
                        animals.push(animal);
                    }
                }
                setUserAnimals(animals);
            }

            for (let level in levels) { 
                level = +level;
                if (currentUser.user.points > level) {
                    setLevel(levels[level])
                }
            }           
        }
        getBadges();
    }, [currentUser]);
console.log(userAnimals);

    return (
        <div>
            { currentUser !== null ?   
            <div>            
            <h1>Hello, {currentUser.user.username}, you're a Critter Club {level}!</h1>
            <h2>You've collected {currentUser.user.userBadges.length} badges so far and you have {currentUser.user.points} points!</h2>
            
                <div>
                    {userAnimals.map((a, i) => <Badge key={i} animalName={a.animal.common_name} url={a.animal.photo}/>)}
                    <h3>Explore the Critter Club animal collection to earn more badges and level up:</h3>
                    <NavLink to="/animals/browse"><button>Browse All Animals</button></NavLink>
                    <NavLink to="/animals/search"><button>Search for an Animal</button></NavLink>
                </div> 
            </div>
             : 
            <div>
                <h3>Sign up for a free account to earn badges and level up:</h3>
                <NavLink to="/signup"><button>Join the Critter Club!</button></NavLink>    
            </div>}           

        </div>
    )
}