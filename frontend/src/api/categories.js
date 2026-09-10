import { apiFetch } from "./client";

export function getCategories() {
    return apiFetch("/categories/");
}

export function getCategory(id) {
    return apiFetch(`/categories/${id}/`);
}

export function createCategory(data) {
    return apiFetch("/categories/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateCategory(id, data) {
    return apiFetch(`/categories/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export function deleteCategory(id) {
    return apiFetch(`/categories/${id}/`, {
        method: "DELETE",
    });
}