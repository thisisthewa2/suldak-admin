import styled from 'styled-components';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useDeleteAdminMutation } from '@hooks/apis/Admin/useAdminMutation';
import { useGetAdminQuery } from '@hooks/apis/Admin/useAdminQuery';
import useModal from '@hooks/useModal';

// types
import { IColumn } from '@components/core/Table';

interface IProps {
  searchKeyword?: string;
  selectAdmin: (row: any) => void;
}

/** 어드민 목록 컴포넌트 */
const AdminList = ({ searchKeyword = '', selectAdmin }: IProps) => {
  const { openModal } = useModal();
  const { data: adminList } = useGetAdminQuery();
  const filteredData = useSearchFilter(adminList?.data || [], searchKeyword, 'adminNm');

  const { mutate: deleteAdmin } = useDeleteAdminMutation();

  // 어드민 삭제 확인 모달 열기
  const handleOpenDeleteModal = (priKey: number) => {
    openModal({
      content: <div>어드민을 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteAdmin(priKey),
    });
  };

  // 어드민 삭제 함수
  const handleDeleteAdmin = (priKey: number) => {
    deleteAdmin({
      priKey: priKey,
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '아이디',
      accessor: 'adminId',
      width: '20%',
    },
    {
      Header: '관리자명',
      accessor: 'adminNm',
      width: '20%',
    },
    {
      Header: '생성일자',
      accessor: 'createdAt',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        <ButtonWrap>
          <Button onClick={() => selectAdmin(row)}>수정</Button>
          <Button buttonType="cancel" onClick={() => handleOpenDeleteModal(row.id)}>
            삭제
          </Button>
        </ButtonWrap>
      ),
      width: '30%',
      align: 'right',
    },
  ];

  return <TableWrap>{adminList && <Table data={filteredData} columns={columns} />}</TableWrap>;
};

export default AdminList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const TableWrap = styled.div`
  width: 100%;
  height: 100%;
`;
