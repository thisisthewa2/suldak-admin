import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';
import ImageUploader from '@components/core/ImageUploader';

// utils
import { TagTypes } from '@libs/getTagType';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useAddFormTagMutation, useAddTagMutation } from '@hooks/apis/Tag/useTagMutation';

interface IProps {}

/** 태그 추가 컴포넌트 */
const TagAdd = ({}: IProps) => {
  const tagName = useInput('');
  const { closeModal } = useModal();
  const { mutate: addTag } = useAddTagMutation();
  const { mutate: addFormTag } = useAddFormTagMutation();
  const { showWarningToastMessage } = useToastify();

  const [fileType, setFileType] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [tagType, setTagType] = useState<string>('drinking-capacity');

  // 태그 목록 타입 선택 함수
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  // 태그 추가
  const handleAddTag = () => {
    const formData = new FormData();

    if (tagName.value === '') {
      showWarningToastMessage('태그명을 입력해주세요.');
      return;
    }

    if (imgFile) {
      const liquorNameDto = {
        name: tagName.value,
      };

      formData.append('file', imgFile);
      formData.append('liquorSnackDto', JSON.stringify(liquorNameDto));

      addFormTag({ formD: formData, tagType });
    } else {
      addTag({
        tagType,
        name: tagName.value,
      });
    }

    closeModal();
  };

  // 이미지 변경 함수
  const handleFileChange = (selectedFile: File | null) => {
    setImgFile(selectedFile);
  };

  useEffect(() => {
    if (['liquor-name', 'liquor-snack'].includes(tagType)) {
      setFileType(true);
    } else {
      setFileType(false);
    }
  }, [tagType]);

  return (
    <Wrapper>
      <FormWrapper>
        <Dropdown options={TagTypes} onSelect={handleSelectType} placeholder="주량" />
        <Input label="태그명" value={tagName.value} onChange={tagName.onChange} />
        {fileType && <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} />}

        <ButtonWrapper>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={handleAddTag}>추가</Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default TagAdd;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
