import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";
import type { Task } from "../types/task";
import { db } from "./firestore";
import { auth } from "./auth";

export const getTasks = async (): Promise<Task[]> => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }

    const userId = auth.currentUser.uid;

    const tasksRef = collection(
        db,
        "users",
        userId,
        "tasks"
    );

    const snapshot = await getDocs(tasksRef);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Task[];
};
export const addTask = async (
    title: string,
    description: string
) => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }

    const userId = auth.currentUser.uid;

    const tasksRef = collection(
        db,
        "users",
        userId,
        "tasks"
    );

    await addDoc(tasksRef, {
        title,
        description,
        completed: false,
        createdAt: new Date(),
    });
};