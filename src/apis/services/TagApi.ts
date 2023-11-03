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
    const { data } = await axiosInstance.post(`/api/admin/tag/add/${tagType}`, {
      id: id ? id : null,
      name
    })

    return [data, true]
  }

  // 삭제
  delete = async ({ tagType, priKey }: IDelete) => {
    const response = await axiosInstance.delete(`/api/admin/tag/del/${tagType}`, {
      data: {
        priKey
      }
    })

    return [response.data, true]
  }

  // 조회
  get = async ({ tagType }: IGet) => {
    const { data } = await axiosInstance.get(`/api/tag/view/${tagType}`)
    return data
  }
}

export default new TagApi()