import { Link } from "react-router-dom";

function Register() {
    return (
        <main className="auth-page">
            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <img src="/logo.png" alt="Taskify" />
                    <span>Taskify</span>
                </Link>
                <div className="auth-content">
                    <h1>Crear cuenta</h1>
                    <form className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Tu email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Tu contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repetí tu contraseña"
                            />
                        </div>
                        <button type="submit" className="auth-button">
                            Crear cuenta
                        </button>
                    </form>
                    <p className="auth-footer">
                        ¿Ya tenés una cuenta?{" "}
                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Register;
