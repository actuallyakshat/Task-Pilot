import { atom } from "jotai";

const isUpdatingAtom = atom(false);
const isDarkAtom = atom(false);

export { isUpdatingAtom, isDarkAtom };
