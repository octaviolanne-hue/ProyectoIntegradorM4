import {
    getAuth,
    signOut,
    deleteUser,
} from "firebase/auth";

import app from "./firebase";

export const auth = getAuth(app);

export const logout = () => signOut(auth);

export const deleteAccount = () => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }

    return deleteUser(auth.currentUser);
};