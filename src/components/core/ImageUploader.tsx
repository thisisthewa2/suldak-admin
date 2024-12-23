import React from 'react';
import styled from 'styled-components';
import Button from '@components/core/Button';
import { BASE_URL } from '@apis/interceptor';

interface IProps {
  label?: string;
  eFile?: string; // 현재 존재하는 파일
  file: File | null;
  onChange: (file: File | null) => void;
}

const ImageUploader = ({ label, eFile, file, onChange }: IProps) => {
  const isShowPreview = eFile && !file;
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    onChange(selectedFile);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <ImageUploaderContainer>
        {isShowPreview && <Preview src={`${BASE_URL}${eFile}`} alt="Existed Image"/>}
        {file && <Preview src={URL.createObjectURL(file)} alt="Selected Image" />}
        <Button onClick={handleButtonClick}>불러오기</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </ImageUploaderContainer>
    </Wrapper>
  );
};

export default ImageUploader;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageUploaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
  min-width: 100px;
  width: 200px;
`;

const Preview = styled.img`
  margin-top: 0.5rem;
  width: 250px;
  height: 250px;
`;