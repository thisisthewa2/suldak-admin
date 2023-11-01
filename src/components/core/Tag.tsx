import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactNode;
}

/** 태그 컴포넌트 */
const Tag = ({ children }: IProps) => {
  return <StyledTag>{children}</StyledTag>;
};

export default Tag;

const StyledTag = styled.div`
  width: fit-content;
  color: white;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  background-color: ${(props) => props.theme.yellow};
`;
