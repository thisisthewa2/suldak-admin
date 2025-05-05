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
import ImageUploader from '@components/core/ImageUploader';
import DropdownSelector from '@components/core/DropSelector';
import RecipeTextEditor from '@components/core/RecipeTextEditor';

// hooks
import useFormInput from '@hooks/useFormInput';
import useTextarea from '@hooks/useTextarea';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import Loader from '@components/core/Loader';
import { useAddLiquorMutation } from '@hooks/apis/Liquor/useLiquorMutation';

import LiquorApi from '@apis/services/LiquorApi';

// types
import { tagType } from '@components/core/DropSelector';
import MaterialTextEditor from '@components/core/MaterialTextEditor';

/** 술 추가 컴포넌트 */
const LiquorAdd = () => {
  const { closeModal } = useModal();
  const { reset } = useQueryErrorResetBoundary();
  const { mutate: addLiquor } = useAddLiquorMutation();
  const [inputValue, setInputValue] = useFormInput({
    name: '', // 술 이름
    summaryExplanation: '', // 술의 요약 설명
    liquorRecipe: '', // 술의 레시피
    searchTag: '', // 술 검색을 위한 문구
    detailAbv: '', // 술의 정확한 도수
  });

  const [detailExplanation, handleDetailExplanation] = useTextarea<string>('');
  const [liquorRecipe, handleLiquorRecipe] = useState<string[]>(); // 술의 레시피
  const [liquorMaterialList, handleLiquorMaterialList] = useState<string[]>(); // 술 재료 목록

  // 태그
  const [liquorName, setLiquorName] = useState<tagType[]>([]); // 1차 분류
  const [liquorDetail, setLiquorDetail] = useState<tagType[]>([]); // 2차 분류
  const [liquorAbv, setLiquorAbv] = useState<tagType[]>([]); // 술의 도수
  const [liquorCapacity, setLiquorCapacity] = useState<tagType[]>([]); // 주량(숙련도)

  const [liquorTaste, setLiquorTaste] = useState<tagType[]>([]); // 술의 맛
  const [liquorState, setLiquorState] = useState<tagType[]>([]); // 상태(기분)
  const [liquorSell, setLiquorSell] = useState<tagType[]>([]); // 판매처
  const [liquorSnack, setLiquorSnack] = useState<tagType[]>([]); // 추천안주

  const [imgFile, setImgFile] = useState<File | null>(null);

  // 술 추가 함수
  const handleSubmit = async () => {
    const formData = new FormData();
    if (imgFile) {
      formData.append('file', imgFile);
    }

    const snackId = liquorSnack.map((item) => item.id);
    const sellId = liquorSell.map((item) => item.id);
    const stateId = liquorState.map((item) => item.id);
    const tasteId = liquorTaste.map((item) => item.id);

    const liquorReq = {
      name: inputValue.name,
      summaryExplanation: inputValue.summaryExplanation,
      searchTag: inputValue.searchTag,
      liquorRecipe: liquorRecipe,
      liquorMaterialList,
      detailAbv: inputValue.detailAbv,
      detailExplanation: detailExplanation,
      liquorAbvId: liquorAbv[0].id.toString(),
      liquorDetailId: liquorDetail[0].id.toString(),
      drinkingCapacityId: liquorCapacity[0].id.toString(),
      liquorNameId: liquorName[0].id.toString(),
      snackPriKeys: snackId,
      sellPriKeys: sellId,
      statePriKeys: stateId,
      tastePriKeys: tasteId,
    };
    formData.append('liquorReq', JSON.stringify(liquorReq));

    addLiquor(formData);
  };

  // 이미지 변경 함수
  const handleFileChange = (selectedFile: File | null) => {
    setImgFile(selectedFile);
  };

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
      case 'liquor-snack':
        if (isExistTags(liquorSnack, tag.id) === false) {
          setLiquorSnack((prev) => [...prev, tag]);
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
      case 'liquor-snack':
        const newSnackList = liquorSnack.filter((item) => item.id !== tag.id);
        setLiquorSnack(newSnackList);
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
          <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} />
          <DropdownSelector
            label="1차분류"
            placeholder="태그를 선택해주세요"
            tagType="liquor-name"
            selectedTagList={liquorName}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <DropdownSelector
            label="2차분류"
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
            value={detailExplanation}
            onChange={handleDetailExplanation}
          />
          <RecipeTextEditor label="술의 레시피" onChange={handleLiquorRecipe} value={liquorRecipe} />
          <MaterialTextEditor label="술의 재료" onChange={handleLiquorMaterialList} value={liquorMaterialList} />
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
          <DropdownSelector
            label="술의도수"
            placeholder="도수를 선택해주세요"
            tagType="liquor-abv"
            selectedTagList={liquorAbv}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />

          <DropdownSelector
            label="추천안주"
            placeholder="추천안주를 선택해주세요"
            tagType="liquor-snack"
            selectedTagList={liquorSnack}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />

          <DropdownSelector
            label="숙련도 (좋아하는 정도)"
            placeholder="숙련도를 선택해주세요"
            tagType="drinking-capacity"
            selectedTagList={liquorCapacity}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <DropdownSelector
            label="맛"
            placeholder="맛을 선택해주세요"
            tagType="taste-type"
            selectedTagList={liquorTaste}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <DropdownSelector
            label="상태"
            placeholder="상태(기분)를 선택해주세요"
            tagType="state-type"
            selectedTagList={liquorState}
            onClickTags={handleChangeTags}
            onDeleteTags={handleDeleteTags}
          />
          <DropdownSelector
            label="판매처"
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
            <Button onClick={handleSubmit}>추가</Button>
          </ButtonWrap>
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  );
};

export default LiquorAdd;

const Wrapper = styled.div`
  position: relative;
  min-width: 700px;
  width: 1000px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: scroll;
  padding-bottom: 6rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
