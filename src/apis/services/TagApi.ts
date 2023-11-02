import { axiosInstance } from "@apis/interceptor";

// 태그 추가 타입
interface IAdd {
  tagType: string; // endpoint url
  id?: number;
  name: string;
}

// 태그 삭제 타입
interface IDelete {
  tagType: string;
  priKey: number;
}

// 태그 조회
interface IGet {
  tagType: string;
}

/** 태그 API */
class TagApi {

  // 추가
  add = async ({ tagType, id, name }: IAdd) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/tag/add/${tagType}`, {
        id: id ? id : null,
        name
      })

      return [data, true]
    }
    catch (error) {
      throw error
    }
  }

  // 삭제
  delete = async ({ tagType, priKey }: IDelete) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/tag/del/${tagType}`, {
        data: {
          priKey
        }
      })

      return [response.data, true]
    }
    catch (error) {
      throw error
    }
  }

  // 조회
  get = async ({ tagType }: IGet) => {
    try {
      const { data } = await axiosInstance.get(`/api/tag/view/${tagType}`)
      return [data, true]
    }

    catch (error) {
      throw error
    }
  }
}

export default new TagApi()