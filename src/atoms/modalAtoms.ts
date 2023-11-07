import { atom } from "jotai";

export interface IModal {
  isOpen: boolean;
  content: JSX.Element | null;
  onConfirm?: () => void;
}

export const modalStateAtom = atom<IModal>({
  isOpen: false,
  content: null,
  onConfirm: undefined
})