import { Suspense, useEffect, useState } from 'react';
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
import LiquorAdd from '@components/Liquor/LiquorAdd';
import LiquorList from '@components/Liquor/LiquorList';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';

/** 술 관리 페이지 */
const LiquorPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const [searchParams, setSearchParams] = useState({
    pageNum: 0,
    recordSize: 1, // 페이지 사이즈
  });

  const searchInput = useInput('');

  // 페이지 변경
  const handleChangePage = (page: number) => {
    setSearchParams((prev) => ({
      ...prev,
      pageNum: page,
    }));
  };

  // 술 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '술 추가',
      content: <LiquorAdd />,
      isCloseBtn: true,
    });
  };

  useEffect(() => {
    console.log(searchParams.pageNum);
  }, [searchParams]);

  return (
    <>
      <Breadcrumbs />

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn={'8'} gridColumnSpanMobile={'8'}>
          <TitleWrap>
            <Title>술 관리</Title>
            <Button onClick={handleOpenAddModal}>술 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Input
              placeholder="검색어를 입력해주세요..."
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <LiquorList
                params={searchParams}
                onChangePage={handleChangePage}
              />
            </Suspense>
          </ErrorBoundary>
        </Box>
        <Box gridColumn="4">
          <TitleWrap>
            <Title>필터</Title>
          </TitleWrap>
        </Box>
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
