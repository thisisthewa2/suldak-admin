import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import { useEditPartyTagMutation } from '@hooks/apis/Party/usePartyTagMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedTag: any;
  tagType: string;
}

//** 모임 태그 수정 컴포넌트 */
const PartyTagEdit = ({ selectedTag, tagType }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editPartyTag } = useEditPartyTagMutation();

  const tagText = useInput(selectedTag.name);

  // 모임 태그명 수정
  const handleEditTag = () => {
    editPartyTag({
      name: tagText.value,
      tagType: tagType,
      priKey: selectedTag.id,
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

export default PartyTagEdit;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
