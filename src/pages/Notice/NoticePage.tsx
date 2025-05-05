import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Breadcrumbs from '@components/core/Breadcrumbs';
import useModal from '@hooks/useModal';
import { useQueryErrorResetBoundary } from 'react-query';
import useResponsive from '@hooks/useResponsive';
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';
import styled from 'styled-components';
import Title from '@components/core/Title';
import Button from '@components/core/Button';
import ErrorFallback from '@components/core/ErrorFallback';
import Loader from '@components/core/Loader';
import NoticeList from '@components/Notice/NoticeList';
import NoticeAdd from '@components/Notice/NoticeAdd';

export default function NoticePage() {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const handleOpenAddModal = () => {
    openModal({
      title: '공지사항 추가',
      content: <NoticeAdd />,
    });
  };

  return (
    <>
      <Breadcrumbs />

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn={'8'} gridColumnSpanMobile={'8'}>
          <TitleWrap>
            <Title>공지사항 관리</Title>
            <Button onClick={handleOpenAddModal}>공지사항 추가 +</Button>
          </TitleWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <NoticeList />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
}

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
