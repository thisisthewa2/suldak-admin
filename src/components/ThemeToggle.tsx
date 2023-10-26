import styled, { keyframes, css } from 'styled-components';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useTheme from '@hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { currentTheme, toggleDarkMode } = useTheme();

  return (
    <ToggleWrap onClick={toggleDarkMode}>
      <DarkIcon $active={currentTheme === 'DARK'} />
      <LightIcon $active={currentTheme === 'LIGHT'} />
    </ToggleWrap>
  );
};

export default ThemeToggle;

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 100%;
  height: 50px;
  border-radius: 50%;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

interface IconProps {
  $active: boolean;
}

const IconStyle = css`
  color: ${(props) => props.theme.text.primary};
  animation: ${rotateAnimation} 0.5s;
`;

const DarkIcon = styled(MdDarkMode)<IconProps>`
  ${IconStyle};
  display: ${(props) => (props.$active ? 'block' : 'none')};
`;

const LightIcon = styled(MdLightMode)<IconProps>`
  ${IconStyle};
  display: ${(props) => (props.$active ? 'block' : 'none')};
`;
