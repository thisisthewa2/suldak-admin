import styled from 'styled-components';

// components
import Button from '@components/core/Button';
import Input from '@components/core/Input';

// hooks
import useModal from '@hooks/useModal';
import useInput from '@hooks/useInput';
import useToastify from '@hooks/useToastify';
import { useAddRecommendMutation } from '@hooks/apis/Recommend/useRecommendMutation';

interface IProps {
  selectedRecommend: any;
}

/** 추천 검색어 수정 컴포넌트 */
const RecommendEdit = ({ selectedRecommend }: IProps) => {
  const { closeModal } = useModal();
  const { mutate: editRecommend } = useAddRecommendMutation();
  const { showWarningToastMessage } = useToastify();
  // 추천 검색어 상태
  const inputValue = useInput(selectedRecommend.text);

  // 추천 검색어 추가
  const handleEditRecommend = () => {
    // 아무것도 입력 받지 않았을 때 Warning Message
    if(inputValue.value === ''){
      showWarningToastMessage('추천 검색어를 입력해주세요.');
      return;
    }

    editRecommend({
      searchType: selectedRecommend.searchType,
      id: selectedRecommend.id,
      text: inputValue.value,
    });

    closeModal();
  };

  return (
    <>
      <FormWrapper>
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
          <Button onClick={handleEditRecommend}>수정</Button>
        </ButtonWrap>
      </FormWrapper>
    </>
  );
};

export default RecommendEdit;

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
