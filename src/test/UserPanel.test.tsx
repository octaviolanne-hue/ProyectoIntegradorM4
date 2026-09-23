import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserPanel from "../components/UserPanel";

describe("UserPanel", () => {
    it("muestra la información del usuario y sus estadísticas", () => {
        const user = {
            displayName: "Octavio",
            email: "octavio@gmail.com",
            photoURL: null,
        } as any;

        render(
            <UserPanel
                user={user}
                tasksCount={5}
                completedCount={3}
                pendingCount={2}
                onLogout={() => { }}
                onDeleteAccount={() => { }}
                onSendSummary={() => { }}
                isSendingSummary={false}
                summaryMessage=""
            />
        );

        expect(
            screen.getByText("Hola, Octavio!")
        ).toBeInTheDocument();

        expect(
            screen.getByText("octavio@gmail.com")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Tareas")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Completadas")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Pendientes")
        ).toBeInTheDocument();
    });

    it("ejecuta onSendSummary al hacer clic en Enviar resumen", async () => {
        const user = userEvent.setup();

        const onSendSummary = vi.fn();

        const userData = {
            displayName: "Octavio",
            email: "octavio@gmail.com",
            photoURL: null,
        } as any;

        render(
            <UserPanel
                user={userData}
                tasksCount={5}
                completedCount={3}
                pendingCount={2}
                onLogout={() => { }}
                onDeleteAccount={() => { }}
                onSendSummary={onSendSummary}
                isSendingSummary={false}
                summaryMessage=""
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Enviar resumen",
            })
        );

        expect(onSendSummary).toHaveBeenCalledTimes(1);
    });

    it("ejecuta onLogout al hacer clic en Cerrar sesión", async () => {
        const user = userEvent.setup();

        const onLogout = vi.fn();

        const userData = {
            displayName: "Octavio",
            email: "octavio@gmail.com",
            photoURL: null,
        } as any;

        render(
            <UserPanel
                user={userData}
                tasksCount={5}
                completedCount={3}
                pendingCount={2}
                onLogout={onLogout}
                onDeleteAccount={() => { }}
                onSendSummary={() => { }}
                isSendingSummary={false}
                summaryMessage=""
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Cerrar sesión",
            })
        );

        expect(onLogout).toHaveBeenCalledTimes(1);
    });

    it("ejecuta onDeleteAccount al hacer clic en Eliminar cuenta", async () => {
        const user = userEvent.setup();

        const onDeleteAccount = vi.fn();

        const userData = {
            displayName: "Octavio",
            email: "octavio@gmail.com",
            photoURL: null,
        } as any;

        render(
            <UserPanel
                user={userData}
                tasksCount={5}
                completedCount={3}
                pendingCount={2}
                onLogout={() => { }}
                onDeleteAccount={onDeleteAccount}
                onSendSummary={() => { }}
                isSendingSummary={false}
                summaryMessage=""
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Eliminar cuenta",
            })
        );

        expect(
            onDeleteAccount
        ).toHaveBeenCalledTimes(1);
    });
});
