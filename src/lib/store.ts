import { writable } from 'svelte/store';
import type { Card } from './types';

export const tooltip = writable<{
    element: HTMLElement | null;
    visible: boolean;
    content: Card | null;
    position: {
        x: number;
        y: number
    };
}>({
    element: null,
    visible: false,
    content: null,
    position: {
        x: 0,
        y: 0
    }
});