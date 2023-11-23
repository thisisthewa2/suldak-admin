import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactNode;
  isMobile: boolean;
  isTablet: boolean;
}

/** Row 컨테이너 컴포넌트 */
const RowContainer = ({ children, isMobile, isTablet }: IProps) => {
  return (
    <Wrapper $isMobile={isMobile} $isTablet={isTablet}>
      {children}
    </Wrapper>
  );
};

export default RowContainer;

interface IWrapperProps {
  $isTablet: boolean;
  $isMobile: boolean;
}
const Wrapper = styled.div<IWrapperProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  ${(props) =>
    props.$isTablet &&
    `
    grid-template-columns: repeat(8, 1fr);
  `}

  ${(props) =>
    props.$isMobile &&
    `
    grid-template-columns: 1fr;
  `}
`;
