import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useAtom } from 'jotai';
import { modalStateAtom } from '@atoms/modalAtoms';

// components
import Button from './Button';

const Modal = () => {
  const [modalState, setModalState] = useAtom(modalStateAtom);

  // 모달이 닫혀 있는 상태
  if (!modalState.isOpen) {
    return null;
  }

  // 확인 버튼 클릭시 실행할 함수
  const handleConfirm = () => {
    modalState.onConfirm?.();
    closeModal();
  };

  // 취소 버튼 클릭시 실행할 함수
  const handleCancel = () => {
    closeModal();
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Overlay>
      <Wrapper>
        <Header>{modalState.title}</Header>
        {modalState.content}
        {modalState.onConfirm && (
          <Footer>
            <Button onClick={handleConfirm}>{modalState.confirmText}</Button>
            <Button onClick={handleCancel} buttonType="reset">
              취소
            </Button>
          </Footer>
        )}
      </Wrapper>
    </Overlay>
  );
};

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const Wrapper = styled.div`
  min-width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.text.primary};
  background-color: ${(props) => props.theme.componentBgColor};
  padding: 1rem;
  border-radius: 0.25rem;
  gap: 1rem;

  animation: ${slideIn} 0.3s ease-out forwards;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.text.primary};
  font-size: 1.2rem;
  font-weight: 500;
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
