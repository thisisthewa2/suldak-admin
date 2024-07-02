import { axiosInstance } from '@apis/interceptor';

// 검색어 조회
export interface IGet {
  searchType: string;
  isActive: boolean; // 검색어 활성화 여부
}

// 검색어 추가 및 수정
interface IAdd {
  searchType: string;
  id?: number;
  text: string;
}

// 검색어 활성화 수정
interface IEdit {
  priKey: number;
}

// 검색어 삭제
interface IDelete {
  priKey: number;
}

/** 검색어 API */
class RecommendApi {
  // 검색어 조회
  get = async ({ 
    searchType,
    isActive,
  }: IGet) => {
    const response = await axiosInstance.get(
      `/api/search/text/view/recommend`,
      {
        params: {
          searchType,
          isActive,
        },
      }
    );

    return response.data;
  };

  // 검색어 추가 및 수정 (id가 있다면 수정: Tag API 와 동일)
  add = async ({ searchType, id, text }: IAdd) => {
    const { data } = await axiosInstance.post(`/api/admin/search/text/recommend`, {
      searchType,
      id: id ? id : null,
      text,
    });
    
    return data;
  };

  // 검색어 활성화 여부 수정
  edit = async ({ priKey }: IEdit) => {
    const response = await axiosInstance.put(
      `/api/admin/search/text/recommend/${priKey}`
    );

    return response.data;
  }

  // 검색어 삭제
  delete = async ({ priKey }: IDelete) => {
    const response = await axiosInstance.delete(
      `/api/admin/search/text/recommend/${priKey}`
    );

    return response.data;
  };
}

export default new RecommendApi();
