import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// components
import NotFound from '@components/core/NotFound';
import Button from '@components/core/Button';

/** 404 에러 페이지 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  // 대시보드로 돌아가기
  const handleRouteDashboard = () => {
    navigate('/');
  };

  return (
    <Container>
      <NotFound />
      <Button onClick={handleRouteDashboard}>대시보드로 돌아가기</Button>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
