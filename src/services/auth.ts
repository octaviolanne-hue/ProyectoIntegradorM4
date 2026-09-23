import {
    getAuth,
    signOut,
    deleteUser,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";

import app from "./firebase";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const logout = () => signOut(auth);

export const deleteAccount = () => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }

    return deleteUser(auth.currentUser);
};

export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

export const loginWithEmail = (
    email: string,
    password: string
) => {
    return signInWithEmailAndPassword(
        auth,
        email,
        password
    );
};

export const getAuthErrorMessage = (
    error: unknown
): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
    ) {
        const code = (error as { code: string }).code;

        switch (code) {
            case "auth/invalid-credential":
                return "El email o la contraseña son incorrectos.";

            case "auth/user-not-found":
                return "No existe una cuenta con este email.";

            case "auth/wrong-password":
                return "La contraseña es incorrecta.";

            case "auth/invalid-email":
                return "El email no tiene un formato válido.";

            case "auth/too-many-requests":
                return "Demasiados intentos. Intentá nuevamente más tarde.";

            case "auth/popup-closed-by-user":
                return "Se cerró la ventana de inicio de sesión.";

            case "auth/popup-blocked":
                return "El navegador bloqueó la ventana de Google.";

            case "auth/network-request-failed":
                return "No hay conexión con el servidor.";

            default:
                return "No se pudo iniciar sesión. Intentá nuevamente.";
        }
    }

    return "Ocurrió un error inesperado.";
};
