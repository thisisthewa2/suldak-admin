import { useEffect } from 'react';

// components
import TextEditor from '@components/core/TextEditor';

// hooks
import useModal from '@hooks/useModal';
import { useEditConsentMutation } from '@hooks/apis/Consent/useConsentMutation';

interface IProps {
  selectedConsent?: any;
}

/** 동의 항목 수정 컴포넌트 */
const ConsentEdit = ({ selectedConsent }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editConsent } = useEditConsentMutation();

  // 동의 항목 수정
  const handleEditConsent = (data: any) => {
    editConsent({
      id: selectedConsent.id,
      itemType: selectedConsent.itemType,
      itemText: data,
    });

    closeModal();
  };

  return (
    <>
      <TextEditor
        initialValue={selectedConsent.itemText}
        cancelBtnText="취소"
        onCancel={closeModal}
        confirmBtnText="수정"
        onConfirm={handleEditConsent}
      />
    </>
  );
};

export default ConsentEdit;
