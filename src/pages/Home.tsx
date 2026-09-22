import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home">
            <header className="home-header">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Taskify" />
                    <span>Taskify</span>
                </Link>

                <div className="home-header-actions">
                    <Link
                        to="/info"
                        className="info-button"
                        aria-label="Información sobre Taskify"
                    >
                        ⓘ
                    </Link>

                    <Link
                        to="/login"
                        className="login-link"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <p className="hero-label">
                        ORGANIZÁ TU DÍA
                    </p>

                    <h1>
                        Tus tareas.
                        <br />
                        Tu día.
                        <br />
                        Bajo control.
                    </h1>

                    <p className="hero-description">
                        Gestioná tus tareas de forma simple, organizada
                        y accesible desde cualquier dispositivo.
                    </p>

                    <Link
                        to="/register"
                        className="hero-button"
                    >
                        Crear cuenta
                    </Link>
                </div>

                <div className="hero-logo">
                    <img
                        src="/logo.png"
                        alt="Taskify"
                    />
                </div>
            </section>
        </main>
    );
}

export default Home;