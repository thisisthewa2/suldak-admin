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
import LiquorFilter from '@components/Liquor/LiquorFilter';

import { SearchParams } from '@apis/services/LiquorApi';

/** 술 관리 페이지 */
const LiquorPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageNum: 0,
    recordSize: 10, // 페이지 사이즈

    // 필터링
    liquorNamePriKeys: [],
    liquorDetailPriKeys: [],
    liquorAbvPriKeys: [],
    tastePriKeys: [],
  });

  const searchInput = useInput('');

  // 페이지 변경
  const handleChangePage = (page: number) => {
    setSearchParams((prev) => ({
      ...prev,
      pageNum: page,
    }));
  };

  const handleChangeFilter = (filterType: string, filterId: number) => {
    setSearchParams((prev) => {
      if (filterType === 'liquorNamePriKeys') {
        const updatedLiquorNamePriKeys = prev.liquorNamePriKeys.includes(filterId)
          ? prev.liquorNamePriKeys.filter((id) => id !== filterId)
          : [...prev.liquorNamePriKeys, filterId];

        return {
          ...prev,
          liquorNamePriKeys: updatedLiquorNamePriKeys,
        };
      } else if (filterType === 'liquorDetailPriKeys') {
        const updatedLiquorDetailPriKeys = prev.liquorDetailPriKeys.includes(filterId)
          ? prev.liquorDetailPriKeys.filter((id) => id !== filterId)
          : [...prev.liquorDetailPriKeys, filterId];

        return {
          ...prev,
          liquorDetailPriKeys: updatedLiquorDetailPriKeys,
        };
      } else if (filterType === 'liquorAbvPriKeys') {
        const updatedLiquorAbvPriKeys = prev.liquorAbvPriKeys.includes(filterId)
          ? prev.liquorAbvPriKeys.filter((id) => id !== filterId) // 이미 존재하면 제거
          : [...prev.liquorAbvPriKeys, filterId]; // 존재하지 않으면 추가

        return {
          ...prev,
          liquorAbvPriKeys: updatedLiquorAbvPriKeys,
        };
      } else if (filterType === 'tastePriKeys') {
        const updatedTastePriKeys = prev.tastePriKeys.includes(filterId)
          ? prev.tastePriKeys.filter((id) => id !== filterId)
          : [...prev.tastePriKeys, filterId];

        return {
          ...prev,
          tastePriKeys: updatedTastePriKeys,
        };
      }

      // 다른 filterType에 대한 처리
      // 여기에 필터링 로직 추가

      // filterType이 존재하지 않는 경우 이전 상태를 그대로 반환
      return prev;
    });
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
    setSearchParams((prev) => ({
      ...prev,
      pageNum: 0, // 검색 시 페이지 0으로 초기화
      recordSize: searchInput.value ? 9999 : 10, // 검색 시 임의의 값을 recordSize에 적용
    }));
  }, [searchInput.value]);

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
            <Input placeholder="검색어를 입력해주세요..." onChange={searchInput.onChange} />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <LiquorList params={searchParams} onChangePage={handleChangePage} searchKeyword={searchInput.value} />
            </Suspense>
          </ErrorBoundary>
        </Box>
        <Box gridColumn="4">
          <FilterWrap>
            <Title>필터</Title>
            <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
              <Suspense fallback={<Loader />}>
                <LiquorFilter onChangeFilter={handleChangeFilter} filterList={searchParams} />
              </Suspense>
            </ErrorBoundary>
          </FilterWrap>
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

const FilterWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 1rem;
`;
