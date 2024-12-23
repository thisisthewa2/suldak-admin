import styled from 'styled-components';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';
import CancelReasonEdit from './CancelReasonEdit';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useDeleteReasonMutation } from '@hooks/apis/Party/useCancelReasonMutation';
import { useGetCancelReasonQuery } from '@hooks/apis/Party/useCancelReasonQuery';
import useModal from '@hooks/useModal';

// types
import { IColumn } from '@components/core/Table';

interface IProps {
  roleType: string;
  searchKeyword?: string;
}

/** 모임 취소 이유 목록 컴포넌트 */
const CancelReasonList = ({ roleType, searchKeyword = '' }: IProps) => {
  const { openModal } = useModal();
  const { data: cancelReasonList } = useGetCancelReasonQuery({ partyRoleType: roleType });

  const filteredData = useSearchFilter(cancelReasonList?.data || [], searchKeyword, [
    'reason',
    'id',
  ]);

  const { mutate: deleteReason } = useDeleteReasonMutation();

  // 모임 취소 이유 삭제 확인 모달 열기
  const handleOpenDeleteModal = (priKey: number) => {
    openModal({
      content: <div>모임 취소 이유를 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteReason(priKey),
    });
  };

  // 모임 취소 이유 삭제 함수
  const handleDeleteReason = (priKey: number) => {
    deleteReason({
      priKey: priKey,
    });
  };

  // 모임 취소 이유 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '모임 취소 이유 수정',
      content: <CancelReasonEdit roleType={roleType} selectedReason={row} />,
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
      Header: '취소 이유',
      accessor: 'reason',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button onClick={() => handleOpenEditModal(row)}>수정</Button>
          <Button
            onClick={() => handleOpenDeleteModal(row.id)}
            buttonType="cancel"
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
      <div>{cancelReasonList && <Table data={filteredData} columns={columns} />}</div>
    </>
  );
};

export default CancelReasonList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
