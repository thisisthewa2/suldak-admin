import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// components
import RouterComponent from '@routes/index';
import Modal from '@components/core/Modal';

function App() {
  return (
    <Container>
      {/* 토스트 메시지 출력을 위한 컴포넌트 */}
      <ToastContainer />

      {/* 화면 렌더링용 라우터 컴포넌트 */}
      <RouterComponent />

      {/* 모달 */}
      <Modal />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;
