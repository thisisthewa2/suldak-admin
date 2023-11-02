import { axiosInstance } from "@apis/interceptor";

// 태그 추가 타입
interface IAdd {
  addType: string; // endpoint url
  id?: number;
  name: string;
}

/** 태그 API */
class TagApi {

  // 추가
  add = async ({ addType, id, name }: IAdd) => {
    try {
      const { data } = await axiosInstance.post(``, {

      })
    }
    catch (error) {

    }
  }
}

export default new TagApi()