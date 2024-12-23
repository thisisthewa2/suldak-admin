import { Suspense } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import Breadcrumbs from '@components/core/Breadcrumbs';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Loader from '@components/core/Loader';
import FeedBackList from '@components/Party/FeedBackList';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';

/** 모임 피드백 페이지 */
const FeedBackPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  
  const searchInput = useInput('');
  
  return (
    <>
      <Breadcrumbs />

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn={'12'} gridColumnSpanTablet={'8'}>
          <Title>모임 피드백 목록</Title>

          <FormWrap>
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <FeedBackList
                searchKeyword={searchInput.value}
              />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default FeedBackPage;

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
