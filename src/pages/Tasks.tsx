function Tasks() {
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

                        <button className="task-item">
                            <span>○</span>
                            <span>Estudiar React</span>
                        </button>

                        <button className="task-item">
                            <span>○</span>
                            <span>Crear proyecto</span>
                        </button>

                        <button className="task-item">
                            <span>✓</span>
                            <span>Terminar ejercicio</span>
                        </button>

                        <button className="task-item">
                            <span>○</span>
                            <span>Leer documentación</span>
                        </button>

                    </div>

                </aside>


                {/* DETALLE DE TAREA */}
                <section className="task-details">

                    <p className="task-details-label">
                        TAREA SELECCIONADA
                    </p>

                    <h1>Estudiar React</h1>

                    <p className="task-description">
                        Repasar componentes, props y React Router
                        para continuar con el proyecto Taskify.
                    </p>

                    <div className="task-status">
                        <span>Estado</span>
                        <strong>○ Pendiente</strong>
                    </div>

                    <div className="task-actions">

                        <button className="new-task-button">
                            + Nueva tarea
                        </button>

                        <button className="edit-task-button">
                            Editar
                        </button>

                        <button className="delete-task-button">
                            Eliminar
                        </button>

                    </div>

                </section>


                {/* PERFIL */}
                <aside className="user-panel">

                    <div className="user-avatar">
                        👤
                    </div>

                    <h2>Tu perfil</h2>

                    <p className="user-email">
                        usuario@email.com
                    </p>

                    <div className="user-stats">

                        <div>
                            <strong>12</strong>
                            <span>Tareas</span>
                        </div>

                        <div>
                            <strong>8</strong>
                            <span>Completadas</span>
                        </div>

                        <div>
                            <strong>4</strong>
                            <span>Pendientes</span>
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
