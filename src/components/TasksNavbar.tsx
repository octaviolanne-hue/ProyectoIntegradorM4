import { Link } from "react-router-dom";

function TasksNavbar() {
    return (
        <header className="tasks-navbar">
            <Link to="/tasks" className="logo">
                <img
                    src="/logo.png"
                    alt="Taskify"
                />

                <span>
                    Taskify
                </span>
            </Link>

            <Link
                to="/info"
                className="info-button"
                aria-label="Información sobre Taskify"
            >
                ⓘ
            </Link>
        </header>
    );
}

export default TasksNavbar;