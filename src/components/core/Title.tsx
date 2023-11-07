import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactNode;
}

/** 컴포넌트 상단에 들어갈 타이틀 컴포넌트 */
const Title = ({ children }: IProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.div`
  color: ${(props) => props.theme.text.primary};
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
