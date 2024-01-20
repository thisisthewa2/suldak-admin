import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { modalStateAtom } from '@atoms/modalAtoms';

interface IOpenProps {
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  isCloseBtn?: boolean;
}

/** 모달 커스텀훅 */
const useModal = () => {
  const [, setModalState] = useAtom(modalStateAtom);

  // 모달 열기
  const openModal = ({
    title,
    content,
    confirmText,
    onConfirm,
    isCloseBtn = false,
  }: IOpenProps) => {
    setModalState({
      title: title,
      isOpen: true,
      content,
      confirmText: confirmText || '확인',
      onConfirm,
      isCloseBtn,
    });
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState({
      isOpen: false,
      content: null,
      onConfirm: undefined,
      isCloseBtn: false,
    });
  };

  return { openModal, closeModal };
};

export default useModal;
