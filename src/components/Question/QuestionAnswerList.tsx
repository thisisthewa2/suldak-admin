import React, { useState } from 'react';
import styled from 'styled-components';

// icons
import { FaPlus } from 'react-icons/fa';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';
import QuestionAnswerBox from '@components/Question/QuestionAnswerBox';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useGetAnswerQuery } from '@hooks/apis/Question/useAnswerQuery';
import { useAnswerAddMutation } from '@hooks/apis/Question/useAnswerMutation';

export type AnswerType = {
  questionPriKey: number;
};

interface IProps {
  questionPriKey: number;
}

const QuestionAnswerList = ({ questionPriKey }: IProps) => {
  const { closeModal } = useModal();
  const { showWarningToastMessage } = useToastify();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const { data: answerList } = useGetAnswerQuery(questionPriKey);
  const { mutate: add } = useAnswerAddMutation();

  const answerText = useInput('');
  const aIndexValue = answerList.data.liquorAnswerRes.length;

  // 답변 추가 폼 열기/닫기
  const handleSetIsAddOpen = (isOpen: boolean) => {
    setIsAddOpen(isOpen);

    if (isOpen === false) {
      answerText.setValue('');
    }
  };

  const handleAddAnswer = () => {
    if (answerText.value === '') {
      showWarningToastMessage('프로필 질문 답변 내용이 비어있습니다.');
      return;
    }
    add({
      aindex: aIndexValue + 1,
      atext: answerText.value,
      questionPriKey,
    });
    handleSetIsAddOpen(false);
  };

  return (
    <AnswerWrap>
      <TitleWrap>
        <Title>답변 목록</Title>
        <PlusIcon onClick={() => handleSetIsAddOpen(true)} />
      </TitleWrap>

      {isAddOpen && (
        <AddFormWrap>
          <Input
            value={answerText.value}
            onChange={answerText.onChange}
            label="답변 내용"
          />
          <AddButtonWrap>
            <Button
              onClick={() => handleSetIsAddOpen(false)}
              buttonType="reset"
            >
              취소
            </Button>
            <Button onClick={handleAddAnswer}>추가</Button>
          </AddButtonWrap>
        </AddFormWrap>
      )}

      <AnswerListWrap>
        {answerList.data.liquorAnswerRes.map((answer: any) => (
          <QuestionAnswerBox
            key={answer.priKey}
            aindex={answer.aindex}
            atext={answer.atext}
            priKey={answer.priKey}
            questionPriKey={answer.questionPriKey}
          />
        ))}
      </AnswerListWrap>
    </AnswerWrap>
  );
};

export default QuestionAnswerList;

const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.div`
  display: block;
  color: ${(props) => props.theme.text.primary};
`;

const AnswerListWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: scroll;
  gap: 0.25rem;
`;

const PlusIcon = styled(FaPlus)`
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const AddFormWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;

const AddButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
