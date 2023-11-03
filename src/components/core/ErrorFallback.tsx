import styled from 'styled-components';

interface IProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/** 에러 발생시 보여줄 컴포넌트 */
const ErrorFallback = ({ error, resetErrorBoundary }: IProps) => {
  return (
    <FallbackWrapper>
      <InfoText>{error.message}</InfoText>
      <InfoText>잠시 후 다시 시도해주세요</InfoText>
      <SubText>요청사항을 처리하는데 실패했습니다</SubText>
      <RefreshButton onClick={resetErrorBoundary}>새로고침</RefreshButton>
    </FallbackWrapper>
  );
};

export default ErrorFallback;

const FallbackWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InfoText = styled.span`
  color: ${(props) => props.theme.text.primary};
  font-weight: 500;
  font-size: 1.5rem;
`;

const SubText = styled.span`
  color: ${(props) => props.theme.text.secondary};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const RefreshButton = styled.div`
  width: fit-content;
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.2s;
  background-color: ${(props) => props.theme.primary};
`;
