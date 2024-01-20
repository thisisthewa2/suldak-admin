import { useQuery } from 'react-query';

import AnswerApi from '@apis/services/AnswerApi';

/** 프로필 질문 답변 가져오는 쿼리 */
export const useGetAnswerQuery = (questionPriKey: number) => {
  return useQuery(
    ['questionAnswerList', questionPriKey],
    () =>
      AnswerApi.get({
        questionPriKey: questionPriKey,
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
