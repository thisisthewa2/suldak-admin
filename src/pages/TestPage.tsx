// components
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';

// hooks
import useResponsive from '@hooks/useResponsive';

/** 테스트 페이지 */
const TestPage = () => {
  const { isTablet, isMobile } = useResponsive();
  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="3"></Box>
        <Box gridColumn="3"></Box>

        <Box gridColumn="3"></Box>
        <Box gridColumn="3"></Box>
      </RowContainer>
    </>
  );
};

export default TestPage;
