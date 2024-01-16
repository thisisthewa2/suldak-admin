import { axiosInstance } from '@apis/interceptor';

interface IEdit {
  priKey: number;
  qtext: string; // 질문 텍스트
}

interface IDelete extends Omit<IEdit, 'qtext'> {}

/** 프로필 질문 API */
class ProfileQuestionApi {
  // /api/question/view/question
  // /api/question/view/question-all
  // /api/question/view/question-list

  get = async () => {
    const { data } = await axiosInstance.get(
      `/api/question/view/question-list`
    );

    return data;
  };

  edit = async ({ priKey, qtext }: IEdit) => {
    const { data } = await axiosInstance.post(
      `/api/admin/liquor/question/liquor-question`,
      {
        priKey,
        qtext,
      }
    );

    return data;
  };

  delete = async ({ priKey }: IDelete) => {
    const { data } = await axiosInstance.post(
      `/api/admin/liquor/question/liquor-question/${priKey}`
    );

    return data;
  };
}

export default new ProfileQuestionApi();
