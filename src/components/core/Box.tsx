import React from 'react';
import styled from 'styled-components';

// hooks
import useResponsive from '@hooks/useResponsive';

interface IProps {
  children?: React.ReactNode;
  gridColumn?: string;
  gridColumnSpanTablet?: string;
  gridColumnSpanMobile?: string;
}

interface IStyledProps {
  $gridColumn?: string;
  $isTablet: boolean;
  $isMobile: boolean;
  $gridColumnSpanTablet?: string;
  $gridColumnSpanMobile?: string;
}

const StyledBox = styled.div<IStyledProps>`
  background-color: ${(props) => props.theme.componentBgColor};
  border-radius: 0.25rem;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 1rem;
  grid-column: ${(props) => (props.$gridColumn ? `span ${props.$gridColumn}` : 'span 1')};

  ${(props) =>
    props.$isTablet &&
    `
    grid-column: span ${props.$gridColumnSpanTablet || props.$gridColumn};
  `}

  ${(props) =>
    props.$isMobile &&
    `
    grid-column: span ${props.$gridColumnSpanMobile || props.$gridColumn};
  `}
`;

const Box = ({ children, gridColumn, gridColumnSpanTablet, gridColumnSpanMobile }: IProps) => {
  const { isMobile, isTablet } = useResponsive();
  return (
    <StyledBox
      $gridColumn={gridColumn}
      $isMobile={isMobile}
      $isTablet={isTablet}
      $gridColumnSpanTablet={gridColumnSpanTablet}
      $gridColumnSpanMobile={gridColumnSpanMobile}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
