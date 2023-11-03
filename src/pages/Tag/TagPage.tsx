import { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary, QueryErrorResetBoundary } from 'react-query';

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
        <Box gridColumn="9">
          <Title>태그 목록</Title>
          <Dropdown options={TagTypes} onSelect={handleSelect} placeholder="주량" />
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
                <Suspense fallback={<Loader />}>
                  <TagList tagType={tagType} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Box>

        <Box gridColumn="3">
          <Button>test</Button>
        </Box>
      </RowContainer>
    </>
  );
};

export default TagPage;
