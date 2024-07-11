import { useState } from 'react';
import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Dropdown from '@components/core/Dropdown';
import ImageUploader from '@components/core/ImageUploader';
import Input from '@components/core/Input';

// hooks
import useFormInput from '@hooks/useFormInput';
import useModal from '@hooks/useModal';
import { useEditBannerMutation } from '@hooks/apis/Banner/useBannerMutation';

// libs
import { BannerCategory, BannerActive } from '@libs/getBannerType';

// 배너 수정 Props
interface IProps {
  selectedBanner?: any;
}

/** 배너 수정 컴포넌트 */
const BannerEdit = ({ selectedBanner }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editBanner } = useEditBannerMutation();
  // 수정 배너 상태
  const [bannerCategory, setBannerCategory] = useState(selectedBanner.bannerCategory);
  const [isActive, setBannerActive] = useState(selectedBanner.isActive);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [inputValue , setInputValue] = useFormInput({
    title: selectedBanner.title,
    subTitle: selectedBanner.subTitle,
  })
  // 수정 전 이미지 파일
  const existImgFile = selectedBanner?.bannerImageUrl;

  console.log("배너 카테고리:", bannerCategory);
  console.log("배너 활성화:", isActive);

  // 배너 수정
  const handleEditBanner = async (id: number) => {
    const editFormData = new FormData();
    if (imgFile) {
      editFormData.append('file', imgFile);
    }

    const bannerReq = {
      bannerCategory: bannerCategory,
      isActive: isActive,
      title: inputValue.title,
      subTitle: inputValue.subTitle,
    };
    
    editFormData.append('bannerReq', JSON.stringify(bannerReq));

    editBanner({
      id: id,
      eFormD: editFormData,
    });
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
        <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} eFile={existImgFile} />
        <DropdownWrapper>
          <label>배너 분류</label>
          <Dropdown
            options={BannerCategory}
            onSelect={handleSelectCategory}
            // 수정 할 배너 카테고리의 상태에 따라 placeholder 변경
            placeholder={BannerCategory.find(opt => opt.value === bannerCategory)?.label || '배너 카테고리 선택'}
          />
        </DropdownWrapper>
        <DropdownWrapper>
          <label>배너 활성화 여부</label>
          <Dropdown
            options={BannerActive}
            onSelect={handleSelectActive}
            // 수정 할 배너 활성화 여부에 따라 placeholder 변경
            placeholder={BannerActive.find(opt => opt.value === isActive)?.label || '활성화 여부 선택'}
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
        
        <ButtonWrap>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={() => handleEditBanner(selectedBanner.id)}>수정</Button>
        </ButtonWrap>
      </FormWrapper>
    </>
  );
};

export default BannerEdit;


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