import { apiFetch } from "./client";

export function createSubTask(data) {
    return apiFetch(
        "/subtasks/",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function updateSubTask(
    id,
    data
) {
    return apiFetch(
        `/subtasks/${id}/`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        }
    );
}

export function deleteSubTask(id) {
    return apiFetch(
        `/subtasks/${id}/`,
        {
            method: "DELETE",
        }
    );
}