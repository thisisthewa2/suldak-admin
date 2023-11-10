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

import ConsentList from '@components/Consent/ConsentList';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';

// utils
import { ConsentTypes } from '@libs/getConsentType';

// types
import { itemType } from '@apis/services/ConsentApi';

/** 동의 항목 페이지 */
const ConsentPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const { reset } = useQueryErrorResetBoundary();
  const { openModal } = useModal();

  const searchInput = useInput('');

  // 동의 항목 타입 상태
  const [consentType, setConsentType] = useState<itemType>('TEAM_OF_SERVICE');
  const [selectedConsent, setSelectedConsent] = useState<any>();

  // 동의 항목 타입 선택 함수
  const handleSelectType = (selected: { value: itemType; label: string }) => {
    setConsentType(selected.value);
  };

  // 동의 항목 선택 함수
  const handleSelectConsent = (consent: any) => {
    setSelectedConsent(consent);
  };

  useEffect(() => {
    console.log(consentType);
  }, [consentType]);

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="9">
          <TitleWrap>
            <Title>동의 항목 목록</Title>
            <Button>항목 추가 +</Button>
          </TitleWrap>

          <FormWrap>
            <Dropdown
              options={ConsentTypes}
              onSelect={handleSelectType}
              placeholder="서비스 이용 약관"
            />
            <Input
              placeholder="검색어를 입력해주세요... ( 내용 검색 )"
              onChange={searchInput.onChange}
            />
          </FormWrap>
          <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
            <Suspense fallback={<Loader />}>
              <ConsentList
                consentType={consentType}
                searchKeyword={searchInput.value}
                selectedConsent={handleSelectConsent}
              />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </RowContainer>
    </>
  );
};

export default ConsentPage;

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
