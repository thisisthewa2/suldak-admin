import React from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import { useEditAdminMutation } from '@hooks/apis/Admin/useAdminMutation';
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';

interface IProps {
  selectedAdmin: any;
}

const AdminEdit = ({ selectedAdmin }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editAdmin } = useEditAdminMutation();

  const adminName = useInput(selectedAdmin.adminNm);
  const adminId = useInput(selectedAdmin.adminId);

  // 어드민 정보 수정
  const handleEditAdmin = () => {
    editAdmin({
      adminId: adminId.value,
      adminNm: adminName.value,
      priKey: selectedAdmin.adminUserId,
      adminPw: '',
    });
    closeModal();
  };

  return (
    <>
      <Input
        label="이름"
        value={adminName.value}
        onChange={adminName.onChange}
      />
      <Input label="아이디" value={adminId.value} onChange={adminId.onChange} />
      <ButtonWrap>
        <Button onClick={closeModal} buttonType="reset">
          닫기
        </Button>
        <Button onClick={handleEditAdmin}>수정</Button>
      </ButtonWrap>
    </>
  );
};

export default AdminEdit;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
