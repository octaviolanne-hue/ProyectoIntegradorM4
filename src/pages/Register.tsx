import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../services/auth";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(userCredential.user, {
                displayName: name,
            });

            navigate("/tasks");
        } catch (error) {
            setError("No se pudo crear la cuenta.");
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
                    <h1>Crear cuenta</h1>

                    <form
                        className="auth-form"
                        onSubmit={handleRegister}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                required
                            />
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirmar contraseña
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Repetí tu contraseña"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
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