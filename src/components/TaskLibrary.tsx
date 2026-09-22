import type { Task } from "../types/task";

interface TaskLibraryProps {
    tasks: Task[];
    selectedTaskId: string | null;
    onSelectTask: (task: Task) => void;
}

function TaskLibrary({
    tasks,
    selectedTaskId,
    onSelectTask,
}: TaskLibraryProps) {
    return (
        <aside className="tasks-library">
            <h2>Tu biblioteca</h2>

            <div className="task-list">
                {tasks.map((task) => (
                    <button
                        key={task.id}
                        className={
                            task.id === selectedTaskId
                                ? "task-item selected"
                                : "task-item"
                        }
                        onClick={() => onSelectTask(task)}
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
    );
}

export default TaskLibrary;

