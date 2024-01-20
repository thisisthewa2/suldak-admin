import React, { useState } from 'react';
import styled from 'styled-components';

// icons
import { MdEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';

// components
import Input from '@components/core/Input';

// hooks
import useInput from '@hooks/useInput';
import { useAnswerEditMutation } from '@hooks/apis/Question/useAnswerMutation';

// types
import { AnswerType } from './QuestionAnswerList';

type BoxType = 'none' | 'edit' | 'delete';

interface IProps {
  aindex: number;
  priKey: number;
  questionPriKey: number;
  atext: string;
}

/** 질문 답변 박스 컴포넌트 */
const QuestionAnswerBox = ({
  aindex,
  priKey,
  questionPriKey,
  atext,
}: IProps) => {
  const [type, setType] = useState<BoxType>('none');

  const { mutate: edit } = useAnswerEditMutation();

  const answerInput = useInput(atext);

  // 컴포넌트 렌더링 타입 변경 함수
  const changeType = (type: BoxType) => {
    setType(type);
  };

  // 질문 답변 수정 함수
  const handleEditAnswer = () => {
    edit({
      aindex: aindex,
      priKey: priKey,
      questionPriKey: questionPriKey,
      atext: answerInput.value,
    });
    setType('none');
  };

  const returnComponent = () => {
    switch (type) {
      case 'none':
        return (
          <AnswerWrap>
            {/* 텍스트 영역 */}
            <AnswerText>{atext}</AnswerText>

            {/* 우측 아이콘 영역 */}
            <IconWrap>
              <EditIcon onClick={() => changeType('edit')} />
              <CloseIcon onClick={() => changeType('delete')} />
            </IconWrap>
          </AnswerWrap>
        );
      case 'delete':
        return (
          <AnswerWrap>
            <DeleteConfirmBox>
              <DeleteConfirmText $type={type}>
                삭제하시겠습니까?
              </DeleteConfirmText>
              <DeleteConfirmIconWrap>
                <CheckIcon />
                <CloseIcon onClick={() => changeType('none')} />
              </DeleteConfirmIconWrap>
            </DeleteConfirmBox>
          </AnswerWrap>
        );
      case 'edit':
        return (
          <EditWrap>
            <Input value={answerInput.value} onChange={answerInput.onChange} />

            <EditConfirmIconWrap>
              <CheckIcon onClick={handleEditAnswer} />
              <CloseIcon onClick={() => changeType('none')} />
            </EditConfirmIconWrap>
          </EditWrap>
        );
      default:
        return (
          <AnswerWrap>
            {/* 텍스트 영역 */}
            <AnswerText>{atext}</AnswerText>

            {/* 우측 아이콘 영역 */}
            <IconWrap>
              <EditIcon onClick={() => changeType('edit')} />
              <CloseIcon onClick={() => changeType('delete')} />
            </IconWrap>
          </AnswerWrap>
        );
    }
  };

  return <>{returnComponent()}</>;
};

export default QuestionAnswerBox;

const AnswerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const AnswerText = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
`;

const EditIcon = styled(MdEdit)`
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const CloseIcon = styled(IoClose)`
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.red};
  }
`;

const CheckIcon = styled(FaCheck)`
  transition: all 0.2s;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const DeleteConfirmBox = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteConfirmText = styled.div<{ $type: BoxType }>`
  color: ${(props) =>
    props.$type === 'delete' ? props.theme.red : props.theme.text.primary};
`;

const DeleteConfirmIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditConfirmIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
`;
