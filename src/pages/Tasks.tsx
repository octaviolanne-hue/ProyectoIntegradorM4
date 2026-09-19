import { useState } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Estudiar React",
        description:
            "Repasar componentes, props y React Router para continuar con el proyecto Taskify.",
        completed: false,
    },
    {
        id: 2,
        title: "Crear proyecto",
        description:
            "Crear la estructura inicial del proyecto Taskify.",
        completed: false,
    },
    {
        id: 3,
        title: "Terminar ejercicio",
        description:
            "Completar el ejercicio de React Router de Henry.",
        completed: true,
    },
    {
        id: 4,
        title: "Leer documentación",
        description:
            "Leer la documentación oficial de React para reforzar conceptos.",
        completed: false,
    },
];

function Tasks() {

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const [selectedTask, setSelectedTask] = useState<Task>(initialTasks[0]);

    const [showForm, setShowForm] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");


    const handleSubmitTask = (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        if (isEditing) {

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

            const newTask: Task = {
                id: Date.now(),
                title,
                description,
                completed: false,
            };

            setTasks([...tasks, newTask]);

            setSelectedTask(newTask);
        }

        setTitle("");
        setDescription("");
        setShowForm(false);
        setIsEditing(false);
    };

    const handleDeleteTask = () => {

        const confirmed = window.confirm(
            `¿Querés eliminar "${selectedTask.title}"?`
        );

        if (!confirmed) {
            return;
        }

        const remainingTasks = tasks.filter(
            (task) => task.id !== selectedTask.id
        );

        setTasks(remainingTasks);

        if (remainingTasks.length > 0) {
            setSelectedTask(remainingTasks[0]);
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
                                        setDescription(selectedTask.description);
                                        setShowForm(true);
                                    }}
                                >
                                    Editar
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

                        <form
                            className="task-form"
                            onSubmit={handleSubmitTask}
                        >
                            <p className="task-details-label">
                                {isEditing ? "EDITAR TAREA" : "NUEVA TAREA"}
                            </p>
                            <h1>
                                {isEditing ? "Editar tarea" : "Crear tarea"}
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
                                    {isEditing ? "Guardar cambios" : "Crear tarea"}
                                </button>
                                <button
                                    type="button"
                                    className="edit-task-button"
                                    onClick={() => setShowForm(false)}
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
                        👤
                    </div>
                    <h2>
                        Tu perfil
                    </h2>
                    <p className="user-email">
                        usuario@email.com
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
                                {tasks.filter((task) => task.completed).length}
                            </strong>
                            <span>
                                Completadas
                            </span>
                        </div>
                        <div>
                            <strong>
                                {tasks.filter((task) => !task.completed).length}
                            </strong>
                            <span>
                                Pendientes
                            </span>
                        </div>
                    </div>
                    <button className="logout-button">
                        Cerrar sesión
                    </button>
                </aside>
            </section>
        </main>
    );
}
export default Tasks;