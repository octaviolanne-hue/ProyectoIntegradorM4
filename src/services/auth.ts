import { getAuth, signOut } from "firebase/auth";
import app from "./firebase";

export const auth = getAuth(app);

export const logout = () => signOut(auth);