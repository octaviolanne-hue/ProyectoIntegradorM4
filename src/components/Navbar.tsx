import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            {" | "}
            <Link to="/tasks">Task</Link>
            {" | "}
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/register">Register</Link>
        </nav>

    );
}

export default Navbar;
