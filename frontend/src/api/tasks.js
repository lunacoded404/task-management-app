import { apiFetch } from "./client";

export function getTasks(params = "") {
    return apiFetch(
        `/tasks/${params}`
    );
}

export function getTask(id) {
    return apiFetch(
        `/tasks/${id}/`
    );
}

export function createTask(data) {
    return apiFetch(
        "/tasks/",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function updateTask(id, data) {
    return apiFetch(
        `/tasks/${id}/`,
        {
            method: "PATCH",
            body: JSON.stringify(data),
        }
    );
}

export function deleteTask(id) {
    return apiFetch(
        `/tasks/${id}/`,
        {
            method: "DELETE",
        }
    );
}