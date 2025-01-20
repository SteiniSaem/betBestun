import {writable} from 'svelte/store';

export const graphMargin = writable(20)
export const epicbetLineColor = writable({r: 167, g: 247, b: 5, a: 1});
export const coolbetLineColor = writable({r: 75, g: 192, b: 220, a: 1});
export const verticalLineColor = writable({r: 255, g: 255, b: 255, a: 0.5});
