import { useAtom } from 'jotai';

// atoms
import { themeMode } from '@atoms/themeAtoms'

/** 테마 관리 커스텀훅 */
const useTheme = () => {
  const [currentTheme, setDarkMode] = useAtom(themeMode)

  // 다크모드 변경 토글 함수
  const toggleDarkMode = () => {
    setDarkMode((currentTheme) => currentTheme === "LIGHT" ? "DARK" : "LIGHT")
  }

  return { currentTheme, toggleDarkMode }
};

export default useTheme;
