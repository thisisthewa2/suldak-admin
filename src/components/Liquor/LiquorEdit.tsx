import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';

// components
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import ErrorFallback from '@components/core/ErrorFallback';
import Input from '@components/core/Input';
import Button from '@components/core/Button';
import TextArea from '@components/core/TextArea';
import ImageUploader from '@components/core/ImageUploader';
import DropdownSelector from '@components/core/DropSelector';
import RecipeTextEditor from '@components/core/RecipeTextEditor';

// hooks
// import useFormInput from '@hooks/useFormInput';
import useModal from '@hooks/useModal';
import Loader from '@components/core/Loader';
import { useEditLiquorMutation } from '@hooks/apis/Liquor/useLiquorMutation';

// types
import { tagType } from '@components/core/DropSelector';
import MaterialTextEditor from '@components/core/MaterialTextEditor';
import { useGetLiquorDetailQuery } from '@hooks/apis/Liquor/useLiquorQuery';

interface IProps {
  liquorId: number;
}

/** 술 수정 컴포넌트 */
const LiquorEdit = ({ liquorId }: IProps) => {
  const { closeModal } = useModal();
  const { reset } = useQueryErrorResetBoundary();
  const { mutate: editLiquor } = useEditLiquorMutation();
  const { data, isLoading, isError } = useGetLiquorDetailQuery(liquorId);
  console.log(data);
  const selectedLiquor = data?.data;

  // state 초기값은 비워두고 선언
  const [inputValue, setInputValue] = useState({
    name: '',
    summaryExplanation: '',
    liquorRecipe: [],
    searchTag: '',
    detailAbv: '',
  });
  const [detailExplanation, setDetailExplanation] = useState('');
  const [liquorRecipe, setLiquorRecipe] = useState<string[]>([]);
  const [liquorMaterialList, setLiquorMaterialList] = useState<string[]>([]);

  // 단일/복수 태그 초기화 함수
  const initializeSingleState = (value: any): tagType[] => (value ? [value] : []);
  const initializeArrayState = (value: any): tagType[] => (Array.isArray(value) && value.length > 0 ? value : []);

  const [liquorName, setLiquorName] = useState<tagType[]>([]);
  const [liquorDetail, setLiquorDetail] = useState<tagType[]>([]);
  const [liquorAbv, setLiquorAbv] = useState<tagType[]>([]);
  const [liquorCapacity, setLiquorCapacity] = useState<tagType[]>([]);
  const [liquorTaste, setLiquorTaste] = useState<tagType[]>([]);
  const [liquorState, setLiquorState] = useState<tagType[]>([]);
  const [liquorSell, setLiquorSell] = useState<tagType[]>([]);
  const [liquorSnack, setLiquorSnack] = useState<tagType[]>([]);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [existImgFile, setExistImgFile] = useState<string | undefined>(undefined);

  // data가 들어오면 한 번만 state 세팅
  useEffect(() => {
    if (selectedLiquor) {
      setInputValue({
        name: selectedLiquor.name || '',
        summaryExplanation: selectedLiquor.summaryExplanation || '',
        liquorRecipe: selectedLiquor.liquorRecipe || [],
        searchTag: selectedLiquor.searchTag || '',
        detailAbv: selectedLiquor.detailAbv || '',
      });
      setDetailExplanation(selectedLiquor.detailExplanation || '');
      setLiquorRecipe(selectedLiquor.liquorRecipe || []);
      setLiquorMaterialList(selectedLiquor.liquorMaterialList || []);
      setLiquorName(initializeSingleState(selectedLiquor.liquorNameDto));
      setLiquorDetail(initializeSingleState(selectedLiquor.liquorDetailDto));
      setLiquorAbv(initializeSingleState(selectedLiquor.liquorAbvDto));
      setLiquorCapacity(initializeSingleState(selectedLiquor.drinkingCapacityDto));
      setLiquorTaste(initializeArrayState(selectedLiquor.tasteTypeDtos));
      setLiquorState(initializeArrayState(selectedLiquor.stateTypeDtos));
      setLiquorSell(initializeArrayState(selectedLiquor.liquorSellDtos));
      setLiquorSnack(initializeArrayState(selectedLiquor.liquorSnackRes));
      setExistImgFile(selectedLiquor.liquorPictureUrl);
    }
  }, [selectedLiquor]);

  if (isLoading) return <Loader />;
  // if (isError) return <ErrorFallback />;
  if (!selectedLiquor) return null;

  // 태그 중복 체크
  const isExistTags = (arr: tagType[], id: number): boolean => arr.some((item) => item.id === id);

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
        if (!isExistTags(liquorTaste, tag.id)) setLiquorTaste((prev) => [...prev, tag]);
        break;
      case 'state-type':
        if (!isExistTags(liquorState, tag.id)) setLiquorState((prev) => [...prev, tag]);
        break;
      case 'liquor-sell':
        if (!isExistTags(liquorSell, tag.id)) setLiquorSell((prev) => [...prev, tag]);
        break;
      case 'liquor-snack':
        if (!isExistTags(liquorSnack, tag.id)) setLiquorSnack((prev) => [...prev, tag]);
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
        setLiquorTaste((prev) => prev.filter((item) => item.id !== tag.id));
        break;
      case 'state-type':
        setLiquorState((prev) => prev.filter((item) => item.id !== tag.id));
        break;
      case 'liquor-sell':
        setLiquorSell((prev) => prev.filter((item) => item.id !== tag.id));
        break;
      case 'liquor-snack':
        setLiquorSnack((prev) => prev.filter((item) => item.id !== tag.id));
        break;
    }
  };

  // 이미지 변경 함수
  const handleFileChange = (selectedFile: File | null) => {
    setImgFile(selectedFile);
  };

  // 술 수정 함수
  const handleEditLiquor = async (priKey: number) => {
    const editFormData = new FormData();
    if (imgFile) {
      editFormData.append('file', imgFile);
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
      liquorAbvId: liquorAbv[0]?.id?.toString() || '',
      liquorDetailId: liquorDetail[0]?.id?.toString() || '',
      drinkingCapacityId: liquorCapacity[0]?.id?.toString() || '',
      liquorNameId: liquorName[0]?.id?.toString() || '',
      snackPriKeys: snackId,
      sellPriKeys: sellId,
      statePriKeys: stateId,
      tastePriKeys: tasteId,
    };
    editFormData.append('liquorReq', JSON.stringify(liquorReq));
    editLiquor({
      priKey: priKey,
      eFormD: editFormData,
    });
  };

  return (
    <Wrapper>
      {/* <ErrorBoundary fallbackRender={() => <ErrorFallback />} onReset={reset}> */}
      <Suspense fallback={<Loader />}>
        <Input
          name="name"
          value={inputValue.name}
          onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: e.target.value })}
          placeholder="술 이름을 입력해주세요"
          label="술 이름"
        />
        <ImageUploader label="이미지" onChange={handleFileChange} file={imgFile} eFile={existImgFile} />
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
          onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: e.target.value })}
          placeholder="간단한 설명을 입력해주세요"
          label="술 요약 설명"
        />
        <TextArea
          name="detailExplanation"
          placeholder="술의 자세한 설명을 입력해주세요"
          label="술의 자세한 설명"
          value={detailExplanation}
          onChange={(e) => setDetailExplanation(e.target.value)}
        />
        <RecipeTextEditor label="술의 레시피" onChange={setLiquorRecipe} value={liquorRecipe} />
        <MaterialTextEditor label="술의 재료" onChange={setLiquorMaterialList} value={liquorMaterialList} />
        <Input
          name="searchTag"
          value={inputValue.searchTag}
          onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: e.target.value })}
          placeholder="검색을 위한 문구를 입력해주세요"
          label="술 검색을 위한 문구"
        />
        <Input
          name="detailAbv"
          value={inputValue.detailAbv}
          onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: e.target.value })}
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
          <Button onClick={() => handleEditLiquor(selectedLiquor?.id)}>수정</Button>
        </ButtonWrap>
      </Suspense>
      {/* </ErrorBoundary> */}
    </Wrapper>
  );
};

export default LiquorEdit;

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
