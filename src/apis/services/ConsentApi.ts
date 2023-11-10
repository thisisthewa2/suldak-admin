import { axiosInstance } from "@apis/interceptor";


export type itemType = 'PRIVACY_POLICY' | 'TEAM_OF_SERVICE';

// 동의 항목 조회
interface IGet {
  itemSeq?: number; // 동의 항목 순서 - 동의 항목 보여질 순서 
  itemType: itemType
}

// 동의 항목 추가
interface IAdd {
  itemSeq?: number; // 동의 항목 순서
  itemText: string; // 동의 항목 내용
  itemType: itemType
}

// 동의 항목 수정
interface IEdit {
  id: number; // 동의 항목 기본키
  itemSeq?: number; // 동의 항목 순서
  itemText: string; // 동의 항목 내용
  itemType: itemType
}

// 동의 항목 삭제
interface IDelete {
  priKey: number; // 동의 항목 기본키
}

/** 동의 항목 API */
class ConsentApi {

  // 조회
  get = async ({ itemSeq, itemType }: IGet) => {
    const response = await axiosInstance.get(`/api/consent/view/consent?itemType=${itemType}`, {
      data: {
        itemSeq: itemSeq || 0,
      }
    })

    return response.data
  }

  // 추가
  add = async ({ itemSeq, itemText, itemType }: IAdd) => {
    const { data } = await axiosInstance.post(`/api/admin/consent/consent`, {
      itemSeq: itemSeq || 0,
      itemText, itemType
    })

    return data
  }

  // 수정
  edit = async ({ id, itemSeq, itemText, itemType }: IEdit) => {
    const { data } = await axiosInstance.post(`/api/admin/consent/consent`, {
      id,
      itemSeq: itemSeq || 0,
      itemText, itemType
    })

    return data
  }

  // 삭제
  delete = async ({ priKey }: IDelete) => {
    const response = await axiosInstance.delete(`/api/admin/consent/consent`, {
      data: {
        priKey
      }
    })

    return response.data
  }
}

export default new ConsentApi()