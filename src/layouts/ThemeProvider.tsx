import React from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { darkTheme, lightTheme } from '@styles/theme';

// hooks
import useTheme from '@hooks/useTheme';

interface IProps {
  children: React.ReactNode;
}

/** 테마 레이아웃 */
const ThemeProvider = ({ children }: IProps) => {
  const { currentTheme } = useTheme();
  const themeObject = currentTheme === 'LIGHT' ? lightTheme : darkTheme;

  return <StyledProvider theme={themeObject}>{children}</StyledProvider>;
};

export default ThemeProvider;
