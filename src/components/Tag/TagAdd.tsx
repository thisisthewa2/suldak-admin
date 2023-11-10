import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';

// utils
import { TagTypes } from '@libs/getTagType';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useAddTagMutation } from '@hooks/apis/Tag/useTagMutation';

interface IProps {}

/** 태그 추가 컴포넌트 */
const TagAdd = ({}: IProps) => {
  const tagName = useInput('');
  const { closeModal } = useModal();
  const { mutate: addTag } = useAddTagMutation();
  const { showWarningToastMessage } = useToastify();

  const [tagType, setTagType] = useState<string>('drinking-capacity');

  // 태그 목록 타입 선택 함수
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  // 태그 추가
  const handleAddTag = () => {
    if (tagName.value === '') {
      showWarningToastMessage('태그명을 입력해주세요.');
      return;
    }
    addTag({
      tagType: tagType,
      name: tagName.value,
    });

    closeModal();
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Dropdown options={TagTypes} onSelect={handleSelectType} placeholder="주량" />
        <Input label="태그명" value={tagName.value} onChange={tagName.onChange} />

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
