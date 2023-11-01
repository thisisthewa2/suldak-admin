import styled from 'styled-components';

interface IProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'confirm' | 'cancel' | 'reset';
  width?: string;
}

interface IStyledProps {
  $buttonType?: 'confirm' | 'cancel' | 'reset';
  $width?: string;
}

const StyledButton = styled.button<IStyledProps>`
  width: ${({ $width }) => ($width ? $width : 'fit-content')};
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.2s;

  background-color: ${(props) => {
    switch (props.$buttonType) {
      case 'confirm':
        return props.theme.green;
      case 'cancel':
        return props.theme.red;
      case 'reset':
        return props.theme.gray;
      default:
        return props.theme.primary;
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.$buttonType) {
        case 'confirm':
          return props.theme.greenHover;
        case 'cancel':
          return props.theme.redHover;
        case 'reset':
          return props.theme.grayHover;
        default:
          return props.theme.primaryHover;
      }
    }};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = ({ children, buttonType, width, ...props }: IProps) => {
  return (
    <StyledButton {...props} $buttonType={buttonType} $width={width}>
      {children}
    </StyledButton>
  );
};

export default Button;
