import { validate_component } from "svelte/internal";

export function isNotEmpty(value) {
    return value.trim().length >= 1
}

export function itemsNotEmpty(items) {
    return items.length >= 1
}