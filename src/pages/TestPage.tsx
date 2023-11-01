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

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';

/** 테스트 페이지 */
const TestPage = () => {
  const { isTablet, isMobile } = useResponsive();
  const testInput = useInput('');
  const testLabelInput = useInput('');

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
          </ButtonWrap>
        </Box>
        {/* 인풋 컴포넌트 */}
        <Box gridColumn="3">
          <Title>인풋 컴포넌트</Title>
          <InputWrap>
            <Input
              placeholder="None label input"
              value={testInput.value}
              onChange={testInput.onChange}
            />
            <Input
              label="Name"
              placeholder="With label input"
              value={testLabelInput.value}
              onChange={testLabelInput.onChange}
            />
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
`;
