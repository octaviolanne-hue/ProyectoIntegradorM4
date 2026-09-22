import type React from "react";
import type { Task } from "../types/task";
import TaskForm from "./TaskForm";

interface TaskDetailsProps {
    selectedTask: Task | null;
    showForm: boolean;
    isEditing: boolean;
    title: string;
    description: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    onNewTask: () => void;
    onEditTask: () => void;
    onToggleComplete: () => void;
    onDeleteTask: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

function TaskDetails({
    selectedTask,
    showForm,
    isEditing,
    title,
    description,
    setTitle,
    setDescription,
    onNewTask,
    onEditTask,
    onToggleComplete,
    onDeleteTask,
    onSubmit,
    onCancel,
}: TaskDetailsProps) {

    if (showForm) {
        return (
            <section className="task-details">

                <TaskForm
                    isEditing={isEditing}
                    title={title}
                    description={description}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />

            </section>
        );
    }

    if (!selectedTask) {
        return (
            <section className="task-details">

                <div className="empty-tasks">

                    <p>No hay tareas para mostrar.</p>

                    <button
                        className="new-task-button"
                        onClick={onNewTask}
                    >
                        + Nueva tarea
                    </button>

                </div>

            </section>
        );
    }

    return (
        <section className="task-details">

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
                    onClick={onNewTask}
                >
                    + Nueva tarea
                </button>

                <button
                    className="edit-task-button"
                    onClick={onEditTask}
                >
                    Editar
                </button>

                <button
                    className={
                        selectedTask.completed
                            ? "complete-task-button completed"
                            : "complete-task-button"
                    }
                    onClick={onToggleComplete}
                >
                    {selectedTask.completed
                        ? "✓ Completada"
                        : "✓ Marcar como completada"}
                </button>

                <button
                    className="delete-task-button"
                    onClick={onDeleteTask}
                >
                    Eliminar
                </button>

            </div>

        </section>
    );
}

export default TaskDetails;