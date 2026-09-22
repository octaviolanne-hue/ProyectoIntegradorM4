import type React from "react";

interface TaskFormProps {
    isEditing: boolean;
    title: string;
    description: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

function TaskForm({
    isEditing,
    title,
    description,
    setTitle,
    setDescription,
    onSubmit,
    onCancel,
}: TaskFormProps) {

    return (
        <form
            className="task-form"
            onSubmit={onSubmit}
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
                    {isEditing
                        ? "Guardar cambios"
                        : "Crear tarea"}
                </button>

                <button
                    type="button"
                    className="edit-task-button"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

            </div>
        </form>
    );
}

export default TaskForm;