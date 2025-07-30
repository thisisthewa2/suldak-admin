import { BASE_URL } from '@apis/interceptor';
import { axiosInstance } from '@apis/interceptor';

export interface SearchParams {
  pageNum: number;
  recordSize: number;

  liquorNamePriKeys: number[]; // 1차 분류
  liquorDetailPriKeys: number[]; // 2차 분류
  liquorAbvPriKeys: number[];
  tastePriKeys: number[];
}

interface IEdit {
  eFormD: any; // Edit 데이터
  priKey: number;
}

interface IDelete {
  priKey: number;
}

// 술 상세 타입
interface ILiquorDetail {
  createdAt: string;
  detailAbv: number; // 술의 정확한 도수
  detailExplanation: string; // 술 상세 설명

  // 주량 정보
  drinkingCapacityDto: {
    color: string;
    id: number;
    name: string;
  };

  id: number;
  isLike: boolean; // 검색한 유저의 해당 술 즐겨찾기 여부 (어드민 술 탭에 필요한 데이터인가?)

  // 도수 정보
  liquorAbvDto: {
    id: number;
    name: string;
  };

  // 2차 분류 정보
  liquorDetailDto: {
    id: number;
    name: string;
    orderNum: number;
  };

  liquorMaterialList: string[]; // 술 재료 목록

  // 1차 분류 정보
  liquorNameDto: {
    fileBaseNm: string;
    id: number;
    name: string;
    orderNum: number;
  };

  liquorPictureUrl: string; // 술 사진 URL

  liquorRecipe: string[];
  liquorSellDtos: Array<{ name: string }>;

  liquorSnackRes: Array<{
    fileBaseNm: string;
    id: number;
    name: string;
  }>;

  modifiedAt: string;
  name: string;

  stateTypeDtos: Array<{
    id: number;
    name: string;
  }>;

  summaryExplanation: string;
  tasteTypeDtos: Array<{ name: string }>;
}

/** 술 API */
class LiquorApi {
  // 필터링 검색
  get = async ({
    pageNum,
    recordSize,
    liquorNamePriKeys,
    liquorDetailPriKeys,
    liquorAbvPriKeys,
    tastePriKeys,
  }: SearchParams) => {
    const { data } = await axiosInstance.get(`/api/liquor/view/liquor-search`, {
      params: {
        andBool: true,
        pageNum,
        recordSize,

        liquorNamePriKeys: liquorNamePriKeys.join(','),
        liquorDetailPriKeys: liquorDetailPriKeys.join(','),
        liquorAbvPriKeys: liquorAbvPriKeys.join(','),
        tastePriKeys: tastePriKeys.join(','),
      },
    });

    return data;
  };

  getDetail = async (liquorId: number) => {
    const { data } = await axiosInstance.get(`/api/admin/liquor/${liquorId}`);

    return data;
  };

  // 기간 별 인기 술 목록 조회
  getPopularity = async () => {};

  // 최신 순으로 정렬
  getLiquor = async () => {
    const { data } = await axiosInstance.get(`/api/liquor/view/liquor-latest`);

    return data;
  };

  add = async (formD: any) => {
    const { data } = await axiosInstance.post(`${BASE_URL}/api/admin/liquor/add/liquor`, formD, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
      },
    });

    return data;
  };

  edit = async ({ eFormD, priKey }: IEdit) => {
    const { data } = await axiosInstance.put(`${BASE_URL}/api/admin/liquor/add/liquor/${priKey}`, eFormD);

    return data;
  };

  delete = async ({ priKey }: IDelete) => {
    const response = await axiosInstance.delete(`${BASE_URL}/api/admin/liquor/del/${priKey}`);

    return response.data;
  };
}

export default new LiquorApi();
