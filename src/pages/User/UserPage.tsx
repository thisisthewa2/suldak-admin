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
import UserList from '@components/User/UserList';

// hooks
import useResponsive from '@hooks/useResponsive';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

/** 유저 관리 페이지 */
const UserPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 유저 상태
  const [selectedAdmin, setSelectedAdmin] = useState<any>();

  // 유저 선택 함수
  const handleSelectAdmin = (admin: any) => [setSelectedAdmin(admin)];

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="12">
          <Title>유저 목록</Title>

          <FormWrap>
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <UserList
                searchKeyword={searchInput.value}
                selectUser={handleSelectAdmin}
              />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default UserPage;

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
