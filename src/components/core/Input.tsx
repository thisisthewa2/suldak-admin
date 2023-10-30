import styled from 'styled-components';

interface IProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterKeyDown?: () => void;
}

const Input = ({ label, onEnterKeyDown, ...props }: IProps) => {
  // 엔터키 입력시 실행할 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterKeyDown) {
      onEnterKeyDown();
    }
  };

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} onKeyDown={handleKeyDown} />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div``;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => props.theme.form.border};
  border-radius: 0.25rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: ${(props) => props.theme.componentBgColor};
  color: ${(props) => props.theme.text.primary};

  &:focus {
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
    outline: none;
  }
`;
