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
/** Dashboard provides personalized user information including badges earned, current points, and level achieved */

export function Dashboard() {
    
    const currentUser = useContext(UserContext);
    const [userAnimals, setUserAnimals] = useState([]);
    const [level, setLevel] = useState('Observer');
    const [badge, setBadge] = useState("badge");
    const [noBadges, setNoBadges] = useState(false);
    
console.log(level);

console.log(currentUser);

/** In this function:
 * - userBadges is an array of animal names as a property of the user object;
 * 
 * - We use each of these names to get the animal object from our usersAPI; this provides the path for the badge image;
 * 
 * - We add each animal object and name to userAnimals;
 * 
 * - Updates the user level based on current points;
 * 
 */
    useEffect(() => {
        async function getBadges() {
            if (currentUser) {       
                const userBadges = currentUser.user.userBadges;

                // for development, apply all badges;
                // delete these and uncomment above to restore accurate userBadges
                // const userBadges =[
                //     'Adelie Penguin', 
                //     'Agama Lizard',
                //     'Albatross',
                //     'Alligator',
                //     'Alpaca',
                //     'Arctic Fox',
                //     'Assassin Bug',
                //     'Axolotl',
                //     'Baboon',
                //     'Bald Eagle',
                //     'Banana Ball Python',
                //     'Barn Owl',
                //     'Bearded Vulture',
                //     'Beaver',
                //     'Bee',
                //     'Bengal Tiger',
                //     'Bison',
                //     'Black Rhinoceros',
                //     'Black-Footed Ferret',
                //     'Blue-Ringed Octopus',
                //     'Bobcat',
                //     'Box Turtle',
                //     'Burrowing Owl',
                //     'Camel',
                //     'Caribou',
                //     'Cheetah',
                //     'Clownfish',
                //     'Coral Snake',
                //     'Crocodile',
                //     'Deer',
                //     'Desert Tortoise',
                //     'Dingo',
                //     'Dolphin',
                //     'Dragonfly',
                //     'Earthworm',
                //     'Eel',
                //     'Elephant',
                //     'Elephant Seal',
                //     'Elk',
                //     'Emu',
                //     'Flamingo',
                //     'Flounder',
                //     'Fox',
                //     'Frog',
                //     'Fruit Bat',
                //     'Galapagos Tortoise',
                //     'Gazelle',
                //     'Gecko',
                //     'Giraffe',
                //     'Glass Frog',
                //     'Golden Lion Tamarin',
                //     'Gorilla',
                //     'Hammerhead Shark',
                //     'Hawaiian Goose',
                //     'Heron',
                //     'Hippopotamus',
                //     'Howler Monkey',
                //     'Hummingbird',
                //     'Humpback Whale',
                //     'Ibex',
                //     'Ibis',
                //     'Iguana',
                //     'Impala',
                //     'Jackrabbit',
                //     'Jackson’s Chameleon',
                //     'Jaguar',
                //     'Jellyfish',
                //     'Kangaroo',
                //     'Kestrel',
                //     'King Cobra',
                //     'Kingfisher',
                //     'Kiwi',
                //     'Koala',
                //     'Komodo Dragon',
                //     'Ladybug',
                //     'Leatherback Sea Turtle',
                //     'Lemur',
                //     'Leopard',
                //     'Lion',
                //     'Llama',
                //     'Lobster',
                //     'Macaque',
                //     'Macaroni Penguin',
                //     'Manatee',
                //     'Manta Ray',
                //     'Marmot',
                //     'Moose',
                //     'Narwhal',
                //     'North American Black Bear',
                //     'Northern Cardinal',
                //     'Nudibranch',
                //     'Numbat',
                //     'Octopus',
                //     'Orang-utan',
                //     'Ostrich',
                //     'Otter',
                //     'Oyster',
                //     'Painted Turtle',
                //     'Panther',
                //     'Parrotfish',
                //     'Platypus',
                //     'Polar Bear',
                //     'Porcupine',
                //     'Proboscis Monkey',
                //     'Quetzal',
                //     'Quokka',
                //     'Rabbit',
                //     'Red Panda',
                //     'Reef Shark',
                //     'Robin',
                //     'Roseate Spoonbill',
                //     'Salamander',
                //     'Scarlet Macaw',
                //     'Sea Anemone',
                //     'Sea Dragon',
                //     'Seahorse',
                //     'Skunk',
                //     'Sloth',
                //     'Squid',
                //     'Stork',
                //     'Tapir',
                //     'Tiger',
                //     'Tiger Shark',
                //     'Tree Frog',
                //     'Tropicbird',
                //     'Uakari',
                //     'Umbrellabird',
                //     'Vervet Monkey',
                //     'Vicuña',
                //     'Vulture',
                //     'Walrus',
                //     'Warthog',
                //     'Whale Shark',
                //     'White-Faced Capuchin',
                //     'Wolf',
                //     'X-Ray Tetra',
                //     'Xerus',
                //     'Yak',
                //     'Yellow Anaconda',
                //     'Yellowfin Tuna',
                //     'Zebra',
                //     'Zebra Finch',
                //     'Zebra Mussels',
                //     'Zebu',
                //                     ]
                console.log("USER BADGES:", userBadges)
                let animal;
                const animals = [];
                for (let animalName of userBadges) {  
                    console.log(animalName);              
                    animal = await usersAPI.getAnimal(animalName);
                    if (animal) {
                        animals.push({ animalName, ...animal });
                    }
                }
                console.log(animals);
                setUserAnimals(animals);

                for (let level in levels) { 
                    level = +level;
                    if (currentUser.user.points > level) {
                        setLevel(levels[level])
                    }
                }
                if (currentUser.user.userBadges.length > 1)
                    setBadge("badges");
                if (currentUser.user.userBadges.length === 0)
                    setNoBadges(true);
            }        
        }
        getBadges();
    }, [currentUser]);

console.log("USER ANIMALS:", userAnimals);

    return (
        <div>
            { currentUser ?   
            <div>            
            <h1>Hello, {currentUser.user.username}!</h1>
            <p>You're a Critter Club {level}!</p>
            <table><caption>Critter Club Levels</caption>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Observer</td>
                        <td>0 - 99</td>
                    </tr>
                    <tr>
                        <td>Explorer</td>
                        <td>100 - 499</td>
                    </tr>
                    <tr>
                        <td>Adventurer</td>
                        <td>500 - 999</td>
                    </tr>
                    <tr>
                        <td>Naturalist</td>
                        <td>1000 - 2499</td>
                    </tr>
                    <tr>
                        <td>Ecologist</td>
                        <td>2500 - 4999</td>
                    </tr>
                    <tr>
                        <td>Zoologist</td>
                        <td>5000 +</td>
                    </tr>
                </tbody>
            </table>
            {noBadges ? <p>You don't have any badges yet. Let's get started!</p> 
            :
            <p>You've collected {currentUser.user.userBadges.length} {badge} so far and you have {currentUser.user.points} points!</p>}        
            <div>
                {userAnimals.map((a, i) => <Badge key={i} animalName={a.animalName} url={a.animal.photo}/>)}
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