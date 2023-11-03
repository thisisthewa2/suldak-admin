import { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import TagList from '@components/Tag/TagList';
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Button from '@components/core/Button';
import Loader from '@components/core/Loader';
import Dropdown from '@components/core/Dropdown';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useToastify from '@hooks/useToastify';

// utils
import { TagTypes } from '@libs/getTagType';

/** 태그 추가 페이지 */
const TagPage = () => {
  const { reset } = useQueryErrorResetBoundary();
  const { isTablet, isMobile } = useResponsive();
  const [tagType, setTagType] = useState<string>('drinking-capacity');
  const searchInput = useInput('');

  // 태그 타입 선택 함수
  const handleSelect = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  useEffect(() => {
    console.log(tagType);
  }, [tagType]);

  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="6">
          <Title>태그 목록</Title>

          <FormWrap>
            <Dropdown options={TagTypes} onSelect={handleSelect} placeholder="주량" />
            <Input
              placeholder="검색어를 입력해주세요..."
              value={searchInput.value}
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <TagList tagType={tagType} searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
        </Box>

        <Box gridColumn="3">
          <Button>test</Button>
        </Box>
      </RowContainer>
    </>
  );
};

export default TagPage;

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
