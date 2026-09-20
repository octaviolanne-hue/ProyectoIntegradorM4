import { useEffect, useState } from "react";
import { useAuth } from "../features/AuthContext";
import { deleteAccount, logout } from "../services/auth";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../services/tasks";
import type { Task } from "../types/task";

function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasksFromFirebase = await getTasks();

                setTasks(tasksFromFirebase);

                if (tasksFromFirebase.length > 0) {
                    setSelectedTask(tasksFromFirebase[0]);
                }
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
            }
        };

        loadTasks();
    }, []);

    const handleSubmitTask = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isEditing) {
            if (!selectedTask) {
                return;
            }

            await updateTask(
                selectedTask.id,
                title,
                description,
                selectedTask.completed
            );

            const updatedTask: Task = {
                ...selectedTask,
                title,
                description,
            };

            setTasks(
                tasks.map((task) =>
                    task.id === selectedTask.id
                        ? updatedTask
                        : task
                )
            );

            setSelectedTask(updatedTask);
        } else {
            await addTask(title, description);

            const tasksFromFirebase = await getTasks();

            setTasks(tasksFromFirebase);

            const newTask =
                tasksFromFirebase[tasksFromFirebase.length - 1];

            if (newTask) {
                setSelectedTask(newTask);
            }
        }

        setTitle("");
        setDescription("");
        setShowForm(false);
        setIsEditing(false);
    };

    const handleDeleteTask = async () => {
        if (!selectedTask) {
            return;
        }

        const confirmed = window.confirm(
            `¿Querés eliminar "${selectedTask.title}"?`
        );

        if (!confirmed) {
            return;
        }

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
            console.error("Error al eliminar la tarea:", error);

            window.alert(
                "No se pudo eliminar la tarea."
            );
        }
    };
    const handleToggleComplete = async () => {
        if (!selectedTask) {
            return;
        }

        const updatedTask: Task = {
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

            setTasks(
                tasks.map((task) =>
                    task.id === selectedTask.id
                        ? updatedTask
                        : task
                )
            );

            setSelectedTask(updatedTask);
        } catch (error) {
            console.error(
                "Error al actualizar el estado de la tarea:",
                error
            );

            window.alert(
                "No se pudo actualizar el estado de la tarea."
            );
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) {
            return;
        }

        const confirmed = window.confirm(
            "¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteAccount();
        } catch (error) {
            console.error(error);

            window.alert(
                "No se pudo eliminar la cuenta. Es posible que Firebase requiera que vuelvas a iniciar sesión."
            );
        }
    };

    return (
        <main className="tasks-page">

            {/* NAVBAR */}
            <nav className="tasks-navbar">
                <div className="tasks-logo">
                    <img src="/logo.png" alt="Taskify" />
                    <span>Taskify</span>
                </div>

                <button className="home-button">
                    🏠
                    <span>Home</span>
                </button>

                <button className="user-button">
                    👤
                </button>
            </nav>

            {/* CONTENIDO PRINCIPAL */}
            <section className="tasks-layout">

                {/* BIBLIOTECA */}
                <aside className="tasks-library">
                    <h2>Tu biblioteca</h2>

                    <div className="task-list">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                className="task-item"
                                onClick={() => setSelectedTask(task)}
                            >
                                <span>
                                    {task.completed ? "✓" : "○"}
                                </span>

                                <span>
                                    {task.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* DETALLE DE TAREA */}
                <section className="task-details">
                    {!showForm ? (
                        selectedTask ? (
                            <>
                                <p className="task-details-label">
                                    TAREA SELECCIONADA
                                </p>

                                <h1>
                                    {selectedTask.title}
                                </h1>

                                <p className="task-description">
                                    {selectedTask.description}
                                </p>

                                <div className="task-status">
                                    <span>
                                        Estado
                                    </span>

                                    <strong>
                                        {selectedTask.completed
                                            ? "✓ Completada"
                                            : "○ Pendiente"}
                                    </strong>
                                </div>

                                <div className="task-actions">
                                    <button
                                        className="new-task-button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setTitle("");
                                            setDescription("");
                                            setShowForm(true);
                                        }}
                                    >
                                        + Nueva tarea
                                    </button>

                                    <button
                                        className="edit-task-button"
                                        onClick={() => {
                                            setIsEditing(true);
                                            setTitle(selectedTask.title);
                                            setDescription(
                                                selectedTask.description
                                            );
                                            setShowForm(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className={
                                            selectedTask.completed
                                                ? "complete-task-button completed"
                                                : "complete-task-button"
                                        }
                                        onClick={handleToggleComplete}
                                    >
                                        {selectedTask.completed
                                            ? "✓ Completada"
                                            : "✓ Marcar como completada"}
                                    </button>

                                    <button
                                        className="delete-task-button"
                                        onClick={handleDeleteTask}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="empty-tasks">
                                <p>No hay tareas para mostrar.</p>

                                <button
                                    className="new-task-button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setTitle("");
                                        setDescription("");
                                        setShowForm(true);
                                    }}
                                >
                                    + Nueva tarea
                                </button>
                            </div>
                        )
                    ) : (
                        <form
                            className="task-form"
                            onSubmit={handleSubmitTask}
                        >
                            <p className="task-details-label">
                                {isEditing
                                    ? "EDITAR TAREA"
                                    : "NUEVA TAREA"}
                            </p>

                            <h1>
                                {isEditing
                                    ? "Editar tarea"
                                    : "Crear tarea"}
                            </h1>

                            <div className="form-group">
                                <label htmlFor="task-title">
                                    Título
                                </label>

                                <input
                                    type="text"
                                    id="task-title"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    placeholder="Ej: Estudiar TypeScript"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="task-description">
                                    Descripción
                                </label>

                                <textarea
                                    id="task-description"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    placeholder="Describe la tarea..."
                                    rows={5}
                                    required
                                />
                            </div>

                            <div className="task-actions">
                                <button
                                    type="submit"
                                    className="new-task-button"
                                >
                                    {isEditing
                                        ? "Guardar cambios"
                                        : "Crear tarea"}
                                </button>

                                <button
                                    type="button"
                                    className="edit-task-button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </section>

                {/* PERFIL */}
                <aside className="user-panel">
                    <div className="user-avatar">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={
                                    user.displayName ||
                                    "Usuario"
                                }
                            />
                        ) : (
                            "👤"
                        )}
                    </div>

                    <h2>
                        Hola, {user?.displayName}!
                    </h2>

                    <p className="user-email">
                        {user?.email}
                    </p>

                    <div className="user-stats">
                        <div>
                            <strong>
                                {tasks.length}
                            </strong>

                            <span>
                                Tareas
                            </span>
                        </div>

                        <div>
                            <strong>
                                {
                                    tasks.filter(
                                        (task) =>
                                            task.completed
                                    ).length
                                }
                            </strong>

                            <span>
                                Completadas
                            </span>
                        </div>

                        <div>
                            <strong>
                                {
                                    tasks.filter(
                                        (task) =>
                                            !task.completed
                                    ).length
                                }
                            </strong>

                            <span>
                                Pendientes
                            </span>
                        </div>
                    </div>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>

                    <button
                        className="delete-account-button"
                        onClick={handleDeleteAccount}
                    >
                        Eliminar cuenta
                    </button>
                </aside>
            </section>
        </main>
    );
}

export default Tasks;