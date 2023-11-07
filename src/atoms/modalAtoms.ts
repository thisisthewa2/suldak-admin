import { atom } from "jotai";

export interface IModal {
  title?: string;
  isOpen: boolean;
  content: JSX.Element | React.ReactNode | null;
  confirmText?: string;
  onConfirm?: () => void;
}

export const modalStateAtom = atom<IModal>({
  title: '',
  isOpen: false,
  content: null,
  confirmText: '확인',
  onConfirm: undefined
})