import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

// components
import ThemeToggle from '@components/ThemeToggle';

// atoms
import { userAtom } from '@atoms/userAtoms';

// icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';

/** 화면 우측 하단 액션 버튼 */
const ActionButton = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState<'openAnimation' | 'closeAnimation'>('openAnimation');

  // 메뉴 on/off
  const toggleMenu = () => {
    if (isOpen) {
      setAnimation('closeAnimation');
      setTimeout(() => {
        setIsOpen(false);
        setAnimation('openAnimation');
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  // 로그아웃
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // setUser(null);
    navigate('/login');
  };

  return (
    <ActionButtonContainer>
      {isOpen ? (
        <>
          <ActionMenuItem $delay={0.3} $animation={animation}>
            1
          </ActionMenuItem>
          <ActionMenuItem $delay={0.2} $animation={animation} onClick={handleLogOut}>
            <FaSignOutAlt>2</FaSignOutAlt>
          </ActionMenuItem>
          <ActionMenuItem $delay={0.1} $animation={animation}>
            <ThemeToggle />
          </ActionMenuItem>
        </>
      ) : (
        <></>
      )}

      <MainActionButton onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </MainActionButton>
    </ActionButtonContainer>
  );
};

export default ActionButton;

// 애니메이션
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(2rem);
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
`;

const MainActionButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary};
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const ActionMenuItem = styled.button<{ $animation: string; $delay: number }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.componentBgColor};
  border: none;
  color: ${(props) => props.theme.text.primary};
  font-size: 20px;
  padding: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.boxShadow};

  opacity: ${({ $animation }) => ($animation === 'openAnimation' ? '0' : '1')};
  animation-name: ${({ $animation }) => ($animation === 'openAnimation' ? slideIn : slideOut)};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-delay: ${(props) =>
    props.$animation === 'closeAnimation' ? 0.3 - props.$delay + 's' : props.$delay + 's'};

  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;
