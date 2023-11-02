import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProps {
  percentage?: number;
}

/** 원형 circular bar */
const CircleProgressBar = ({ percentage = 40 }: IProps) => {
  return (
    <Wrapper>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </Wrapper>
  );
};

export default CircleProgressBar;

const Wrapper = styled.div`
  width: 100px;
  height: 100px;

  // 원형바 중간 텍스트
  .CircularProgressbar .CircularProgressbar-text {
    fill: ${(props) => props.theme.text.primary} !important;
  }

  // 원형바 채워진 부분
  .CircularProgressbar .CircularProgressbar-path {
    stroke: #65b6a4 !important;
  }

  // 원형바 안채워진 부분
  .CircularProgressbar .CircularProgressbar-trail {
    stroke: '#d4d4d7' !important;
  }
`;
