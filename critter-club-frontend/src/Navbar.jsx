import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./userContext";

export function Navbar({ logout }) {
    
    const currentUser = useContext(UserContext);
    
    return (
        <div>
            <nav>
                {currentUser ?
                <div>
                    <NavLink className="navbar-link" exact="true" to="/dashboard" end>Dashboard</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/animals/browse" end>Browse</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/animals/search" end>Search</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/" onClick={logout} end>Logout</NavLink>
                </div>          
                :
                <div>
                    <NavLink className="navbar-link" exact="true" to="/" end>Home</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/login" end>Login</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/signup" end>Signup</NavLink>
                    <NavLink className="navbar-link" exact="true" to="/parent" end>Parent Page</NavLink>
                </div>
                }
            </nav>
        </div>
    )
}