import React from 'react';
import styled from 'styled-components';



interface IProps {
  children?: React.ReactNode;
  color?: string;
}

/** 태그 컴포넌트 */
const Tag = ({ children, color }: IProps) => {
  return <StyledTag $color={color}>{children}</StyledTag>;
};

export default Tag;

const StyledTag = styled.div<{ $color?: string }>`
  width: fit-content;
  color: white;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  background-color: ${(props) => (props.$color ? props.$color : props.theme.green)};
`;
