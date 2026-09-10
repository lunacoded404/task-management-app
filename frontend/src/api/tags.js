import { apiFetch } from "./client";

export function getTags() {
    return apiFetch("/tags/");
}

export function getTag(id) {
    return apiFetch(`/tags/${id}/`);
}

export function createTag(data) {
    return apiFetch("/tags/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateTag(id, data) {
    return apiFetch(`/tags/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function deleteTag(id) {
    return apiFetch(`/tags/${id}/`, {
        method: "DELETE",
    });
}