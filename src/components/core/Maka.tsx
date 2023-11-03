import Lottie from 'react-lottie';
import animationData from '@assets/maka_lottie.json';

interface IProps {
  width?: number;
  height?: number;
}

/** 마카 로티 컴포넌트 */
const Maka = ({ width, height }: IProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie options={defaultOptions} height={height ? height : 400} width={width ? width : 400} />
  );
};

export default Maka;
