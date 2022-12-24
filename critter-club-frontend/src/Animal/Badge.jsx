export function Badge({ animalName, url }) {
    return (
        <div style={{width:200, height:200, backgroundColor:'white', color:'black', margin:'10px'}}>{animalName}
            <img src={url} alt="critter" style={{ height:150 }}/>
        </div>
    )
}