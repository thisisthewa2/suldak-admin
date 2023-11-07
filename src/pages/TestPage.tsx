import styled from 'styled-components';

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

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';

/** 테스트 페이지 */
const TestPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const testInput = useInput('');
  const testLabelInput = useInput('');
  const disabledInput = useInput('');

  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        {/* 로딩 애니메이션 */}
        <Box gridColumn="3">
          <Title>로딩 애니메이션</Title>
          <Loader />
        </Box>
        {/* 404 애니메이션 */}
        <Box gridColumn="3">
          <Title>404 에러 애니메이션</Title>
          <NotFound width={200} height={200} />
        </Box>
        {/* 버튼 컴포넌트 */}
        <Box gridColumn="3">
          <Title>버튼 컴포넌트</Title>
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
        <Box gridColumn="3">
          <Title>인풋 컴포넌트</Title>
          <InputWrap>
            <Input placeholder="None label input" onChange={testInput.onChange} />
            <Input label="Name" placeholder="With label input" onChange={testLabelInput.onChange} />
            <Input placeholder="Disabled input" onChange={disabledInput.onChange} disabled />
          </InputWrap>
        </Box>
      </RowContainer>

      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="3">
          <Title>태그 컴포넌트</Title>
          <TagWrap>
            <Tag>0 ~ 10%</Tag>
            <Tag>21 ~ 50%</Tag>
            <Tag>71 ~ 100%</Tag>
          </TagWrap>
          <TagWrap>
            <Tag>우울할때</Tag>
            <Tag>즐거울때</Tag>
            <Tag>와인파</Tag>
          </TagWrap>
        </Box>
        <Box gridColumn="3">
          <Title>상태 컴포넌트</Title>
          <Status label="Complete" type="complete" />
          <Status label="Pending" type="pending" />
          <Status label="Cancel" type="cancel" />
        </Box>
        <Box gridColumn="3">
          <Title>원형 바</Title>
          <ProgressWrap>
            <CircleProgressBar />
            <CircleProgressBar percentage={80} />
            <CircleProgressBar percentage={65} />
          </ProgressWrap>
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
  gap: 1rem;
`;
