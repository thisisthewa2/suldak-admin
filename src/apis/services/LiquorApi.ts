import { BASE_URL } from '@apis/interceptor';
import { axiosInstance } from '@apis/interceptor';

export interface SearchParams {
  pageNum: number;
  recordSize: number;

  liquorNamePriKeys: number[]; // 1차 분류
  liquorDetailPriKyes: number[]; // 2차 분류
  liquorAbvPriKeys: number[];
  tastePriKeys: number[];
}

/** 술 API */
class LiquorApi {
  // 필터링 검색
  get = async ({
    pageNum,
    recordSize,
    liquorNamePriKeys,
    liquorDetailPriKyes,
    liquorAbvPriKeys,
    tastePriKeys,
  }: SearchParams) => {
    const { data } = await axiosInstance.get(`/api/liquor/view/liquor-search`, {
      params: {
        pageNum,
        recordSize,

        liquorNamePriKeys: liquorNamePriKeys.join(','),
        liquorDetailPriKyes: liquorDetailPriKyes.join(','),
        liquorAbvPriKeys: liquorAbvPriKeys.join(','),
        tastePriKeys: tastePriKeys.join(','),
      },
    });

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
    const { data } = await axiosInstance.post(
      `${BASE_URL}/api/admin/liquor/add/liquor`,
      formD,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    return data;
  };
}

export default new LiquorApi();
