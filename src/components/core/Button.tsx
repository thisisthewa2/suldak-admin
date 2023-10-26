import styled from 'styled-components';

interface IProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<IProps>`
  background-color: ${(props) => props.theme.primary};
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }: IProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
