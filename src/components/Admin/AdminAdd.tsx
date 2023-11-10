import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useAddAdminMutation } from '@hooks/apis/Admin/useAdminMutation';

/** 어드민 추가 컴포넌트 */
const AdminAdd = () => {
  const { closeModal } = useModal();
  const { mutate: addAdmin } = useAddAdminMutation();
  const { showWarningToastMessage } = useToastify();

  const adminName = useInput('');
  const adminId = useInput('');
  const adminPw = useInput('');

  // 어드민 추가
  const handleAddAdmin = () => {
    if (adminName.value === '' || adminId.value === '' || adminPw.value === '') {
      showWarningToastMessage('데이터를 모두 입력해주세요.');
      return;
    }
    addAdmin({
      adminNm: adminName.value,
      adminId: adminId.value,
      adminPw: adminPw.value,
    });

    closeModal();
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Input value={adminName.value} onChange={adminName.onChange} label="이름" />
        <Input value={adminId.value} onChange={adminId.onChange} label="아이디" />
        <Input value={adminPw.value} onChange={adminPw.onChange} label="비밀번호" />

        <ButtonWrapper>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={handleAddAdmin}>추가</Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default AdminAdd;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
