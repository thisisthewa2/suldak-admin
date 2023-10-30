import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import useInput from '@hooks/useInput';

/** 로그인 페이지 */
const LoginPage = () => {
  const navigate = useNavigate();

  const userID = useInput('');
  const userPW = useInput('');

  // 로그인
  const handleLogin = () => {
    const reqData = {};
    console.log('로그인 시도');

    // 로그인 성공시
    navigate('/');
  };

  return (
    <Container>
      <div className="content-wrap">
        <div className="title">
          <h1>로그인</h1>
        </div>
        <div className="input-wrap">
          <Input label="아이디" placeholder="ID" value={userID.value} onChange={userID.onChange} />
          <Input
            label="비밀번호"
            placeholder="Password"
            value={userPW.value}
            onChange={userPW.onChange}
            onEnterKeyDown={handleLogin}
          />
        </div>
        <Button onClick={handleLogin}>로그인</Button>
      </div>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    width: 100%;
    color: ${(props) => props.theme.text.primary};
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 400px;
    background-color: ${(props) => props.theme.componentBgColor};
    padding: 1rem;
    border-radius: 0.25rem;
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;
