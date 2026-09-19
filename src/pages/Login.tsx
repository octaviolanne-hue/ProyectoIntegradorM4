import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/auth";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            navigate("/tasks");
        } catch (error) {
            setError("El email o la contraseña son incorrectos.");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <img src="/logo.png" alt="Taskify" />
                    <span>Taskify</span>
                </Link>

                <div className="auth-content">
                    <h1>Iniciar sesión</h1>

                    <form
                        className="auth-form"
                        onSubmit={handleLogin}
                    >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                        </div>

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                        >
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