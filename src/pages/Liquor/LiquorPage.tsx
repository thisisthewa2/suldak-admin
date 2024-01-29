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
import Button from '@components/core/Button';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';

/** 술 관리 페이지 */
const LiquorPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 술 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '술 추가',
      content: <></>,
    });
  };

  return (
    <>
      <Breadcrumbs />

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn={'12'} gridColumnSpanMobile={'8'}>
          <TitleWrap>
            <Title>술 관리</Title>
            <Button onClick={handleOpenAddModal}>태그 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>
        </Box>

        <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
          <Suspense fallback={<Loader />}></Suspense>
        </ErrorBoundary>
      </RowContainer>
    </>
  );
};

export default LiquorPage;

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
