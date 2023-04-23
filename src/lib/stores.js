import { writable } from "svelte/store";

export const userAccounts = writable([]);
export const createNewAccount = writable(true);
export const passwordCorrect = writable(false);