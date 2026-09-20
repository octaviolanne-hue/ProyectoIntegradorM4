import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./firestore";
import { auth } from "./auth";
import type { Task } from "../types/task";


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

export const updateTask = async (
    taskId: string,
    title: string,
    description: string,
    completed: boolean
) => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }
    const userId = auth.currentUser.uid;
    const taskRef = doc(
        db,
        "users",
        userId,
        "tasks",
        taskId
    );
    await updateDoc(taskRef, {
        title,
        description,
        completed,
    });
};
export const deleteTask = async (taskId: string) => {
    if (!auth.currentUser) {
        throw new Error("No hay un usuario autenticado.");
    }

    const userId = auth.currentUser.uid;

    const taskRef = doc(
        db,
        "users",
        userId,
        "tasks",
        taskId
    );

    await deleteDoc(taskRef);
};