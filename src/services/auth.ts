import {
    getAuth,
    signOut,
    deleteUser,
    GoogleAuthProvider,
    signInWithPopup,
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