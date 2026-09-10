import { apiFetch } from "./client";

export function getStickyNotes() {
    return apiFetch("/sticky-notes/");
}

export function getStickyNote(id) {
    return apiFetch(`/sticky-notes/${id}/`);
}

export function createStickyNote(data) {
    return apiFetch("/sticky-notes/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateStickyNote(id, data) {
    return apiFetch(`/sticky-notes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function deleteStickyNote(id) {
    return apiFetch(`/sticky-notes/${id}/`, {
        method: "DELETE",
    });
}