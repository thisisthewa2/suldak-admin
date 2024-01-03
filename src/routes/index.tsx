import { useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';

// components
import NavigationBar from '@layouts/NavigationBar/NavigationBar';
import Header from '@layouts/Header/Header';
import Loader from '@components/core/Loader';
import FloatingButton from '@components/FloatingButton';
import MakaLoader from '@components/core/MakaLoader';

// pages - 로그인 하지 않아도 접근 가능
const LoginPage = lazy(() => import('@pages/LoginPage'));

// pages - 로그인 후 접근 가능
const DashboardPage = lazy(() => import('@pages/DashboardPage'));
const TestPage = lazy(() => import('@pages/TestPage'));

const TagPage = lazy(() => import('@pages/Tag/TagPage'));

const AdminPage = lazy(() => import('@pages/User/AdminPage'));
const UserPage = lazy(() => import('@pages/User/UserPage'));

const ConsentPage = lazy(() => import('@pages/Consent/ConsentPage'));

// 에러페이지
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));

/** 라우터 컴포넌트 */
const RouterComponent = () => {
  return (
    // <Router basename={process.env.PUBLIC_URL}>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* 로그인 상태에서 접근 가능한 페이지 */}
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/" element={<DashboardPage />} />

            {/* 태그 페이지 */}
            <Route path="/tag" element={<TagPage />} />

            {/* 유저 & 어드민 페이지 */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />

            {/* 동의 항목 페이지 */}
            <Route path="/consent" element={<ConsentPage />} />

            <Route path="/test" element={<TestPage />} />
          </Route>
          {/* 404 페이지 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* 비로그인 상태에서 접근 가능한 페이지 */}
          <Route path="/login">
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;

// 로그인시 접속 가능한 페이지 레이아웃
const PrivateLayout = () => {
  const navigate = useNavigate();

  // 토큰이 없을 경우 로그인 페이지로 이동
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {localStorage.getItem('token') && (
        <>
          <FloatingButton />
          <Container>
            <Header />
            <div className="row-flex">
              <NavigationBar />
              <ContentsArea>
                <Suspense fallback={<MakaLoader />}>
                  <Outlet />
                </Suspense>
              </ContentsArea>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .row-flex {
    display: flex;
  }
`;

// 컨텐츠 영역
const ContentsArea = ({ children }: { children: React.ReactNode }) => {
  return <ContentsContainer>{children}</ContentsContainer>;
};

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 102px 2rem 2rem 2rem;
  margin-left: 200px;
`;
