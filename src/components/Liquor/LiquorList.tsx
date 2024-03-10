import styled from 'styled-components';
import { BASE_URL } from '@apis/interceptor';

// components
import Table, { IColumn } from '@components/core/Table';
import Button from '@components/core/Button';
import TableWithPagination from '@components/core/TableWithPagination';

// hooks
import { useGetLiquorQuery } from '@hooks/apis/Liquor/useLiquorQuery';
import { useSearchFilter } from '@hooks/useSearchFilter';
import useModal from '@hooks/useModal';

interface SearchProps {
  pageNum: number;
  recordSize: number;
}

interface IProps {
  params: SearchProps;
  onChangePage: (page: number) => void;
}

/** 술 목록 컴포넌트 */
const LiquorList = ({ params, onChangePage }: IProps) => {
  const { data: liquorList } = useGetLiquorQuery(params);
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
      <TableWithPagination
        data={liquorList.data.content}
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
