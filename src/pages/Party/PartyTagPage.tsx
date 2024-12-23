import { Suspense, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import PartyTagList from '@components/Party/PartyTagList';
import PartyTagAdd from '@components/Party/PartyTagAdd';
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
import { PartyTagTypes } from '@libs/getTagType';

/** 모임 태그 페이지 */
const PartyTagPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 모임 태그 목록 상태
  const [tagType, setTagType] = useState<string>('party-tag');

  // 모임 태그 목록 타입 선택 함수 (현재는 party-tag 한 개)
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  // 모임 태그 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '모임 태그 추가',
      content: <PartyTagAdd />,
    });
  };

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 모임 태그 목록 테이블 */}
        <Box gridColumn="12">
          <TitleWrap>
            <Title>태그 목록</Title>
            <Button onClick={handleOpenAddModal}>모임 태그 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={PartyTagTypes}
              onSelect={handleSelectType}
              placeholder="모임 태그"
            />
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <PartyTagList tagType={tagType} searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default PartyTagPage;

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
