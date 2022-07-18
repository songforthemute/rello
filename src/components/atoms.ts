import { atom, selector } from "recoil";

export const toDoState = atom({
    key: `toDo/${crypto.randomUUID()}`,
    default: [
        "Cupcake",
        "Donut",
        "Eclair",
        "Frozen Yogurt",
        "Gingerbread",
        "Honeycomb",
        "Ice Cream Sandwich",
    ],
});
