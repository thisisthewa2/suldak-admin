import React from 'react';
import styled from 'styled-components';

interface IProps {
  label?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

const ImageUploader = ({ label, file, onChange }: IProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    onChange(selectedFile);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <input type="file" onChange={handleFileChange} />
      {file && <Preview src={URL.createObjectURL(file)} alt="Selected Image" />}
    </Wrapper>
  );
};

export default ImageUploader;

const Wrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
`;

const Preview = styled.img`
  max-width: 100%;
  margin-top: 0.5rem;
`;
