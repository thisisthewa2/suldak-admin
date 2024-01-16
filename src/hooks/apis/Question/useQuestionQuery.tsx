import { useQuery } from 'react-query';

import QuestionApi from '@apis/services/QuestionApi';

/** 프로필 질문 전체 가져오는 쿼리 */
export const useGetQuestionQuery = () => {
  return useQuery(['questionList'], () => QuestionApi.get(), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
