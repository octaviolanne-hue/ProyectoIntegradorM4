export const sendTaskSummary = async (
    to: string,
    summary: string
) => {
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to,
            summary,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            data.error ||
            "No se pudo enviar el resumen."
        );
    }

    return data;
};
