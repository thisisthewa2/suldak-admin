import { axiosInstance } from '@apis/interceptor';

interface IGet {
  questionPriKey: number;
}

interface IAdd {
  aindex?: number;
  atext?: string;
  priKey?: number;
  questionPriKey: number;
}

interface IEdit {
  aindex: number;
  atext: string;
  priKey: number;
  questionPriKey: number;
}

interface IDelete {
  liquorAPriKey: number;
}

/** 프로필 질문 답변 API */
class ProfileAnswerApi {
  add = async ({ aindex, atext, priKey, questionPriKey }: IAdd) => {
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

  delete = async ({ liquorAPriKey }: IDelete) => {
    const { data } = await axiosInstance.delete(
      `/api/admin/liquor/question/liquor-answer/${liquorAPriKey}`
    );

    return data;
  };
}

export default new ProfileAnswerApi();
