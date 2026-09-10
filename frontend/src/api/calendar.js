import { apiFetch } from "./client";

export function getCalendarEvents(start, end) {
    const params = new URLSearchParams({
        start,
        end,
    });

    return apiFetch(`/calendar/?${params.toString()}`);
}