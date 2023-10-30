import Lottie from 'react-lottie';
import animationData from '@assets/404_error_lottie.json';

/** 404 로티 애니메이션 */
const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default NotFound;
