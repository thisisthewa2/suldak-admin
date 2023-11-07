import { useEffect } from "react";
import { useAtom } from "jotai";
import { modalStateAtom } from "@atoms/modalAtoms";

interface IOpenProps {
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}

/** 모달 커스텀훅 */
const useModal = () => {
  const [modalState, setModalState] = useAtom(modalStateAtom)

  useEffect(() => {
    console.log(modalState)
  }, [modalState])

  // 모달 열기
  const openModal = ({ title, content, confirmText, onConfirm }: IOpenProps) => {
    setModalState({ title: title, isOpen: true, content, confirmText: confirmText || '확인', onConfirm })
  }

  // 모달 닫기
  const closeModal = () => {
    setModalState({ isOpen: false, content: null, onConfirm: undefined })
  }

  return { openModal, closeModal }

}

export default useModal;