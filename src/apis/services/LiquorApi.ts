import { axiosInstance } from '@apis/interceptor';

/** 술 API */
class LiquorApi {
  // 기간 별 인기 술 목록 조회
  getPopularity = async () => {};

  // 최신 순으로 정렬
  getLiquor = async () => {
    const { data } = await axiosInstance.get(`/api/liquor/view/liquor-latest`);

    return data;
  };
}

export default new LiquorApi();
