import { useState } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';

// libs
import { PartyTagTypes } from '@libs/getTagType';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useAddPartyTagMutation } from '@hooks/apis/Party/usePartyTagMutation';

/** 모임 태그 추가 컴포넌트 */
const PartyTagAdd = () => {
  const tagName = useInput('');
  const { closeModal } = useModal();
  const { mutate: addPartyTag } = useAddPartyTagMutation();
  const { showWarningToastMessage } = useToastify();

  const [tagType, setTagType] = useState<string>('party-tag');

  // 모임 태그목록 타입선택 함수 (현재 party-tag만 존재)
  const handleSelectType = (selected: { value: string; label: string }) => {
    setTagType(selected.value);
  };

  // 모임 태그 추가
  const handleAddTag = () => {
    if (tagName.value === '') {
      showWarningToastMessage('태그명을 입력해주세요.');
      return;
    }
    addPartyTag({
      tagType: tagType,
      name: tagName.value,
    });

    closeModal();
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Dropdown options={PartyTagTypes} onSelect={handleSelectType} placeholder="모임 태그" />
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

export default PartyTagAdd;

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
