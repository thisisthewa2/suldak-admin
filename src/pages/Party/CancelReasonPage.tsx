import { Suspense, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import CancelReasonList from '@components/Party/CancelReasonList';
import CancelReasonAdd from '@components/Party/CancelReasonAdd';
import Button from '@components/core/Button';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Loader from '@components/core/Loader';
import Dropdown from '@components/core/Dropdown';
import Breadcrumbs from '@components/core/Breadcrumbs';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';

// utils
import { PartyRoleTypes } from '@libs/getPartyRoleType';

/** 모임 취소 이유 페이지 */
const CancelReasonPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 모임 역할 목록 상태
  const [roleType, setRoleType] = useState<string>('HOST');

  // 모임 역할 목록 타입 선택 함수
  const handleSelectRole = (selected: { value: string; label: string }) => {
    setRoleType(selected.value);
  };

  // 모임 취소 이유 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '모임 취소 이유 추가',
      content: <CancelReasonAdd />,
    });
  };

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 모임 태그 목록 테이블 */}
        <Box gridColumn="12">
          <TitleWrap>
            <Title>모임 취소 이유</Title>
            <Button onClick={handleOpenAddModal}>모임 취소 이유 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={PartyRoleTypes}
              onSelect={handleSelectRole}
              placeholder="주최자"
            />
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <CancelReasonList roleType={roleType} searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default CancelReasonPage;

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
