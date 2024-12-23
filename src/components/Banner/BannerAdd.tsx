import { useState } from 'react';
import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Dropdown from '@components/core/Dropdown';
import Input from '@components/core/Input';
import ImageUploader from '@components/core/ImageUploader';

// hooks
import useModal from '@hooks/useModal';
import useFormInput from '@hooks/useFormInput';
import { useAddBannerMutation } from '@hooks/apis/Banner/useBannerMutation';

// libs
import { BannerCategory, BannerActive } from '@libs/getBannerType';


/** 배너 추가 컴포넌트 */
const BannerAdd = () => {
  const { closeModal } = useModal();
  const { mutate: addBanner } = useAddBannerMutation();
  // 배너 상태
  const [bannerCategory, setBannerCategory] = useState('BANNER_TOP');
  const [isActive, setBannerActive] = useState(true);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useFormInput({
    title: '',
    subTitle: '',
    connectUrl: '',
  });

  // 배너 추가
  const handleAddBanner = () => {
    const formData = new FormData();

    if (imgFile) {
      formData.append('file', imgFile);
    }

    const bannerReq = {
      bannerCategory: bannerCategory,
      isActive: isActive,
      title: inputValue.title,
      subTitle: inputValue.subTitle,
      connectUrl: inputValue.connectUrl,
    };
    formData.append('bannerReq', JSON.stringify(bannerReq));

    addBanner(formData);

    closeModal();
  };

  // 배너 카테고리 선택 함수
  const handleSelectCategory = (selected: { value: string; label: string }) => {
    setBannerCategory(selected.value);
  };

  // 배너 활성화 타입 선택 함수
  const handleSelectActive = (selected: { value: boolean; label: string }) => {
    setBannerActive(selected.value);
  };

  // 이미지 변경 함수
  const handleFileChange = (selectedFile: File | null) => {
    setImgFile(selectedFile);
  };

  return (
    <>
      <FormWrapper>
        <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} />
        <DropdownWrapper>
          <label>배너 분류</label>
          <Dropdown
            options={BannerCategory}
            onSelect={handleSelectCategory}
            placeholder="상단 배너"
          />
        </DropdownWrapper>
        <DropdownWrapper>
          <label>배너 활성화 여부</label>
          <Dropdown
            options={BannerActive}
            onSelect={handleSelectActive}
            placeholder="활성화"
          />
        </DropdownWrapper>
        <Input 
          name='title'
          label="배너 제목"
          value={inputValue.title}
          onChange={setInputValue}
          placeholder='배너 제목을 입력해주세요.'
        />
        <Input 
          name='subTitle'
          label="배너 부제"
          value={inputValue.subTitle}
          onChange={setInputValue}
          placeholder='배너 부제목을 입력해주세요.'
        />
        <Input 
          name='connectUrl'
          label="URL"
          value={inputValue.connectUrl}
          onChange={setInputValue}
          placeholder='배너가 이동할 URL을 입력해주세요.'
        />

        <ButtonWrap>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={handleAddBanner}>추가</Button>
        </ButtonWrap>
      </FormWrapper>
    </>
  );
};

export default BannerAdd;

const FormWrapper = styled.div`
  width: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  label {
    display: block;
    color: ${(props) => props.theme.text.primary};
    width: 200px;
    margin-bottom: 0.25rem;
  }
`;