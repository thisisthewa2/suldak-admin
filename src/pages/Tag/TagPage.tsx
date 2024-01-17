import { Suspense, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import TagList from '@components/Tag/TagList';
import TagAdd from '@components/Tag/TagAdd';
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
import { TagTypes } from '@libs/getTagType';

/** 태그 추가 페이지 */
const TagPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 목록 태그 상태
  const [tagType, setTagType] = useState<string>('drinking-capacity');

  // 태그 목록 타입 선택 함수
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  // 태그 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '태그 추가',
      content: <TagAdd />,
    });
  };

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 태그 목록 테이블 */}
        <Box gridColumn="12">
          <TitleWrap>
            <Title>태그 목록</Title>
            <Button onClick={handleOpenAddModal}>태그 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={TagTypes}
              onSelect={handleSelectType}
              placeholder="주량"
            />
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <TagList tagType={tagType} searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default TagPage;

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
