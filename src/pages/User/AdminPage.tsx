import React, { useState, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import Breadcrumbs from '@components/core/Breadcrumbs';
import Loader from '@components/core/Loader';
import Button from '@components/core/Button';
import Box from '@components/core/Box';
import Title from '@components/core/Title';

import AdminList from '@components/Admin/AdminList';
import AdminEdit from '@components/Admin/AdminEdit';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';

/** 어드민 관리 페이지 */
const AdminPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();

  // 어드민 상태
  const [selectedAdmin, setSelectedAdmin] = useState<any>();

  // 어드민 선택 함수
  const handleSelectAdmin = (admin: any) => [setSelectedAdmin(admin)];

  useEffect(() => {
    console.log(selectedAdmin);
  }, [selectedAdmin]);
  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 어드민 목록 테이블 */}
        <Box gridColumn="9">
          <TitleWrap>
            <Title>어드민 목록</Title>
            <Button>어드민 추가 +</Button>
          </TitleWrap>
          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <AdminList selectAdmin={handleSelectAdmin} />
            </Suspense>
          </ErrorBoundary>
        </Box>

        {/* 어드민 수정 폼 */}
        <Box gridColumn="3">
          <AdminEdit selectedAdmin={selectedAdmin} />
        </Box>
      </RowContainer>
    </>
  );
};

export default AdminPage;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
