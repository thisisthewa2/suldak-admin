import React, { Suspense } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';
import Loader from '@components/core/Loader';
import ErrorFallback from '@components/core/ErrorFallback';

import QuestionAnswerList from '@components/Question/QuestionAnswerList';

// hooks
import { useEditQuestionMutation } from '@hooks/apis/Question/useQuestionMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedQuestion: any;
}

const QuestionEdit = ({ selectedQuestion }: IProps) => {
  const { closeModal } = useModal();
  const { reset } = useQueryErrorResetBoundary();
  const { mutate: editQuestion } = useEditQuestionMutation();

  const questionText = useInput(selectedQuestion.qtext);

  // 프로필 질문 수정
  const handleEditQuestion = () => {
    editQuestion({
      priKey: selectedQuestion.questionPriKey,
      qindex: selectedQuestion.qindex,
      qtext: questionText.value,
    });
    closeModal();
  };

  return (
    <>
      {/* 프로필 질문 영역 */}
      <Input
        label="프로필 질문"
        value={questionText.value}
        onChange={questionText.onChange}
      />

      <ButtonWrap>
        <Button onClick={handleEditQuestion}>수정</Button>
      </ButtonWrap>

      {/* 프로필 답변 영역 */}
      <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Loader />}>
          <QuestionAnswerList
            questionPriKey={selectedQuestion.questionPriKey}
          />
        </Suspense>
      </ErrorBoundary>
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
  margin-bottom: 0.5rem;
`;
