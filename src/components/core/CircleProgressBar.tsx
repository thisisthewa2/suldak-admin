import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IProps {
  percentage?: number;
}

/** 원형 circular bar */
const CircleProgressBar = ({ percentage = 40 }: IProps) => {
  const color = `rgb(${100 - percentage}, ${percentage}, 0)`;

  return (
    <Wrapper>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // textColor: color,
          // pathColor: '#65b6a4',
          // trailColor: '#65b6a4',
        })}
      />
    </Wrapper>
  );
};

export default CircleProgressBar;

const Wrapper = styled.div`
  width: 100px;
  height: 100px;

  .CircularProgressbar .CircularProgressbar-text {
    fill: ${(props) => props.theme.text.primary} !important;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: #65b6a4 !important;
  }
  .CircularProgressbar .CircularProgressbar-trail {
    stroke: '#d4d4d7' !important;
  }
`;
