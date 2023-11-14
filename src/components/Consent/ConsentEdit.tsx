import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import TextEditor from '@components/core/TextEditor';
import Button from '@components/core/Button';

// hooks
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { useEditConsentMutation } from '@hooks/apis/Consent/useConsentMutation';

interface IProps {
  selectedConsent?: any;
}

/** 동의 항목 수정 컴포넌트 */
const ConsentEdit = ({ selectedConsent }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editConsent } = useEditConsentMutation();

  useEffect(() => {
    console.log(selectedConsent);
  }, []);

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
