import React, { useState, Suspense } from 'react';
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
import Input from '@components/core/Input';

import AdminList from '@components/Admin/AdminList';
import AdminAdd from '@components/Admin/AdminAdd';

// hooks
import useResponsive from '@hooks/useResponsive';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

/** 어드민 관리 페이지 */
const AdminPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 어드민 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '어드민 추가',
      content: <AdminAdd />,
    });
  };

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 어드민 목록 테이블 */}
        <Box gridColumn="12">
          <TitleWrap>
            <Title>어드민 목록</Title>
            <Button onClick={handleOpenAddModal}>어드민 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <AdminList searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
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
