import axios from 'axios';
import { BASE_URL } from '@apis/interceptor';
import { axiosInstance } from '@apis/interceptor';

/** 술 API */
class LiquorApi {
  // 필터링 검색
  get = async () => {
    const { data } = await axiosInstance.get(`/api/liquor/view/liquor-search`);

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
