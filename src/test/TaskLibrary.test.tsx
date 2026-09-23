import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TaskLibrary from "../components/TaskLibrary";

describe("TaskLibrary", () => {
    it("muestra las tareas recibidas", () => {
        const tasks = [
            {
                id: "1",
                title: "Estudiar React",
                description: "Repasar componentes",
                completed: false,
            },
            {
                id: "2",
                title: "Estudiar TypeScript",
                description: "Repasar interfaces",
                completed: true,
            },
        ];

        render(
            <TaskLibrary
                tasks={tasks}
                selectedTaskId={null}
                onSelectTask={() => { }}
            />
        );

        expect(
            screen.getByText("Estudiar React")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Estudiar TypeScript")
        ).toBeInTheDocument();
    });
});
