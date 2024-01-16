import styled from 'styled-components';

// components
import Table, { IColumn } from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useGetQuestionQuery } from '@hooks/apis/Question/useQuestionQuery';
import useModal from '@hooks/useModal';

interface IProps {
  searchKeyword?: string;
}

/** 프로필 질문 목록 컴포넌트 */
const QuestionList = ({ searchKeyword = '' }: IProps) => {
  const { openModal } = useModal();
  const { data: questionList } = useGetQuestionQuery();

  const filteredData = useSearchFilter(
    questionList?.data || [],
    searchKeyword,
    ['qtext']
  );

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '질문',
      accessor: 'qtext',
      width: '20%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        <ButtonWrap>
          <Button>수정</Button>
          <Button buttonType="cancel">삭제</Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'right',
    },
  ];

  return (
    <>
      <div>
        {questionList && <Table data={filteredData} columns={columns} />}
      </div>
    </>
  );
};

export default QuestionList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
