import React, { useState, Suspense, useEffect } from 'react';
import styled from 'styled-components';

// components
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import ErrorFallback from '@components/core/ErrorFallback';
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';
import TextArea from '@components/core/TextArea';
import DropdownSelector from '@components/core/DropSelector';

// hooks
import useInput from '@hooks/useInput';
import useFormInput from '@hooks/useFormInput';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import Loader from '@components/core/Loader';

// types
import { tagType } from '@components/core/DropSelector';

/** 술 추가 컴포넌트 */
const LiquorAdd = () => {
  const { closeModal } = useModal();
  const { reset } = useQueryErrorResetBoundary();
  const [inputValue, setInputValue] = useFormInput({
    name: '', // 술 이름
    summaryExplanation: '', // 술의 요약 설명
    detailExplanation: '', // 술의 자세한 설명
    liquorRecipe: '', // 술의 레시피
    searchTag: '', // 술 검색을 위한 문구
    detailAbv: '', // 술의 정확한 도수
  });

  const [liquorName, setLiquorName] = useState<tagType[]>([]); // 1차 분류
  const [liquorDetail, setLiquorDetail] = useState<tagType[]>([]); // 2차 분류
  const [liquorAbv, setLiquorAbv] = useState<tagType[]>([]); // 술의 도수

  // 1차 분류
  const handleChangeNameTags = (tag: tagType) => {
    setLiquorName([tag]);
  };

  // 2차 분류
  const handleChangeDetailTags = (tag: tagType) => {
    setLiquorDetail([tag]);
  };

  // 도수
  const handleChangeAbvTags = (tag: tagType) => {
    setLiquorAbv([tag]);
  };

  return (
    <Wrapper>
      <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Loader />}>
          <Input
            name="name"
            value={inputValue.name}
            onChange={setInputValue}
            placeholder="술 이름을 입력해주세요"
            label="술 이름"
          />
          <span>이미지</span>
          <span>1차분류</span>
          <DropdownSelector
            placeholder="태그를 선택해주세요"
            tagType="liquor-name"
            selectedTagList={liquorName}
            onClickTag={handleChangeNameTags}
          />
          <span>2차분류</span>
          <DropdownSelector
            placeholder="태그를 선택해주세요"
            tagType="liquor-detail"
            selectedTagList={liquorDetail}
            onClickTag={handleChangeDetailTags}
          />
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
          <DropdownSelector
            placeholder="도수를 선택해주세요"
            tagType="liquor-abv"
            selectedTagList={liquorAbv}
            onClickTag={handleChangeAbvTags}
          />

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
        </Suspense>
      </ErrorBoundary>
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
