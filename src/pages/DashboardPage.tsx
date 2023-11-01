import React, { Suspense } from 'react';
import styled from 'styled-components';

// components
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';
import Title from '@components/core/Title';

// hooks
import useResponsive from '@hooks/useResponsive';

/** 메인 페이지 */
const DashboardPage = () => {
  const { isTablet, isMobile } = useResponsive();
  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="3">
          <Title>span 3</Title>
        </Box>
        <Box gridColumn="6">
          <Title>span 6</Title>
        </Box>
        <Box gridColumn="3">
          <Title>span 3</Title>
        </Box>
      </RowContainer>
    </>
  );
};

export default DashboardPage;
