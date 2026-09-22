import type { User } from "firebase/auth";

interface UserPanelProps {
    user: User | null;
    tasksCount: number;
    completedCount: number;
    pendingCount: number;
    onLogout: () => void;
    onDeleteAccount: () => void;
    onSendSummary: () => void;
    isSendingSummary: boolean;
    summaryMessage: string;
}

function UserPanel({
    user,
    tasksCount,
    completedCount,
    pendingCount,
    onLogout,
    onDeleteAccount,
    onSendSummary,
    isSendingSummary,
    summaryMessage,
}: UserPanelProps) {

    return (
        <aside className="user-panel">

            <div className="user-avatar">
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "Usuario"}
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
                        {tasksCount}
                    </strong>

                    <span>
                        Tareas
                    </span>
                </div>

                <div>
                    <strong>
                        {completedCount}
                    </strong>

                    <span>
                        Completadas
                    </span>
                </div>

                <div>
                    <strong>
                        {pendingCount}
                    </strong>

                    <span>
                        Pendientes
                    </span>
                </div>

            </div>

            <button
                className="send-summary-button"
                onClick={onSendSummary}
                disabled={isSendingSummary}
            >
                {isSendingSummary
                    ? "Enviando..."
                    : "Enviar resumen"}
            </button>

            {summaryMessage && (
                <p className="summary-message">
                    {summaryMessage}
                </p>
            )}

            <button
                className="logout-button"
                onClick={onLogout}
            >
                Cerrar sesión
            </button>

            <button
                className="delete-account-button"
                onClick={onDeleteAccount}
            >
                Eliminar cuenta
            </button>

        </aside>
    );
}

export default UserPanel;