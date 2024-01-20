import styled from 'styled-components';

// components
import QuestionAnswerBox from '@components/Question/QuestionAnswerBox';

// hooks
import { useGetAnswerQuery } from '@hooks/apis/Question/useAnswerQuery';

export type AnswerType = {
  questionPriKey: number;
};

interface IProps {
  questionPriKey: number;
}

const QuestionAnswerList = ({ questionPriKey }: IProps) => {
  const { data: answerList } = useGetAnswerQuery(questionPriKey);
  console.log(answerList);
  return (
    <AnswerWrap>
      <Title>답변 목록</Title>
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

const Title = styled.div`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
`;

const AnswerListWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: scroll;
  gap: 0.25rem;
`;
