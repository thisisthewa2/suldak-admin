import { useAtom } from 'jotai';

// atoms
import { darkModeAtom } from '@atoms/themeAtoms'

/** 테마 관리 커스텀훅 */
const useTheme = () => {
  const [isDarkMode, setDarkMode] = useAtom(darkModeAtom)

  // 다크모드 변경 토글 함수
  const toggleDarkMode = () => {
    setDarkMode((isDarkMode) => isDarkMode === "light" ? "dark" : "light")
  }

  return { isDarkMode, toggleDarkMode }
};

export default useTheme;
