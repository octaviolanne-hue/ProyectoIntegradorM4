import { useEffect, useState } from "react";
import type React from "react";

import { useAuth } from "../features/AuthContext";

import {
    deleteAccount,
    logout,
} from "../services/auth";

import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../services/tasks";

import type { Task } from "../types/task";

import TasksNavbar from "../components/TasksNavbar";
import TaskLibrary from "../components/TaskLibrary";
import TaskDetails from "../components/TaskDetails";
import UserPanel from "../components/UserPanel";

import { sendTaskSummary } from "../services/email";


function Tasks() {
    const { user } = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [isSendingSummary, setIsSendingSummary] = useState(false);
    const [summaryMessage, setSummaryMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    // Cargar tareas al entrar a la página
    useEffect(() => {
        const loadTasks = async () => {
            setErrorMessage("");

            try {
                const loadedTasks = await getTasks();

                setTasks(loadedTasks);

                if (loadedTasks.length > 0) {
                    setSelectedTask(loadedTasks[0]);
                }
            } catch (error) {
                console.error(
                    "Error al cargar las tareas:",
                    error
                );

                setErrorMessage(
                    "No se pudieron cargar las tareas."
                );
            }
        };

        loadTasks();
    }, []);


    // Crear o editar tarea
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setErrorMessage("");

        try {
            if (isEditing && selectedTask) {
                await updateTask(
                    selectedTask.id,
                    title,
                    description,
                    selectedTask.completed
                );

                const updatedTasks = await getTasks();

                setTasks(updatedTasks);

                const updatedSelectedTask = updatedTasks.find(
                    (task) => task.id === selectedTask.id
                );

                setSelectedTask(
                    updatedSelectedTask ?? null
                );

            } else {
                await addTask(title, description);

                const updatedTasks = await getTasks();

                setTasks(updatedTasks);

                if (updatedTasks.length > 0) {
                    setSelectedTask(
                        updatedTasks[updatedTasks.length - 1]
                    );
                }
            }

            setTitle("");
            setDescription("");
            setShowForm(false);
            setIsEditing(false);

        } catch (error) {
            console.error(
                "Error al guardar la tarea:",
                error
            );

            setErrorMessage(
                "No se pudo guardar la tarea."
            );
        }
    };


    // Mostrar formulario para crear una tarea
    const handleNewTask = () => {
        setErrorMessage("");

        setTitle("");
        setDescription("");

        setIsEditing(false);
        setShowForm(true);
    };


    // Mostrar formulario para editar la tarea seleccionada
    const handleEditTask = () => {
        if (!selectedTask) {
            return;
        }

        setErrorMessage("");

        setTitle(selectedTask.title);
        setDescription(selectedTask.description);

        setIsEditing(true);
        setShowForm(true);
    };


    // Cancelar formulario
    const handleCancel = () => {
        setTitle("");
        setDescription("");

        setShowForm(false);
        setIsEditing(false);
    };


    // Marcar tarea como completada / pendiente
    const handleToggleComplete = async () => {
        if (!selectedTask) {
            return;
        }

        setErrorMessage("");

        const updatedTask = {
            ...selectedTask,
            completed: !selectedTask.completed,
        };

        try {
            await updateTask(
                selectedTask.id,
                selectedTask.title,
                selectedTask.description,
                updatedTask.completed
            );

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === selectedTask.id
                        ? updatedTask
                        : task
                )
            );

            setSelectedTask(updatedTask);

        } catch (error) {
            console.error(
                "Error al actualizar la tarea:",
                error
            );

            setErrorMessage(
                "No se pudo actualizar la tarea."
            );
        }
    };


    // Eliminar tarea
    const handleDeleteTask = async () => {
        if (!selectedTask) {
            return;
        }

        setErrorMessage("");

        try {
            await deleteTask(selectedTask.id);

            const remainingTasks = tasks.filter(
                (task) => task.id !== selectedTask.id
            );

            setTasks(remainingTasks);

            if (remainingTasks.length > 0) {
                setSelectedTask(remainingTasks[0]);
            } else {
                setSelectedTask(null);
            }

        } catch (error) {
            console.error(
                "Error al eliminar la tarea:",
                error
            );

            setErrorMessage(
                "No se pudo eliminar la tarea."
            );
        }
    };


    // Cerrar sesión
    const handleLogout = async () => {
        try {
            await logout();

        } catch (error) {
            console.error(
                "Error al cerrar sesión:",
                error
            );
        }
    };


    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "¿Estás seguro de que querés eliminar tu cuenta?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteAccount();

        } catch (error) {
            console.error(
                "Error al eliminar la cuenta:",
                error
            );
        }
    };


    // Estadísticas
    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingCount =
        tasks.length - completedCount;


    // Enviar resumen de tareas por email
    const handleSendSummary = async () => {
        if (!user?.email) {
            setSummaryMessage(
                "No hay un email asociado a tu cuenta."
            );

            return;
        }

        setIsSendingSummary(true);
        setSummaryMessage("");

        const summary = [
            "Resumen de tareas - Taskify",
            "",
            `Total: ${tasks.length}`,
            `Pendientes: ${pendingCount}`,
            `Completadas: ${completedCount}`,
            "",
            "Tareas:",
            ...tasks.map(
                (task) =>
                    `${task.completed ? "✓" : "○"} ${task.title}`
            ),
        ].join("\n");

        try {
            await sendTaskSummary(
                user.email,
                summary
            );

            setSummaryMessage(
                "✓ Resumen enviado"
            );

        } catch (error) {
            console.error(
                "Error al enviar resumen:",
                error
            );

            setSummaryMessage(
                "No se pudo enviar el resumen."
            );

        } finally {
            setIsSendingSummary(false);
        }
    };


    return (
        <main className="tasks-page">

            <TasksNavbar />

            <div className="tasks-layout">

                <TaskLibrary
                    tasks={tasks}
                    selectedTaskId={
                        selectedTask?.id ?? null
                    }
                    onSelectTask={(task) => {
                        setErrorMessage("");

                        setSelectedTask(task);
                        setShowForm(false);
                        setIsEditing(false);
                    }}
                />


                <TaskDetails
                    selectedTask={selectedTask}
                    showForm={showForm}
                    isEditing={isEditing}
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    onNewTask={handleNewTask}
                    onEditTask={handleEditTask}
                    onToggleComplete={
                        handleToggleComplete
                    }
                    onDeleteTask={
                        handleDeleteTask
                    }
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />


                <UserPanel
                    user={user}
                    tasksCount={tasks.length}
                    completedCount={completedCount}
                    pendingCount={pendingCount}
                    onLogout={handleLogout}
                    onDeleteAccount={
                        handleDeleteAccount
                    }
                    onSendSummary={
                        handleSendSummary
                    }
                    isSendingSummary={
                        isSendingSummary
                    }
                    summaryMessage={
                        summaryMessage
                    }
                />

            </div>

            {errorMessage && (
                <p className="task-error">
                    ⚠️ {errorMessage}
                </p>
            )}

        </main>
    );
}

export default Tasks;
