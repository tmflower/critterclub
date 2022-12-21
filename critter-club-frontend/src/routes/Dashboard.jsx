import { NavLink } from "react-router-dom";

export function Dashboard() {

    return (
        <div>
            <h1>Hello, [currentUser], you're a Critter Club [level]!</h1>
            <h2>You've collected [number] badges so far!</h2>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <div style={{width:200, height:200, backgroundColor:'white', color:'black', display:'inline-block', margin:'10px'}}>Animal badge</div>
            <h3>Explore the Critter Club animal collection to earn more badges and level up:</h3>
            <NavLink to="/animals/browse"><button>Browse All Animals</button></NavLink>
            <NavLink to="/animals/search"><button>Search for an Animal</button></NavLink>
        </div>
    )
}