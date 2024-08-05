import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Input from '@components/core/Input';

// hooks
import useModal from '@hooks/useModal';
import useFormInput from '@hooks/useFormInput';

interface IProps {
  selectedFeedBack?: any;
}

const FeedBackDetail = ({ selectedFeedBack }: IProps) => {
  const { closeModal } = useModal();
  const [inputValue,] = useFormInput({
    partyName: selectedFeedBack?.partyName,
    feedbackType: selectedFeedBack?.feedbackType,
    badFeedbackReason: selectedFeedBack?.badFeedbackReason,
    comment: selectedFeedBack?.comment,
    writerNickname: selectedFeedBack?.writerNickname,
    targetUserNickname: selectedFeedBack?.targetUserNickname,
  });

  return (
    <>
      <FormWrapper>
        <Input 
          name='partyName'
          label="모임 이름"
          value={inputValue.partyName}
          disabled
        />
        <Input 
          name='feedbackType'
          label="피드백 분류"
          value={inputValue.feedbackType}
          disabled
        />
        <Input 
          name='badFeedbackReason'
          label="별로에요 사유"
          value={inputValue.badFeedbackReason}
          disabled
        />
        <Input 
          name='comment'
          label="평가"
          value={inputValue.comment}
          disabled
        />
        <Input 
          name='writerNickname'
          label="작성자 닉네임"
          value={inputValue.writerNickname}
          disabled
        />
        <Input 
          name='targetUserNickname'
          label="대상자 닉네임"
          value={inputValue.targetUserNickname}
          disabled
        />

        <ButtonWrap>
          <Button onClick={closeModal} buttonType="reset">
            닫기
          </Button>
        </ButtonWrap>
      </FormWrapper>
    </>
  );
};

export default FeedBackDetail;

const FormWrapper = styled.div`
  width: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
