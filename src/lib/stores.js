import { writable } from "svelte/store";

export const accounts = writable([
    {cardName: 'YouTube', accountID: 'email@gmail.com', password: 'password', visible: true},
    {cardName: 'Twitch', accountID: 'email@gmail.com', password: 'password', visible: true},
    {cardName: 'Instagram', accountID: 'email@gmail.com', password: 'password', visible: true},
    {cardName: 'Google', accountID: 'email@gmail.com', password: 'password', visible: true},
    {cardName: 'Steam', accountID: 'email@gmail.com', password: 'password', visible: true}]);