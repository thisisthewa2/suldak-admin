import { useState } from 'react';
import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Dropdown from '@components/core/Dropdown';
import Input from '@components/core/Input';

// hooks
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';
import useToastify from '@hooks/useToastify';
import { useAddRecommendMutation } from '@hooks/apis/Recommend/useRecommendMutation';

// libs
import { SearchType } from '@libs/getRecommendType';

/** 추천 검색어 추가 컴포넌트 */
const RecommendAdd = () => {
  const { closeModal } = useModal();
  const { mutate: addRecommend } = useAddRecommendMutation();
  const { showWarningToastMessage } = useToastify();
  // 추천 검색어 상태
  const [searchType, setSearchType] = useState('LIQUOR');
  const inputValue = useInput('');

  // 추천 검색어 추가
  const handleAddRecommend = () => {
    if(inputValue.value === ''){
      showWarningToastMessage('추천 검색어를 입력해주세요.');
      return;
    }

    addRecommend({
      searchType,
      text: inputValue.value,
    })

    closeModal();
  };

  // 추천 검색어 카테고리 선택 함수
  const handleSelectSearchType = (selected: { value: string; label: string }) => {
    setSearchType(selected.value);
  };

  return (
    <>
      <FormWrapper>
        <Dropdown
          options={SearchType}
          onSelect={handleSelectSearchType}
          placeholder="술"
        />
        <Input
          name="text"
          value={inputValue.value}
          onChange={inputValue.onChange}
          placeholder="추천 검색어 텍스트를 입력해주세요."
          label="추천 검색어"
        />
        <ButtonWrap>
          <Button onClick={closeModal} buttonType="reset">
            취소
          </Button>
          <Button onClick={handleAddRecommend}>추가</Button>
        </ButtonWrap>
      </FormWrapper>
    </>
  );
};

export default RecommendAdd;

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
