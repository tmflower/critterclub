export function Badge({ animalName, url }) {
    return (
        <div style={{width:200, height:200, backgroundColor:'white', color:'black', margin:'10px'}}>{animalName}
            <img src={url} alt="critter" style={{ maxWidth: 130, maxHeight: 130, display: 'inline-block' }}/>
        </div>
    )
}