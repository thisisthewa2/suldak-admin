import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import { useEditReasonMutation } from '@hooks/apis/Party/useCancelReasonMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedReason: any;
  roleType: string;
}

//** 모임 취소 이유 수정 컴포넌트 */
const CancelReasonEdit = ({ selectedReason, roleType }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editReason } = useEditReasonMutation();

  const reasonText = useInput(selectedReason.reason);

  // 모임 취소 이유 수정
  const handleEditTag = () => {
    editReason({
      reason: reasonText.value,
      partyRoleType: roleType,
      priKey: selectedReason.id,
    });
    closeModal();
  };

  return (
    <>
      <Input label="취소 이유" value={reasonText.value} onChange={reasonText.onChange} />

      <ButtonWrap>
        <Button onClick={closeModal} buttonType="reset">
          닫기
        </Button>
        <Button onClick={handleEditTag}>수정</Button>
      </ButtonWrap>
    </>
  );
};

export default CancelReasonEdit;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
