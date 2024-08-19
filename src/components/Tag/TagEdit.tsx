import React from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import { useEditTagMutation } from '@hooks/apis/Tag/useTagMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedTag: any;
  tagType: string;
}

const TagEdit = ({ selectedTag, tagType }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editTag } = useEditTagMutation();

  const tagText = useInput(selectedTag.name);

  // 태그명 수정
  const handleEditTag = () => {
    editTag({
      id: selectedTag.id,
      name: tagText.value,
      tagType: tagType,
    });
    closeModal();
  };

  return (
    <>
      <Input label="태그명" value={tagText.value} onChange={tagText.onChange} />

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
