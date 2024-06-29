import { Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import ErrorFallback from '@components/core/ErrorFallback';
import RowContainer from '@components/RowContainer';
import Button from '@components/core/Button';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Loader from '@components/core/Loader';
import Dropdown from '@components/core/Dropdown';
import Breadcrumbs from '@components/core/Breadcrumbs';

import BannerList from '@components/Banner/BannerList';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import BannerAdd from '@components/Banner/BannerAdd';

// utils
import { BannerCategory, BannerActive } from '@libs/getBannerType';


/** 배너 페이지 */
const BannerPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  // 배너 타입 상태
  const [ bannerCategory, setBannerCategory ] = useState('BANNER_TOP');
  const [ isActive, setBannerActive] = useState(true);

  const searchInput = useInput('');

  // 배너 카테고리 타입 선택 함수
  const handleSelectCategory = (selected: { value: string; label: string }) => {
    setBannerCategory(selected.value);
  };

  // 배너 활성화 타입 선택 함수
  const handleSelectActive = (selected: { value: boolean; label: string }) => {
    setBannerActive(selected.value);
  };

  // 배너 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '배너 추가',
      content: <BannerAdd />,
    });
  };

  useEffect(() => {
    console.log("배너 카테고리:",bannerCategory);
    console.log("배너 활성화:",isActive);
  }, [bannerCategory, isActive]);

  return (
    <>
      <Breadcrumbs />
      
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="12">
          <TitleWrap>
            <Title>배너 목록</Title>
            <Button onClick={handleOpenAddModal}>배너 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={BannerCategory}
              onSelect={handleSelectCategory}
              placeholder="상단 배너"
            />
            <Dropdown
              options={BannerActive}
              onSelect={handleSelectActive}
              placeholder="활성화"
            />
            <Input
              placeholder="검색어를 입력해주세요... (배너 ID)"
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <BannerList 
                bannerCategory={bannerCategory}
                isActive={isActive}
                searchKeyword={searchInput.value}
              /> 
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default BannerPage;

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
