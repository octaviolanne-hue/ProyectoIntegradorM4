import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TaskDetails from "../components/TaskDetails";

describe("TaskDetails", () => {
    const task = {
        id: "1",
        title: "Estudiar React",
        description: "Repasar componentes y props",
        completed: false,
    };

    const renderTaskDetails = () => {
        const onNewTask = vi.fn();
        const onEditTask = vi.fn();
        const onToggleComplete = vi.fn();
        const onDeleteTask = vi.fn();

        render(
            <TaskDetails
                selectedTask={task}
                showForm={false}
                isEditing={false}
                title=""
                description=""
                setTitle={() => { }}
                setDescription={() => { }}
                onNewTask={onNewTask}
                onEditTask={onEditTask}
                onToggleComplete={onToggleComplete}
                onDeleteTask={onDeleteTask}
                onSubmit={() => { }}
                onCancel={() => { }}
            />
        );

        return {
            onNewTask,
            onEditTask,
            onToggleComplete,
            onDeleteTask,
        };
    };

    it("muestra la tarea seleccionada", () => {
        renderTaskDetails();

        expect(
            screen.getByText("Estudiar React")
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "Repasar componentes y props"
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText("○ Pendiente")
        ).toBeInTheDocument();
    });

    it("ejecuta onNewTask al hacer clic en Nueva tarea", async () => {
        const user = userEvent.setup();

        const { onNewTask } = renderTaskDetails();

        await user.click(
            screen.getByRole("button", {
                name: "+ Nueva tarea",
            })
        );

        expect(onNewTask).toHaveBeenCalledTimes(1);
    });

    it("ejecuta onEditTask al hacer clic en Editar", async () => {
        const user = userEvent.setup();

        const { onEditTask } = renderTaskDetails();

        await user.click(
            screen.getByRole("button", {
                name: "Editar",
            })
        );

        expect(onEditTask).toHaveBeenCalledTimes(1);
    });

    it("ejecuta onToggleComplete al marcar la tarea", async () => {
        const user = userEvent.setup();

        const { onToggleComplete } =
            renderTaskDetails();

        await user.click(
            screen.getByRole("button", {
                name: "✓ Marcar como completada",
            })
        );

        expect(
            onToggleComplete
        ).toHaveBeenCalledTimes(1);
    });

    it("ejecuta onDeleteTask al hacer clic en Eliminar", async () => {
        const user = userEvent.setup();

        const { onDeleteTask } =
            renderTaskDetails();

        await user.click(
            screen.getByRole("button", {
                name: "Eliminar",
            })
        );

        expect(
            onDeleteTask
        ).toHaveBeenCalledTimes(1);
    });

    it("muestra el mensaje cuando no hay una tarea seleccionada", () => {
        const onNewTask = vi.fn();

        render(
            <TaskDetails
                selectedTask={null}
                showForm={false}
                isEditing={false}
                title=""
                description=""
                setTitle={() => { }}
                setDescription={() => { }}
                onNewTask={onNewTask}
                onEditTask={() => { }}
                onToggleComplete={() => { }}
                onDeleteTask={() => { }}
                onSubmit={() => { }}
                onCancel={() => { }}
            />
        );

        expect(
            screen.getByText(
                "No hay tareas para mostrar."
            )
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "+ Nueva tarea",
            })
        ).toBeInTheDocument();
    });

    it("muestra una tarea como completada", () => {
        const completedTask = {
            ...task,
            completed: true,
        };

        render(
            <TaskDetails
                selectedTask={completedTask}
                showForm={false}
                isEditing={false}
                title=""
                description=""
                setTitle={() => { }}
                setDescription={() => { }}
                onNewTask={() => { }}
                onEditTask={() => { }}
                onToggleComplete={() => { }}
                onDeleteTask={() => { }}
                onSubmit={() => { }}
                onCancel={() => { }}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "✓ Completada",
            })
        ).toBeInTheDocument();
    });
});