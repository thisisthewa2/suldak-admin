import Lottie from 'react-lottie';
import animationData from '@assets/404_error_lottie.json';
import animationDataWhite from '@assets/404_error_lottie_white.json';

// hooks
import useTheme from '@hooks/useTheme';

interface IProps {
  width?: number;
  height?: number;
}

/** 404 로티 애니메이션 */
const NotFound = ({ width, height }: IProps) => {
  const { currentTheme } = useTheme();

  const displayLottie = currentTheme === 'DARK' ? animationDataWhite : animationData;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: displayLottie,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie options={defaultOptions} height={height ? height : 400} width={width ? width : 400} />
  );
};

export default NotFound;
