import { lazy } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';

// components
import NavigationBar from '@layouts/NavigationBar/NavigationBar';

// pages
const MainPage = lazy(() => import('@pages/MainPage'));

/** 라우터 컴포넌트 */
const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 상태에서 접근 가능한 페이지 */}
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterComponent;

// 로그인시 접속 가능한 페이지 레이아웃
const PrivateLayout = () => {
  return (
    <>
      <Container>
        <NavigationBar />
        <ColFlex>
          <Outlet />
        </ColFlex>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5rem;
`;
