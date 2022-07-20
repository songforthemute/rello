import { atom, selector } from "recoil";

export interface InterfaceToDo {
    id: number;
    payload: string;
}

export interface InterfaceToDoState {
    [key: string]: InterfaceToDo[];
}
export const LOCAL_KEY = "TODOS_LOCAL";
const preset = `{"To Do": [], "Doing": [], "Done": []}`;
const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || preset);

export const toDoState = atom<InterfaceToDoState>({
    key: `toDo/${crypto.randomUUID()}`,
    default: local,
});

// {
//     "To Do": [
//         { id: 0, payload: "Cup Cake" },
//         { id: 1, payload: "Donut" },
//         { id: 2, payload: "Eclair" },
//     ],
//     Doing: [
//         { id: 3, payload: "Frozen Yogurt" },
//         { id: 4, payload: "Gingerbread" },
//         { id: 5, payload: "Honeycomb" },
//     ],
//     Done: [{ id: 6, payload: "Ice Cream Sandwich" }],
// }
