import { atom } from "recoil";

export interface InterfacePayload {
    title: string;
    details?: string;
}

export interface InterfaceToDo {
    id: number;
    payload: InterfacePayload;
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

export interface InterfaceModal {
    isShow: boolean;
    boardId?: string;
    modal?: InterfaceToDo;
}

export const modalState = atom<InterfaceModal>({
    key: `isModal/${crypto.randomUUID()}`,
    default: {
        isShow: false,
    },
});
