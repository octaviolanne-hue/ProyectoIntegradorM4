import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Task } from "../types/task";

const mocks = vi.hoisted(() => ({
    useAuth: vi.fn(),

    getTasks: vi.fn(),
    addTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),

    logout: vi.fn(),
    deleteAccount: vi.fn(),

    sendTaskSummary: vi.fn(),
}));

vi.mock("../features/AuthContext", () => ({
    useAuth: mocks.useAuth,
}));

vi.mock("../services/tasks", () => ({
    addTask: mocks.addTask,
    getTasks: mocks.getTasks,
    updateTask: mocks.updateTask,
    deleteTask: mocks.deleteTask,
}));

vi.mock("../services/auth", () => ({
    logout: mocks.logout,
    deleteAccount: mocks.deleteAccount,
}));

vi.mock("../services/email", () => ({
    sendTaskSummary: mocks.sendTaskSummary,
}));

vi.mock("../components/TasksNavbar", () => ({
    default: () => (
        <nav>
            Taskify
        </nav>
    ),
}));

import Tasks from "../pages/Tasks";

describe("Tasks", () => {
    const task1: Task = {
        id: "1",
        title: "Estudiar React",
        description: "Repasar componentes",
        completed: false,
    };

    const task2: Task = {
        id: "2",
        title: "Estudiar TypeScript",
        description: "Repasar interfaces",
        completed: true,
    };

    beforeEach(() => {
        vi.resetAllMocks();

        mocks.useAuth.mockReturnValue({
            user: {
                displayName: "Usuario Test",
                email: "usuario@example.com",
                photoURL: null,
            },
        });

        mocks.getTasks.mockResolvedValue([
            task1,
            task2,
        ]);

        mocks.addTask.mockResolvedValue(undefined);
        mocks.updateTask.mockResolvedValue(undefined);
        mocks.deleteTask.mockResolvedValue(undefined);
        mocks.logout.mockResolvedValue(undefined);
        mocks.deleteAccount.mockResolvedValue(undefined);
        mocks.sendTaskSummary.mockResolvedValue(undefined);
    });

    it("carga y muestra las tareas", async () => {
        render(<Tasks />);

        expect(
            await screen.findByRole("button", {
                name: /Estudiar React/,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /Estudiar TypeScript/,
            })
        ).toBeInTheDocument();

        expect(
            mocks.getTasks
        ).toHaveBeenCalledTimes(1);
    });

    it("selecciona una tarea al hacer clic en ella", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: /Estudiar TypeScript/,
            })
        );

        expect(
            screen.getByText(
                "Repasar interfaces"
            )
        ).toBeInTheDocument();
    });

    it("muestra el formulario al hacer clic en Nueva tarea", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "+ Nueva tarea",
            })
        );

        expect(
            screen.getByRole("button", {
                name: "Crear tarea",
            })
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText("Título")
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText("Descripción")
        ).toBeInTheDocument();
    });

    it("crea una nueva tarea", async () => {
        const user = userEvent.setup();

        const updatedTasks: Task[] = [
            task1,
            task2,
            {
                id: "3",
                title: "Nueva tarea",
                description: "Nueva descripción",
                completed: false,
            },
        ];

        mocks.getTasks
            .mockResolvedValueOnce([
                task1,
                task2,
            ])
            .mockResolvedValueOnce(
                updatedTasks
            );

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "+ Nueva tarea",
            })
        );

        await user.type(
            screen.getByLabelText("Título"),
            "Nueva tarea"
        );

        await user.type(
            screen.getByLabelText("Descripción"),
            "Nueva descripción"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Crear tarea",
            })
        );

        await waitFor(() => {
            expect(
                mocks.addTask
            ).toHaveBeenCalledWith(
                "Nueva tarea",
                "Nueva descripción"
            );
        });

        await waitFor(() => {
            expect(
                mocks.addTask
            ).toHaveBeenCalledWith(
                "Nueva tarea",
                "Nueva descripción"
            );
        });

        expect(
            screen.getAllByText("Nueva tarea")
        ).toHaveLength(2);
    });

    it("muestra los datos de la tarea al editarla", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "Editar",
            })
        );

        expect(
            screen.getByText("Editar tarea")
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText("Título")
        ).toHaveValue("Estudiar React");

        expect(
            screen.getByLabelText("Descripción")
        ).toHaveValue("Repasar componentes");
    });

    it("actualiza una tarea", async () => {
        const user = userEvent.setup();

        const updatedTask: Task = {
            ...task1,
            title: "React actualizado",
            description: "Descripción actualizada",
        };

        mocks.getTasks
            .mockResolvedValueOnce([
                task1,
                task2,
            ])
            .mockResolvedValueOnce([
                updatedTask,
                task2,
            ]);

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "Editar",
            })
        );

        const titleInput =
            screen.getByLabelText("Título");

        const descriptionInput =
            screen.getByLabelText("Descripción");

        await user.clear(titleInput);

        await user.type(
            titleInput,
            "React actualizado"
        );

        await user.clear(descriptionInput);

        await user.type(
            descriptionInput,
            "Descripción actualizada"
        );

        await user.click(
            screen.getByRole("button", {
                name: "Guardar cambios",
            })
        );

        await waitFor(() => {
            expect(
                mocks.updateTask
            ).toHaveBeenCalledWith(
                "1",
                "React actualizado",
                "Descripción actualizada",
                false
            );
        });
    });

    it("marca una tarea como completada", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "✓ Marcar como completada",
            })
        );

        await waitFor(() => {
            expect(
                mocks.updateTask
            ).toHaveBeenCalledWith(
                "1",
                "Estudiar React",
                "Repasar componentes",
                true
            );
        });

        expect(
            screen.getByRole("button", {
                name: "✓ Completada",
            })
        ).toBeInTheDocument();
    });

    it("elimina la tarea seleccionada", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: /Estudiar React/,
        });

        await user.click(
            screen.getByRole("button", {
                name: "Eliminar",
            })
        );

        await waitFor(() => {
            expect(
                mocks.deleteTask
            ).toHaveBeenCalledWith("1");
        });
    });

    it("cierra la sesión", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: "Cerrar sesión",
        });

        await user.click(
            screen.getByRole("button", {
                name: "Cerrar sesión",
            })
        );

        await waitFor(() => {
            expect(
                mocks.logout
            ).toHaveBeenCalledTimes(1);
        });
    });

    it("envía el resumen de tareas por email", async () => {
        const user = userEvent.setup();

        render(<Tasks />);

        await screen.findByRole("button", {
            name: "Enviar resumen",
        });

        await user.click(
            screen.getByRole("button", {
                name: "Enviar resumen",
            })
        );

        await waitFor(() => {
            expect(
                mocks.sendTaskSummary
            ).toHaveBeenCalledTimes(1);
        });

        expect(
            mocks.sendTaskSummary
        ).toHaveBeenCalledWith(
            "usuario@example.com",
            expect.stringContaining(
                "Resumen de tareas - Taskify"
            )
        );
    });
    it("muestra un error cuando no se pueden cargar las tareas", async () => {
        mocks.getTasks.mockRejectedValue(
            new Error("Error de Firebase")
        );

        render(<Tasks />);

        expect(
            await screen.findByText(
                "⚠️ No se pudieron cargar las tareas."
            )
        ).toBeInTheDocument();
    });
});