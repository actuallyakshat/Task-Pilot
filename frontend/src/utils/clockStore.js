import { atom } from "jotai";

const minutesAtom = atom(50);
const secondsAtom = atom(0);
const initialMinutesAtom = atom(50);
const initialSecondsAtom = atom(0);

export { minutesAtom, secondsAtom, initialMinutesAtom, initialSecondsAtom };
