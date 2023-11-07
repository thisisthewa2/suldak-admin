import { useAtom } from "jotai";
import { modalStateAtom } from "@atoms/modalAtoms";

interface IOpenProps {
  content: JSX.Element;
  onConfirm?: () => void;
}

/** 모달 커스텀훅 */
const useModal = () => {
  const [, setModalState] = useAtom(modalStateAtom)

  // 모달 열기
  const openModal = ({ content, onConfirm }: IOpenProps) => {
    setModalState({ isOpen: true, content, onConfirm })
  }

  // 모달 닫기
  const closeModal = () => {
    setModalState({ isOpen: true, content: null, onConfirm: undefined })
  }

  return { openModal, closeModal }

}

export default useModal;