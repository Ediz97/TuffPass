import { writable } from "svelte/store";

export const accounts = writable([{cardName: 'Card Name', accountID: 'email@gmail.com', password: 'password'}]);