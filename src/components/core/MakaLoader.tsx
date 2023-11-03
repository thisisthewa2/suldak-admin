import styled from 'styled-components';
import Maka from '@components/core/Maka';

/** 컨텐츠 영역에 사용할 마카 로더 */
const MakaLoader = () => {
  return (
    <Wrapper>
      <Maka width={300} height={300} />
    </Wrapper>
  );
};

export default MakaLoader;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
