import { atom } from "jotai";

const isUpdatingAtom = atom(false);
const isDarkAtom = atom(true);
const userAtom = atom({});
const isLoggedInAtom = atom(false);
const loadingAtom = atom(true);

export { isUpdatingAtom, isDarkAtom, userAtom, isLoggedInAtom, loadingAtom };
