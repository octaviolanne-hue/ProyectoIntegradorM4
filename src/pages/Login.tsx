import { Link } from "react-router-dom";

function Login() {
    return (
        <main className="auth-page">
            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <img src="/logo.png" alt="Taskify" />
                    <span>Taskify</span>
                </Link>
                <div className="auth-content">
                    <h1>Iniciar sesión</h1>
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
                        <button type="submit" className="auth-button">
                            Iniciar sesión
                        </button>
                    </form>
                    <p className="auth-footer">
                        ¿No tenés una cuenta?{" "}
                        <Link to="/register">
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
