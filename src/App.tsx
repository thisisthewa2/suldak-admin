import React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

// components
import ActionButton from '@components/ActionButton';
import RouterComponent from '@routes/index';

function App() {
  return (
    <Container>
      {/* 토스트 메시지 출력을 위한 컴포넌트 */}
      <ToastContainer />
      {/* 액션 버튼 컴포넌트 */}
      <ActionButton />

      {/* 화면 렌더링용 라우터 컴포넌트 */}
      <RouterComponent />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;
