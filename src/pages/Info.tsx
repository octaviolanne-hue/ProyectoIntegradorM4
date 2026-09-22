import { Link } from "react-router-dom";

function Info() {
    return (
        <main className="info-page">
            <header className="info-header">
                <Link to="/tasks" className="info-home-button">
                    ← Inicio
                </Link>
            </header>

            <section className="info-content">
                <img
                    src="/logo.png"
                    alt="Taskify"
                    className="info-logo"
                />

                <p className="info-label">
                    SOBRE TASKIFY
                </p>

                <h1>
                    Taskify
                </h1>

                <p className="info-description">
                    Una aplicación simple y moderna para organizar,
                    administrar y realizar un seguimiento de tus tareas.
                </p>

                <div className="info-section">
                    <h2>
                        ¿Qué podés hacer?
                    </h2>

                    <p>
                        Crear, editar, completar y eliminar tareas
                        desde un solo lugar.
                    </p>
                </div>

                <div className="info-section">
                    <h2>
                        Tecnologías
                    </h2>

                    <p>
                        React · TypeScript · Firebase · Firestore
                    </p>
                </div>

                <p className="info-version">
                    Versión 1.0
                </p>
            </section>
        </main>
    );
}

export default Info;