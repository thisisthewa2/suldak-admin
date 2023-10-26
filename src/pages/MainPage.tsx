import styled from 'styled-components';

// components
import RowContainer from '@components/RowContainer';

// hooks
import useResponsive from '@hooks/useResponsive';

/** 메인 페이지 */
const MainPage = () => {
  const { isTablet, isMobile } = useResponsive();
  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box>span 3</Box>
        <Box2>span 6</Box2>
        <Box>span 3</Box>
      </RowContainer>
    </>
  );
};

export default MainPage;

const Box = styled.div`
  background-color: ${(props) => props.theme.componentBgColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  grid-column: span 3;
`;

const Box2 = styled.div`
  background-color: red;
  grid-column: span 6;
`;
