import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import ImageUploader from '@components/core/ImageUploader';
import Button from '@components/core/Button';

// hooks
import { useEditTagMutation, useEditFormTagMutation } from '@hooks/apis/Tag/useTagMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedTag: any;
  tagType: string;
}

const TagEdit = ({ selectedTag, tagType }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editTag } = useEditTagMutation();
  const { mutate: editFormTag } = useEditFormTagMutation();

  const [imgFile, setImgFile] = useState<File | null>(null);

  // 수정 전 이미지 파일
  const existImgFile = selectedTag.fileBaseNm;

  const tagText = useInput(selectedTag.name);

  // 태그 수정
  const handleEditTag = () => {
    const editFormData = new FormData();

    if (tagType === 'liquor-name' || tagType === 'liquor-snack') {
      const liquorSnackDto = {
        name: tagText.value,
      };

      editFormData.append('liquorNameDto', JSON.stringify(liquorSnackDto));

      if (imgFile !== null) {
        editFormData.append('file', imgFile);
      }

      editFormTag({
        eFormD: editFormData,
        priKey: selectedTag.id,
        tagType,
      });
    } else {
      editTag({
        name: tagText.value,
        priKey: selectedTag.id,
        tagType,
      });
    }

    closeModal();
  };

  // 이미지 변경 함수
  const handleFileChange = (selectedFile: File | null) => {
    setImgFile(selectedFile);
  };

  return (
    <>
      <Input label="태그명" value={tagText.value} onChange={tagText.onChange} />
      {(tagType === 'liquor-name' || tagType === 'liquor-snack') && (
        <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} eFile={existImgFile} />
      )}

      <ButtonWrap>
        <Button onClick={closeModal} buttonType="reset">
          닫기
        </Button>
        <Button onClick={handleEditTag}>수정</Button>
      </ButtonWrap>
    </>
  );
};

export default TagEdit;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
