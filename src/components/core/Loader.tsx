import Lottie from 'react-lottie';
import animationData from '@assets/loading_lottie.json';

/** 로딩시 보여줄 로딩 애니메이션 컴포넌트 */
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={200} width={200} />;
};

export default Loader;
