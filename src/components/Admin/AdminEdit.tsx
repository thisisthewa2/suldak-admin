import React, { useEffect } from "react";
import styled from "styled-components";

// components
import Input from "@components/core/Input";
import Button from "@components/core/Button";

// hooks
import useModal from "@hooks/useModal";
import useInput from "@hooks/useInput";
import { useEditAdminMutation } from "@hooks/apis/Admin/useAdminMutation";

interface IProps {
  selectedAdmin?: any;
}

/** 어드민 수정 컴포넌트 */
const AdminEdit = ({ selectedAdmin }: IProps) => {
  const { openModal } = useModal();
  const { mutate: adminEdit } = useEditAdminMutation();

  const adminName = useInput("");
  const adminId = useInput("");

  // 선택된 어드민이 변경될시 초기 인풋 설정
  useEffect(() => {
    adminName.setData(selectedAdmin?.adminNm || "");
    adminId.setData(selectedAdmin?.adminId || "");
  }, [selectedAdmin]);

  // 어드민 수정 확인 모달 열기
  const handleOpenEditModal = () => {
    console.log(selectedAdmin.id);
    openModal({
      content: <div>관리자 정보를 수정하시겠습니까?</div>,
      onConfirm: handleEditAdmin,
    });
  };

  // 어드민 수정
  const handleEditAdmin = () => {
    adminEdit({
      adminId: adminId.value,
      adminNm: adminName.value,
      adminPw: "",
      priKey: selectedAdmin.id,
    });
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          value={adminName.value}
          onChange={adminName.onChange}
          label="이름"
        />
        <Input
          value={adminId.value}
          onChange={adminId.onChange}
          label="아이디"
        />
      </InputWrapper>
      <ButtonWrapper>
        {selectedAdmin && <Button onClick={handleOpenEditModal}>수정</Button>}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default AdminEdit;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  width: 100%;
  margin-top: 1rem;
`;
