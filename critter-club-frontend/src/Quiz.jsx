import { useState, useEffect } from 'react';
import AnimalsAPI from './api/animalsAPI';


export function Quiz() {

    const [animal, setAnimal] = useState(null);
    const [commonName, setCommonName] = useState("");
    // habitat data is too messy for quiz; remove from here but leave in animal info/card
    // const [habitat, setHabitat] = useState("");
    const [phylum, setPhylum] = useState("");
    const [taxClass, setTaxClass] = useState("");
    const [locations, setLocations] = useState([]);
    const [diet, setDiet] = useState("");
    // const [photo, setPhoto] = useState("");
    
    // Where will points come into play?
    const animalName = localStorage.getItem("animal");

    useEffect(() => {
        async function getAnimal() {
            setAnimal(await AnimalsAPI.getSingleAnimal(animalName))
        }
        getAnimal();
    }, [animalName])

    useEffect(() => {
        if (animal) {       
            setCommonName(animal.name);
            // setGroup(animal.characteristics.group);
            setPhylum(animal.taxonomy.phylum);
            // setHabitat(animal.characteristics.habitat);
            setLocations(animal.locations.map(location => location.replace(/[^a-z]/gi, "")));
            setDiet(animal.characteristics.diet);
            setTaxClass(animal.taxonomy.class);
        }
    }, [animal])

    // console.log("class", taxClass)

    if (taxClass === "Sarcopterygii" || taxClass === "Actinopterygii" || taxClass === "Chondrichthyes") {
        setTaxClass("Fish");
    }

    const validLocations = [ 
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "NorthAmerica",
        "Eurasia",
        "Ocean",
        "CentralAmerica",
        "SouthAmerica",
        "Oceania"
   ];

    const initialState = { 
        vertebrateGroup: '', 
        animalDiet: '',
        Africa: false,
        Antarctica: false,
        Asia: false,
        Europe: false,
        NorthAmerica: false,
        Eurasia: false,
        Ocean: false,
        CentralAmerica: false,
        SouthAmerica: false,
        Oceania: false
    }

    const [formData, setFormData] = useState(initialState);
    const { 
        vertebrateGroup, 
        animalDiet, 
        Africa, 
        Antarctica, 
        Asia,
        Europe,
        NorthAmerica,
        Eurasia,
        Ocean,
        CentralAmerica,
        SouthAmerica,
        Oceania
    } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
		setFormData((formData) => 
            ({ ...formData, [name]: type === "checkbox" ? checked : value }));
    }

    // problem with checking answers when one question set is excluded. Can submit each separately or figure out how to evaluate conditionally
    const handleSubmit = (e) => {
        e.preventDefault();
        let userLocationChoices = [];
        for (let validLocation of validLocations) {
            if (formData[validLocation] === true) {
                userLocationChoices.push(validLocation);
            }
        }
        if (userLocationChoices.length !== locations.length) {
            console.log("No on locations--length!!! 😫😫😫")
        }
        userLocationChoices.sort();
        console.log("userLocationChoices:", userLocationChoices);
        console.log("locations:", locations)
        let pointer1 = 0;
        let pointer2 = 0
        while (pointer1 < userLocationChoices.length) {            
            if (userLocationChoices[pointer1] !== locations[pointer2]) {
                console.log("No on locations--accuracy!!! 😫😫😫");
                break;
            }
            else if (userLocationChoices[pointer1] === locations[pointer2]) {
                pointer1++;
                pointer2++;
            }
            // currently this runs for each correct response; is that what we want?
            console.log("YOU ARE CORRECT---locations!!! 😀😀😀") 
        }
       
        console.log(formData)

        if (vertebrateGroup === taxClass && animalDiet === diet) {
            console.log("YOU ARE CORRECT---class and diet!!! 😀😀😀");
        }
        else console.log("SORRY, NOT THIS TIME--class and diet!!! 😫😫😫");     
    }
    // console.log(animal);
    // console.log(locations);
    // console.log(validLocations);
    
    const handleReset = () => {
        setFormData(initialState);
    }




    return (
        <div>
            <h1>Take the {commonName.toUpperCase()} challenge!</h1>
            <form onSubmit={handleSubmit}>
                
                {phylum === "Chordata" ?                
                <div>
                    <fieldset>
                        <legend>What taxonomic class does the {commonName.toLowerCase()} belong to?</legend>
                        <label>
                            <input 
                                type="radio"
                                name="vertebrateGroup"
                                value="Amphibia"
                                onChange={handleChange}
                                checked={vertebrateGroup === "Amphibia"}
                                >
                            </input>
                            Amphibians
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="vertebrateGroup"
                                value="Aves"
                                onChange={handleChange}
                                checked={vertebrateGroup === "Aves"}
                                >
                            </input>
                            Birds
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="vertebrateGroup"
                                value="Mammalia"
                                onChange={handleChange}
                                checked={vertebrateGroup === "Mammalia"}
                                >
                            </input>
                            Mammals
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="vertebrateGroup"
                                value="Reptilia"
                                onChange={handleChange}
                                checked={vertebrateGroup === "Reptilia"}
                                >
                            </input>
                            Reptiles
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="vertebrateGroup"
                                value="Fish"
                                onChange={handleChange}
                                checked={vertebrateGroup === "Fish"}
                                >
                            </input>
                            Fish
                        </label>
                    </fieldset>
                </div>

                : null }

                <fieldset>
                    <legend>Which term best describe's the {commonName.toLowerCase()}'s diet'?</legend>
                    <label>
                        <input 
                            type="radio"
                            name="animalDiet"
                            value="Carnivore"
                            onChange={handleChange}
                            >
                        </input>
                        Carnivore
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="animalDiet"
                            value="Herbivore"
                            onChange={handleChange}
                            >
                        </input>
                        Herbivore
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="animalDiet"
                            value="Omnivore"
                            onChange={handleChange}
                            >
                        </input>
                        Omnivore
                    </label>
                </fieldset>

                {validLocations.includes(locations[0]) ? 
                <div>
                    <fieldset>
                        <legend>In which location or locations can {commonName.toLowerCase()} be found?
                        </legend>
                        <label>
                            <input
                                type="checkbox"
                                id="Africa"
                                name="Africa"
                                checked={Africa}
                                onChange={handleChange}
                            ></input>
                            Africa
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Antarctica"
                                name="Antarctica"
                                checked={Antarctica}
                                onChange={handleChange}
                            ></input>
                            Antarctica
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Asia"
                                name="Asia"
                                checked={Asia}
                                onChange={handleChange}
                            ></input>
                            Asia
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Europe"
                                name="Europe"
                                checked={Europe}
                                onChange={handleChange}
                            ></input>
                            Europe
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="NorthAmerica"
                                name="NorthAmerica"
                                checked={NorthAmerica}
                                onChange={handleChange}
                            ></input>
                            North America
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Eurasia"
                                name="Eurasia"
                                checked={Eurasia}
                                onChange={handleChange}
                            ></input>
                            Eurasia
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Ocean"
                                name="Ocean"
                                checked={Ocean}
                                onChange={handleChange}
                            ></input>
                            Ocean
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="CentralAmerica"
                                name="CentralAmerica"
                                checked={CentralAmerica}
                                onChange={handleChange}
                            ></input>
                            Central America
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="SouthAmerica"
                                name="SouthAmerica"
                                checked={SouthAmerica}
                                onChange={handleChange}
                            ></input>
                            South America
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="Oceania"
                                name="Oceania"
                                checked={Oceania}
                                onChange={handleChange}
                            ></input>
                            Oceania
                        </label>
                    </fieldset>
                </div> 
                : null}

                {/* add a bonus question of scientific name with text input */}
                
                <button type="submit">Submit</button>
                <button type="reset" onClick={handleReset}>Reset</button>
            </form>
        </div>
    )
}

/**
 * Functions to access data by category
 */
    /////////////////////////////////////////////////////////////////////
                // const [taxClasses, setTaxClasses] = useState([])
                // useEffect(() => {
                //     async function getClasses() {
                //         setTaxClasses(await AnimalsAPI.getTaxClasses());
                //     }
                //     getClasses()
                // }, []);
                // console.log(taxClasses)
    /////////////////////////////////////////////////////////////////////
    // Chondrichthyes: cartilagenous fish
    // Actinopterygii: ray-finned fish (bony)
    // Sarcopterygii: lobe-finned fish (bony)

    /////////////////////////////////////////////////////////////////////
                // const [allLocations, setAllLocations] = useState([]);
                // useEffect(() => {
                //     async function getAllLocations() {
                //         setAllLocations(await AnimalsAPI.getLocations());
                //     }
                //     getAllLocations();
                // }, []);

                // console.log(allLocations)
    /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////
                // const [allHabitats, setAllHabitats] = useState([]);
                // useEffect(() => {
                //     async function getAllHabitats() {
                //         setAllHabitats(await AnimalsAPI.getHabitats());
                //     }
                //     getAllHabitats();
                // }, []);

                // console.log(allHabitats)
    /////////////////////////////////////////////////////////////////////