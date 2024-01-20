import { axiosInstance } from '@apis/interceptor';

interface IEdit {
  aindex: number;
  atext: string;
  priKey: number;
  questionPriKey: number;
}

interface IGet {
  questionPriKey: number;
}

/** 프로필 질문 답변 API */
class ProfileAnswerApi {
  get = async ({ questionPriKey }: IGet) => {
    const { data } = await axiosInstance.get(`/api/question/view/question`, {
      params: {
        questionPriKey,
      },
    });

    return data;
  };

  edit = async ({ aindex, atext, priKey, questionPriKey }: IEdit) => {
    const { data } = await axiosInstance.post(
      `/api/admin/liquor/question/liquor-answer`,
      {
        aindex,
        atext,
        priKey,
        questionPriKey,
      }
    );

    return data;
  };

  delete = async () => {};
}

export default new ProfileAnswerApi();
