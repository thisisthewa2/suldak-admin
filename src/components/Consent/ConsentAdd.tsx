import { useState } from 'react';
import styled from 'styled-components';

// components
import Dropdown from '@components/core/Dropdown';
import TextEditor from '@components/core/TextEditor';

// hooks
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';
import { useAddConsentMutation } from '@hooks/apis/Consent/useConsentMutation';

// utils
import { ConsentTypes } from '@libs/getConsentType';

// types
import { itemType } from '@apis/services/ConsentApi';
import Input from '@components/core/Input';

/** 동의 항목 추가 컴포넌트 */
const ConsentAdd = () => {
  const { closeModal } = useModal();
  const { mutate: addConsent } = useAddConsentMutation();
  // 동의 항목 타입 상태
  const [consentType, setConsentType] = useState<itemType>('TEAM_OF_SERVICE');

  const itemSeqInput = useInput('');

  // 동의 항목 타입 선택 함수
  const handleSelectType = (selected: { value: itemType; label: string }) => {
    setConsentType(selected.value);
  };

  // 동의 항목 추가
  const handleAddConsent = (data: any) => {
    addConsent({
      itemText: data,
      itemType: consentType,
      itemSeq: Number(itemSeqInput.value),
    });

    closeModal();
  };

  return (
    <>
      <FormWrapper>
        <Dropdown
          options={ConsentTypes}
          onSelect={handleSelectType}
          placeholder="서비스 이용 약관"
        />
        <div className="input-wrap">
          <Input
            value={itemSeqInput.value}
            onChange={itemSeqInput.onChange}
            placeholder="동의 항목 순서"
          />
        </div>
      </FormWrapper>
      <TextEditor
        cancelBtnText="취소"
        onCancel={closeModal}
        confirmBtnText="추가"
        onConfirm={handleAddConsent}
      />
    </>
  );
};

export default ConsentAdd;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;

  .input-wrap {
    width: 200px;
  }
`;
