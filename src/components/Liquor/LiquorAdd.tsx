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

  // 태그
  const [liquorName, setLiquorName] = useState<tagType[]>([]); // 1차 분류
  const [liquorDetail, setLiquorDetail] = useState<tagType[]>([]); // 2차 분류
  const [liquorAbv, setLiquorAbv] = useState<tagType[]>([]); // 술의 도수
  const [liquorCapacity, setLiquorCapacity] = useState<tagType[]>([]); // 주량(숙련도)

  const [liquorTaste, setLiquorTaste] = useState<tagType[]>([]); // 술의 맛
  const [liquorState, setLiquorState] = useState<tagType[]>([]); // 상태(기분)
  const [liquorSell, setLiquorSell] = useState<tagType[]>([]); // 판매처

  // 태그 중복 체크
  const isExistTags = (arr: tagType[], id: number): boolean => {
    return arr.some((item) => item.id === id);
  };

  // 태그 선택
  const handleChangeTags = (tag: tagType, type: string) => {
    switch (type) {
      case 'liquor-name':
        setLiquorName([tag]);
        break;
      case 'liquor-detail':
        setLiquorDetail([tag]);
        break;
      case 'liquor-abv':
        setLiquorAbv([tag]);
        break;
      case 'drinking-capacity':
        setLiquorCapacity([tag]);
        break;
      case 'taste-type':
        if (isExistTags(liquorTaste, tag.id) === false) {
          setLiquorTaste((prev) => [...prev, tag]);
        }
        break;
      case 'state-type':
        if (isExistTags(liquorState, tag.id) === false) {
          setLiquorState((prev) => [...prev, tag]);
        }
        break;
      case 'liquor-sell':
        if (isExistTags(liquorSell, tag.id) === false) {
          setLiquorSell((prev) => [...prev, tag]);
        }
        break;
    }
  };

  // 태그 삭제
  const handleDeleteTags = (tag: tagType, type: string) => {
    switch (type) {
      case 'liquor-name':
        setLiquorName([]);
        break;
      case 'liquor-detail':
        setLiquorDetail([]);
        break;
      case 'liquor-abv':
        setLiquorAbv([]);
        break;
      case 'drinking-capacity':
        setLiquorCapacity([]);
        break;
      case 'taste-type':
        const newTasteList = liquorTaste.filter((item) => item.id !== tag.id);
        setLiquorTaste(newTasteList);
        break;
      case 'state-type':
        const newStateList = liquorState.filter((item) => item.id !== tag.id);
        setLiquorState(newStateList);
        break;
      case 'liquor-sell':
        const newSellList = liquorSell.filter((item) => item.id !== tag.id);
        setLiquorSell(newSellList);
        break;
    }
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
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <span>2차분류</span>
          <DropdownSelector
            placeholder="태그를 선택해주세요"
            tagType="liquor-detail"
            selectedTagList={liquorDetail}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
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
            value={inputValue.searchTag}
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
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />

          <span>숙련도 (좋아하는 정도)</span>
          <DropdownSelector
            placeholder="숙련도를 선택해주세요"
            tagType="drinking-capacity"
            selectedTagList={liquorCapacity}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <span>맛</span>
          <DropdownSelector
            placeholder="맛을 선택해주세요"
            tagType="taste-type"
            selectedTagList={liquorTaste}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <span>상태</span>
          <DropdownSelector
            placeholder="상태(기분)를 선택해주세요"
            tagType="state-type"
            selectedTagList={liquorState}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <span>판매처</span>
          <DropdownSelector
            placeholder="판매처를 선택해주세요"
            tagType="liquor-sell"
            selectedTagList={liquorSell}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />

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
