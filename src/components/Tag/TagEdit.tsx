import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';
import useToastify from '@hooks/useToastify';
import { useAddEditTagMutation } from '@hooks/apis/Tag/useAddEditTagMutation';

interface IProps {
  tagType: string;
  selectedTag?: any;
}

/** 태그 수정 컴포넌트 */
const TagEdit = ({ tagType, selectedTag }: IProps) => {
  const tagName = useInput('');
  const { openModal } = useModal();
  const { mutate: addEditTag } = useAddEditTagMutation();

  // 수정 확인 모달 열기
  const handleOpenEditModal = () => {
    openModal({
      content: <div>태그를 수정하시겠습니까?</div>,
      onConfirm: handleAddEditTag,
    });
  };

  // 폼 추가 및 수정
  const handleAddEditTag = () => {
    addEditTag({
      tagType: tagType,
      name: tagName.value,
      id: selectedTag.id ? selectedTag.id : null,
    });
  };

  // 선택된 태그가 변경될시 초기 인풋 설정
  useEffect(() => {
    tagName.setData(selectedTag?.name || '');
  }, [selectedTag]);

  return (
    <Wrapper>
      <InputWrapper>
        <Input value={tagName.value} onChange={tagName.onChange} label="태그명" />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={handleOpenEditModal}>수정</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TagEdit;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled.div``;

const ButtonWrapper = styled.div`
  width: 100%;
`;
