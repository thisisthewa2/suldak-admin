import styled from 'styled-components';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';
import RecommendEdit from '@components/Recommend/RecommendEdit';

// hooks
import useModal from '@hooks/useModal';
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useDeleteRecommendMutation } from '@hooks/apis/Recommend/useRecommendMutation';
import { useGetRecommendQuery } from '@hooks/apis/Recommend/useRecommendQuery';
import { useHandleActiveRecommendMutation } from '@hooks/apis/Recommend/useRecommendMutation';

// types
import { IColumn } from '@components/core/Table';

// 추천 검색어 조회 Props
interface IProps {
  searchType: string;
  isActive: boolean;
  searchKeyword?: string;
}

/** 추천 검색어 목록 컴포넌트 */
const RecommendList = ({
  searchType,
  isActive,
  searchKeyword = '',
}: IProps) => {
  const { openModal } = useModal();
  const { data: recommendList } = useGetRecommendQuery({searchType, isActive});
  const filteredData = useSearchFilter(recommendList?.data || [], searchKeyword, [
    'id',
    'text',
  ]);

  // 추천 검색어 활성화 여부 변경
  const { mutate: handleActive } = useHandleActiveRecommendMutation();
  
  // 추천 검색어 삭제
  const { mutate: deleteRecommend } = useDeleteRecommendMutation();

  // 추천 검색어 활성화 여부 변경 함수
  const handleActiveRecommend = (priKey: number) => {
    handleActive({
      priKey,
    });
  };

  // 추천 검색어 삭제 함수
  const handleDeleteRecommend = (priKey: number) => {
    deleteRecommend({
      priKey,
    });
  };

  // 추천 검색어 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '추천 검색어 수정',
      content: <RecommendEdit selectedRecommend={row} />,
    });
  };

  // 추천 검색어 활성화 여부 모달 열기
  const handleOpenActiveModal = (priKey: number) => {
    
    openModal({
      content: <div>추천 검색어 활성 상태를 변경 하시겠습니까?</div>,
      onConfirm: () => handleActiveRecommend(priKey),
    });
  }

  // 추천 검색어 삭제 모달 열기
  const handleOpenDeleteModal = (priKey: number) => {
    openModal({
      content: <div>추천 검색어를 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteRecommend(priKey),
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '아이디',
      accessor: 'id',
      width: '20%',
    },
    {
      Header: '검색어 명',
      accessor: 'text',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button 
            buttonType='confirm'
            onClick={() => handleOpenActiveModal(row.id)}
          >
            변경
          </Button>
          <Button onClick={() => handleOpenEditModal(row)}>수정</Button>
          <Button
            buttonType="cancel"
            onClick={() => handleOpenDeleteModal(row.id)}
          >
            삭제
          </Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'right',
    },
  ];

  return (
    <>
      <div>
        {recommendList && <Table data={filteredData} columns={columns} />}
      </div>
    </>
  );
};

export default RecommendList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
