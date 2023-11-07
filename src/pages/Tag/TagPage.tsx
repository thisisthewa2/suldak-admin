import { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import TagList from '@components/Tag/TagList';
import TagEdit from '@components/Tag/TagEdit';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Loader from '@components/core/Loader';
import Dropdown from '@components/core/Dropdown';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';

// utils
import { TagTypes } from '@libs/getTagType';

/** 태그 추가 페이지 */
const TagPage = () => {
  const { reset } = useQueryErrorResetBoundary();
  const { isTablet, isMobile } = useResponsive();
  const searchInput = useInput('');

  const [tagType, setTagType] = useState<string>('drinking-capacity');
  const [selectedTag, setSelectedTag] = useState<any>();

  // 태그 타입 선택 함수
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
    setSelectedTag(null);
  };

  // 태그 선택 함수
  const handleSelectTag = (tag: any) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  useEffect(() => {
    console.log(tagType);
  }, [tagType]);

  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 태그 목록 테이블 */}
        <Box gridColumn="9">
          <Title>태그 목록</Title>

          <FormWrap>
            <Dropdown options={TagTypes} onSelect={handleSelectType} placeholder="주량" />
            <Input
              placeholder="검색어를 입력해주세요..."
              value={searchInput.value}
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <TagList
                tagType={tagType}
                searchKeyword={searchInput.value}
                selecteTag={handleSelectTag}
              />
            </Suspense>
          </ErrorBoundary>
        </Box>

        {/* 태그 수정 폼 */}
        <Box gridColumn="3">
          <TagEdit tagType={tagType} selectedTag={selectedTag} />
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
