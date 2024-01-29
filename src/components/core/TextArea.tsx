import styled from 'styled-components';

interface IProps {
  label?: string;
  placeholder?: string;
  // onChange?: (e: React.ChangeEventHandler<HTMLTextAreaElement>) => void;
  name?: string;
}

const TextArea = ({ label, placeholder, name }: IProps) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledTextArea
        placeholder={placeholder}
        name={name}
        // onChange={onChange}
      />
    </Wrapper>
  );
};

export default TextArea;

const Wrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
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
