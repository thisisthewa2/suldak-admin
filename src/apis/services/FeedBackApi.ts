import { axiosInstance } from '@apis/interceptor';

/** 프로필 질문 API */
class FeedBackApi {
  get = async () => {
    const { data } = await axiosInstance.get(
      `/api/admin/party-feedback/view/list`
    );

    return data;
  };

  /** 별로에요 목록 조회 */
  getBad = async () => {
    const { data } = await axiosInstance.get(
      `/api/feedback/view/bad/list`
    );

    return data;
  }
}

export default new FeedBackApi();
