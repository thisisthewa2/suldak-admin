import React from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import { useEditQuesitonMutation } from '@hooks/apis/Question/useQuestionMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedQuestion?: any;
}

const QuestionEdit = ({ selectedQuestion }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editQuestion } = useEditQuesitonMutation();

  const questionText = useInput(selectedQuestion.qtext);

  // 프로필 질문 수정
  const handleEditQuestion = () => {
    console.log(questionText.value);
    editQuestion({
      priKey: selectedQuestion.prikey,
      qindex: selectedQuestion.qindex,
      qtext: questionText.value,
    });
  };

  return (
    <>
      <Input
        label="프로필 질문"
        value={questionText.value}
        onChange={questionText.onChange}
      />

      <ButtonWrap>
        <Button onClick={closeModal} buttonType="reset">
          닫기
        </Button>
        <Button onClick={handleEditQuestion}>수정</Button>
      </ButtonWrap>
    </>
  );
};

export default QuestionEdit;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
