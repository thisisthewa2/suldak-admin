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

import RecommendList from '@components/Recommend/RecommendList';
import RecommendAdd from '@components/Recommend/RecommendAdd';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';

// utils
import { SearchType, RecommendActive } from '@libs/getRecommendType';


/** 검색어 페이지 */
const RecommendPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  // 검색어 타입 상태
  const [ searchType, setSearchType ] = useState('LIQUOR');
  const [ isActive, setRecommendActive] = useState(true);

  const searchInput = useInput('');

  // 검색어 타입 선택 함수
  const handleSelectSearchType = (selected: { value: string; label: string }) => {
    setSearchType(selected.value);
  };

  // 검색어 활성화 타입 선택 함수
  const handleSelectActive = (selected: { value: boolean; label: string }) => {
    setRecommendActive(selected.value);
  };

  // 검색어 추가 모달 열기
  const handleOpenAddModal = () => {
    openModal({
      title: '추천 검색어 추가',
      content: <RecommendAdd />,
    });
  };

  useEffect(() => {
    console.log("검색어 타입:",searchType);
    console.log("검색어 활성화:",isActive);
  }, [searchType, isActive]);

  return (
    <>
      <Breadcrumbs />
      
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="12">
          <TitleWrap>
            <Title>추천 검색어 목록</Title>
            <Button onClick={handleOpenAddModal}>추천 검색어 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={SearchType}
              onSelect={handleSelectSearchType}
              placeholder="술"
            />
            <Dropdown
              options={RecommendActive}
              onSelect={handleSelectActive}
              placeholder="활성화"
            />
            <Input
              placeholder="검색어를 입력해주세요"
              onChange={searchInput.onChange}
            />
          </FormWrap>

          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <RecommendList 
                searchType={searchType}
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

export default RecommendPage;

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
