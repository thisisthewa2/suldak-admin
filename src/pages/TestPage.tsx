import styled from 'styled-components';
import { Color } from '@styles/theme';

// components
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';
import Loader from '@components/core/Loader';
import NotFound from '@components/core/NotFound';
import Title from '@components/core/Title';
import Button from '@components/core/Button';
import Input from '@components/core/Input';
import Tag from '@components/core/Tag';
import Status from '@components/core/Status';
import CircleProgressBar from '@components/core/CircleProgressBar';
import Breadcrumbs from '@components/core/Breadcrumbs';
import SuldakLogo from '@components/core/SuldakLogo';
import ColumnChart from '@components/Charts/ColumnChart';
import BarChart from '@components/Charts/BarChart';
import TextEditor from '@components/core/TextEditor';

// hooks
import useInput from '@hooks/useInput';
import useResponsive from '@hooks/useResponsive';

/** 테스트 페이지 */
const TestPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const testInput = useInput('');
  const testLabelInput = useInput('');
  const disabledInput = useInput('');

  const editorInput = useInput('Test Input');

  return (
    <>
      <Breadcrumbs />
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 로딩 애니메이션 */}
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>로딩 애니메이션</Title>
          <Loader />
        </Box>
        {/* 404 애니메이션 */}
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>404 에러 애니메이션</Title>
          <NotFound width={200} height={200} />
        </Box>
        {/* 버튼 컴포넌트 */}
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>버튼</Title>
          <ButtonWrap>
            <div className="btn-flex">
              <Button>Button</Button>
              <span>Primary Button</span>
            </div>
            <div className="btn-flex">
              <Button buttonType="confirm">Button</Button>
              <span>Confirm Button</span>
            </div>
            <div className="btn-flex">
              <Button buttonType="cancel">Button</Button>
              <span>Cancel Button</span>
            </div>
            <div className="btn-flex">
              <Button buttonType="reset">Button</Button>
              <span>Reset Button</span>
            </div>
            <div className="btn-flex">
              <Button disabled>Button</Button>
              <span>Disabled Button</span>
            </div>
          </ButtonWrap>
        </Box>
        {/* 인풋 컴포넌트 */}
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>인풋</Title>
          <InputWrap>
            <Input placeholder="None label input" onChange={testInput.onChange} />
            <Input label="Name" placeholder="With label input" onChange={testLabelInput.onChange} />
            <Input placeholder="Disabled input" onChange={disabledInput.onChange} disabled />
          </InputWrap>
        </Box>
      </RowContainer>

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>태그</Title>
          <TagWrap>
            <Tag color={Color.alcohol.gray}>0 ~ 15%</Tag>
            <Tag color={Color.alcohol.blue}>15.1 ~ 30%</Tag>
            <Tag color={Color.alcohol.green}>30.1 ~ 50%</Tag>
          </TagWrap>
          <TagWrap>
            <Tag color={Color.alcohol.yellow}>50.1 ~ 80%</Tag>
            <Tag color={Color.alcohol.orange}>80.1 ~ 99.9%</Tag>
          </TagWrap>
        </Box>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>상태</Title>
          <Status label="Complete" type="complete" />
          <Status label="Pending" type="pending" />
          <Status label="Cancel" type="cancel" />
        </Box>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>원형 바</Title>
          <ProgressWrap>
            <CircleProgressBar />
            <CircleProgressBar percentage={80} />
            <CircleProgressBar percentage={65} />
          </ProgressWrap>
        </Box>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>경로</Title>
          <Breadcrumbs />
        </Box>
      </RowContainer>

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>로고 - 라이트</Title>
          <LogoWrap>
            <SuldakLogo mode="LIGHT" />
          </LogoWrap>
        </Box>
        <Box gridColumn="3" gridColumnSpanTablet="4">
          <Title>로고 - 다크</Title>
          <LogoWrap>
            <SuldakLogo mode="DARK" />
          </LogoWrap>
        </Box>
      </RowContainer>

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="6" gridColumnSpanTablet="8">
          <Title>컬럼 차트</Title>
          <ColumnChart />
        </Box>
        <Box gridColumn="6" gridColumnSpanTablet="8">
          <Title>바 차트</Title>
          <BarChart />
        </Box>
      </RowContainer>

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="12" gridColumnSpanTablet="8">
          <Title>텍스트 에디터</Title>
          <TextEditor initialValue={editorInput.value} />
        </Box>
      </RowContainer>
    </>
  );
};

export default TestPage;

// 버튼
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .btn-flex {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.text.primary};
    gap: 1rem;
  }
`;

// 인풋
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 태그
const TagWrap = styled.div`
  display: flex;

  gap: 1rem;
  margin-bottom: 1rem;
`;

// progress
const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

// 술닥 로고
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
