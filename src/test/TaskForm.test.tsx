import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TaskForm from "../components/TaskForm";

describe("TaskForm", () => {
    it("permite escribir en los campos del formulario", async () => {
        const user = userEvent.setup();

        const setTitle = vi.fn();
        const setDescription = vi.fn();

        render(
            <TaskForm
                isEditing={false}
                title=""
                description=""
                setTitle={setTitle}
                setDescription={setDescription}
                onSubmit={() => { }}
                onCancel={() => { }}
            />
        );

        const titleInput = screen.getByLabelText("Título");
        const descriptionInput =
            screen.getByLabelText("Descripción");

        await user.type(
            titleInput,
            "Estudiar React"
        );

        await user.type(
            descriptionInput,
            "Repasar componentes"
        );

        expect(setTitle).toHaveBeenCalled();
        expect(setDescription).toHaveBeenCalled();
    });
});
