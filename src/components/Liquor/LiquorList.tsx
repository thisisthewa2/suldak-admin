import styled from 'styled-components';
import { BASE_URL } from '@apis/interceptor';

// components
import Table, { IColumn } from '@components/core/Table';
import Button from '@components/core/Button';
import TableWithPagination from '@components/core/TableWithPagination';
import LiquorEdit from '@components/Liquor/LiquorEdit';

// hooks
import { useGetLiquorQuery } from '@hooks/apis/Liquor/useLiquorQuery';
import { useSearchFilter } from '@hooks/useSearchFilter';
import useModal from '@hooks/useModal';
import { SearchParams } from '@apis/services/LiquorApi';
import { useDeleteLiquorMutation } from '@hooks/apis/Liquor/useLiquorMutation';

interface IProps {
  params: SearchParams;
  onChangePage: (page: number) => void;
  searchKeyword?: string;
}

/** 술 목록 컴포넌트 */
const LiquorList = ({ params, onChangePage, searchKeyword = '' }: IProps) => {
  const { openModal } = useModal(); 
  const { data: liquorList } = useGetLiquorQuery(params);
  
  const filteredData = useSearchFilter(liquorList?.data.content || [], searchKeyword, [
    'name',
  ]);

  const { mutate: deleteLiquor } = useDeleteLiquorMutation();

  // 술 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '술 수정',
      content: <LiquorEdit selectedLiquor={row} />,
      isCloseBtn: true,
    });
  };

  // 술 삭제 모달 열기
  const handleOpenDeleteModal = (priKey: number) => {
    openModal({
      content: <div>술을 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteLiquor(priKey),
    });
  };

  // 술 삭제 함수
  const handleDeleteLiquor = (priKey: number) => {
    deleteLiquor({
      priKey: priKey,
    });
  };

  const columns: IColumn[] = [
    {
      Header: '',
      accessor: (row: any) => (
        <img
          src={
            row.liquorPictureUrl
              ? `${BASE_URL}${row.liquorPictureUrl}`
              : 'https://i.namu.wiki/i/kaaN8gvIGQkip-KfwUCHPD9G_Ls2rurrMJsvzIXVs_h0gr-w3y2YeBfEbFgtiQ3_egAtZYnwU3IqaYPjaVM1Zw7SL-9v7pqq_qHyN8QPKh45mU4QC449P6rVBaq_96_QLi9zhSvw8wsuCGR34fVuZ5Ds_9nYO4QRjouK3-ApGAY.webp'
          }
          width={100}
          height={100}
        />
      ),
      width: '20%',
    },
    {
      Header: '이름',
      accessor: 'name',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
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
      <TableWithPagination
        data={filteredData}
        columns={columns}
        totalPage={liquorList.data.totalPages}
        currentPage={liquorList.data.pageable.pageNumber}
        onPageChange={onChangePage}
      />
    </>
  );
};

export default LiquorList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
