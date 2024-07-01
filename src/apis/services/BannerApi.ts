import { axiosInstance } from '@apis/interceptor';

// 배너 조회
export interface IGet {
  bannerCategory: string; // 배너 카테고리
  isActive: boolean; // 배너 활성화 여부
}

// 배너 수정
interface IEdit {
  eFormD: any // 배너 수정 폼
  id: number;
}

// 배너 삭제
interface IDelete {
  id: number;
}

/** 배너 API */
class BannerApi {
  // 배너 조회
  get = async ({ 
    bannerCategory,
    isActive,
  }: IGet) => {
    const response = await axiosInstance.get(
      `/api/banner/view/list`,
      {
        params: {
          bannerCategory,
          isActive,
        },
      }
    );

    return response.data;
  };

  // 배너 추가
  add = async (formD: FormData) => {
    const { data } = await axiosInstance.post(`/api/admin/banner`, formD);
    
    return data;
  };

  // 배너 수정
  edit = async ({ eFormD, id }: IEdit) => {
    const { data } = await axiosInstance.put(`/api/admin/banner/${id}`, eFormD);

    return data;
  };

  // 배너 삭제
  delete = async ({ id }: IDelete) => {
    const response = await axiosInstance.delete(
      `/api/admin/banner/${id}`
    );

    return response.data;
  };
}

export default new BannerApi();
