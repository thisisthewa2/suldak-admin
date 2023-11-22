import { useState, useEffect } from 'react';

const sizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1280, // 이 값은 주로 디자인에 따라 다를 수 있습니다.
};

/** 반응형 커스텀훅 */
function useResponsive() {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile: windowSize <= sizes.mobile,
    isTablet: windowSize > sizes.mobile && windowSize <= sizes.tablet,
    isDesktop: windowSize > sizes.tablet,
  };
}

export default useResponsive;
