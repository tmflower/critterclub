import { NavLink } from "react-router-dom";

export function Navbar({ logout }) {
    return (
        <div>
            <nav>
                <NavLink className="navbar-link" exact="true" end>Home</NavLink>
                <NavLink className="navbar-link" exact="true" to="/dashboard" end>Dashboard</NavLink>
                <NavLink className="navbar-link" exact="true" to="/animals/browse" end>Browse</NavLink>
                <NavLink className="navbar-link" exact="true" to="/animals/search" end>Search</NavLink>
                <NavLink className="navbar-link" exact="true" to="/login" end>Login</NavLink>
                <NavLink className="navbar-link" exact="true" to="/signup" end>Signup</NavLink>
                <NavLink className="navbar-link" exact="true" to="/parent" end>Parent Signup</NavLink>
                <NavLink className="navbar-link" exact="true" to="/" onClick={logout} end>Logout</NavLink>
            </nav>
        </div>
    )
}