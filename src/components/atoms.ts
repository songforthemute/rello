import { atom, selector } from "recoil";

interface InterfaceToDoState {
    [key: string]: string[];
}

export const toDoState = atom<InterfaceToDoState>({
    key: `toDo/${crypto.randomUUID()}`,
    default: {
        "To Do": ["Cupcake", "Donut", "Eclair"],
        Doing: ["Frozen Yogurt", "Gingerbread"],
        Done: ["Honeycomb", "Ice Cream Sandwich"],
    },
});
