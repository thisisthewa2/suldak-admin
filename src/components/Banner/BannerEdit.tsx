import { useState } from 'react';
import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Dropdown from '@components/core/Dropdown';
import ImageUploader from '@components/core/ImageUploader';

// hooks
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
        <Dropdown
          options={BannerCategory}
          onSelect={handleSelectCategory}
          // 수정 할 배너 카테고리의 상태에 따라 placeholder 변경
          placeholder={BannerCategory.find(opt => opt.value === bannerCategory)?.label || '배너 카테고리 선택'}
        />
        <Dropdown
          options={BannerActive}
          onSelect={handleSelectActive}
          // 수정 할 배너 활성화 여부에 따라 placeholder 변경
          placeholder={BannerActive.find(opt => opt.value === isActive)?.label || '활성화 여부 선택'}
        />
        <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} eFile={existImgFile} />
        
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