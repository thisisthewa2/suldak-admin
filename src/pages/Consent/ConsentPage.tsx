import { useEffect } from 'react';
import styled from 'styled-components';

// components
import RowContainer from '@components/RowContainer';
import Button from '@components/core/Button';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Breadcrumbs from '@components/core/Breadcrumbs';

// hooks
import useResponsive from '@hooks/useResponsive';

/** 동의 항목 페이지 */
const ConsentPage = () => {
  const { isTablet, isMobile } = useResponsive();

  // Notion 페이지로 리다이렉트하는 함수
  const redirectToNotion = () => {
    window.open(
      'https://www.notion.so/memo-note/25dc06e8a8b2807aa6a8c565860b9a8e?source=copy_link',
      '_blank',
    );
  };

  useEffect(() => {
    // 페이지 로드 시 자동으로 Notion으로 리다이렉트
    redirectToNotion();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="12">
          <TitleWrap>
            <Title>동의 항목 관리</Title>
            <Button onClick={redirectToNotion}>Notion에서 관리하기</Button>
          </TitleWrap>

          <NoticeContainer>
            <p>동의 항목 관리는 Notion 페이지에서 진행됩니다.</p>
            <p>
              위의 버튼을 클릭하거나 자동으로 리다이렉트되는 페이지를
              이용해주세요.
            </p>
          </NoticeContainer>
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

const NoticeContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.componentBgColor};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.form.border};
  text-align: center;

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.text.secondary};
    font-size: 1rem;
    line-height: 1.5;
  }

  p:first-child {
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
  }
`;
