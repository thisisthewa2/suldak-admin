import styled from 'styled-components';

// components
import Table, { IColumn } from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useGetFeedBackQuery } from '@hooks/apis/Party/useFeedBackQuery';
import useModal from '@hooks/useModal';
import FeedBackDetail from './FeedBackDetail';

interface IProps {
  searchKeyword?: string;
}

/** 모임 피드백 컴포넌트 */
const FeedBackList = ({ searchKeyword = '' }: IProps) => {
  const { openModal } = useModal();
  const { data: feedbackList } = useGetFeedBackQuery();

  const filteredData = useSearchFilter(
    feedbackList?.data?.content || [],
    searchKeyword,
    ['id', 'feedbackType'],
  );

  // 피드백 상세 정보 모달 열기
  const handleOpenDetailModal = (row: any) => {
    openModal({
      title: '피드백 상세 정보',
      content: <FeedBackDetail selectedFeedBack={row} />,
      isCloseBtn: true,
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: 'ID',
      accessor: 'id',
      width: '20%',
    },
    {
      Header: '피드백 타입',
      accessor: 'feedbackType',
      width: '20%',
    },
    {
      Header: '작성자 닉네임',
      accessor: 'writerNickname',
      width: '20%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        <ButtonWrap>
          <Button onClick={() => handleOpenDetailModal(row)}>상세</Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'left',
    },
  ];

  return (
    <>
      <div>
        {feedbackList && <Table data={filteredData} columns={columns} />}
      </div>
    </>
  );
};

export default FeedBackList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
