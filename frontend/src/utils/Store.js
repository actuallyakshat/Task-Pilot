import { atom } from "jotai";

const toDoAtom = atom([]);
const textAtom = atom("");
const isUpdatingAtom = atom("");

export { toDoAtom, textAtom, isUpdatingAtom };
