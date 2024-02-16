import React from 'react';
import styled from 'styled-components';

// icons
import { IoClose } from 'react-icons/io5';

import { tagType } from './DropSelector';

interface IProps {
  children?: React.ReactNode;
  color?: string;
  pk?: number;
  name?: string;
  onClick?: (tag: tagType) => void;
  onClickDelete?: () => void;
}

/** 태그 컴포넌트 */
const Tag = ({ children, color, pk = 1, name = '', onClick, onClickDelete }: IProps) => {
  return (
    <StyledTag
      $color={color}
      onClick={() => {
        if (onClick) {
          onClick({ id: pk, name: name });
        }
      }}
    >
      {children}
      {onClickDelete && <CloseIcon />}
    </StyledTag>
  );
};

export default Tag;

const StyledTag = styled.div<{ $color?: string }>`
  width: fit-content;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  background-color: ${(props) => (props.$color ? props.$color : props.theme.green)};
  cursor: pointer;
`;

const CloseIcon = styled(IoClose)``;
