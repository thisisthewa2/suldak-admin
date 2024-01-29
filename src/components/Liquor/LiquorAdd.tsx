import React, { useState } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';
import TextArea from '@components/core/TextArea';

// hooks
import useInput from '@hooks/useInput';
import useFormInput from '@hooks/useFormInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';

/** 술 추가 컴포넌트 */
const LiquorAdd = () => {
  const { closeModal } = useModal();
  const [inputValue, setInputValue] = useFormInput({
    name: '', // 술 이름
    summaryExplanation: '', // 술의 요약 설명
    detailExplanation: '', // 술의 자세한 설명
    liquorRecipe: '', // 술의 레시피
    searchTag: '', // 술 검색을 위한 문구
    detailAbv: '', // 술의 정확한 도수
  });
  return (
    <Wrapper>
      <Input
        name="name"
        value={inputValue.name}
        onChange={setInputValue}
        placeholder="술 이름을 입력해주세요"
        label="술 이름"
      />
      <span>이미지</span>
      <span>1차분류</span>
      <span>2차분류</span>
      <Input
        name="summaryExplanation"
        value={inputValue.summaryExplanation}
        onChange={setInputValue}
        placeholder="간단한 설명을 입력해주세요"
        label="술 요약 설명"
      />
      <TextArea
        name="detailExplanation"
        placeholder="술의 자세한 설명을 입력해주세요"
        label="술의 자세한 설명"
      />
      <Input
        name="liquorRecipe"
        value={inputValue.liquorRecipe}
        onChange={setInputValue}
        placeholder="술의 레시피를 입력해주세요"
        label="술의 레시피"
      />
      <Input
        name="searchTag"
        value={inputValue.liquorRecipe}
        onChange={setInputValue}
        placeholder="검색을 위한 문구를 입력해주세요"
        label="술 검색을 위한 문구"
      />
      <Input
        name="detailAbv"
        value={inputValue.detailAbv}
        onChange={setInputValue}
        placeholder="정확한 도수를 입력해주세요"
        label="술의 정확한 도수"
      />
      <span>술의도수</span>
      <span>숙련도 (좋아하는 정도)</span>
      <span>맛</span>
      <span>상태</span>
      <span>판매처</span>
      <ButtonWrap>
        <Button onClick={closeModal} buttonType="reset">
          취소
        </Button>
        <Button>추가</Button>
      </ButtonWrap>
    </Wrapper>
  );
};

export default LiquorAdd;

const Wrapper = styled.div`
  position: relative;
  min-width: 800px;
  width: 1000px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: scroll;
  padding-bottom: 1rem;
`;

const ButtonWrap = styled.div`
  position: fixed;
  display: flex;
  gap: 1rem;
  align-items: center;
  bottom: 1rem;
  right: 1rem;
`;
