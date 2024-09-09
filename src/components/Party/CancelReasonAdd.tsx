import { useState } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';

// libs
import { PartyRoleTypes } from '@libs/getPartyRoleType';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useAddReasonMutation } from '@hooks/apis/Party/useCancelReasonMutation';



/** 모임 취소 이유 추가 컴포넌트 */
const CancelReasonAdd = () => {
  const reasonText = useInput('');
  const { closeModal } = useModal();
  const { mutate: addReason } = useAddReasonMutation();
  const { showWarningToastMessage } = useToastify();

  const [roleType, setRoleType] = useState<string>('HOST');

  // 모임 취소 이유 역할 선택 함수
  const handleSelectRole = (selected: { value: string; label: string }) => {
    setRoleType(selected.value);
  };

  // 모임 취소 이유 추가
  const handleAddReason = () => {
    if (reasonText.value === '') {
      showWarningToastMessage('모임 취소 이유를 입력해주세요.');
      return;
    }
    addReason({
      partyRoleType: roleType,
      reason: reasonText.value,
    });

    closeModal();
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Dropdown options={PartyRoleTypes} onSelect={handleSelectRole} placeholder="주최자" />
        <Input label="취소 이유" value={reasonText.value} onChange={reasonText.onChange} />

        <ButtonWrapper>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={handleAddReason}>추가</Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default CancelReasonAdd;

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
