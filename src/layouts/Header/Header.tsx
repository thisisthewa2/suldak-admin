import styled from 'styled-components';
import { useAtom } from 'jotai';
import { FaUserCircle } from 'react-icons/fa';

// components
import SuldakLogo from '@components/core/SuldakLogo';

// atoms
import { userAtom } from '@atoms/userAtoms';

// hooks
import useTheme from '@hooks/useTheme';

/** 헤더 컴포넌트 */
const Header = () => {
  const [user] = useAtom(userAtom);
  const { currentTheme } = useTheme();

  return (
    <Container>
      <LeftArea>
        {/* {currentTheme === 'LIGHT' ? <SuldakLogo mode="DARK" /> : <SuldakLogo mode="LIGHT" />} */}
      </LeftArea>
      <UserBox>
        <div className="user-icon">
          <FaUserCircle />
        </div>
        <span className="user-name">{user?.adminNm}</span>
      </UserBox>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  background-color: ${(props) => props.theme.componentBgColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 0 0;
  position: fixed;
  z-index: 999;
`;

const LeftArea = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.nav.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text.primary};
  gap: 0.5rem;

  .user-icon {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }

  .user-name {
    font-size: 1rem;
    color: ${(props) => props.theme.text.primary};
  }
`;
