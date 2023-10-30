import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';

// components
import NavigationBar from '@layouts/NavigationBar/NavigationBar';
import Loader from '@components/core/Loader';
import ActionButton from '@components/ActionButton';

// pages - 로그인 하지 않아도 접근 가능
const LoginPage = lazy(() => import('@pages/LoginPage'));

// pages - 로그인 후 접근 가능
const DashboardPage = lazy(() => import('@pages/DashboardPage'));

// 에러페이지
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

/** 라우터 컴포넌트 */
const RouterComponent = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* 비로그인 상태에서 접근 가능한 페이지 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 로그인 상태에서 접근 가능한 페이지 */}
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>

          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;

// 로그인시 접속 가능한 페이지 레이아웃
const PrivateLayout = () => {
  return (
    <>
      <ActionButton />
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
