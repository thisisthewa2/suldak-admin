import { useQuery } from 'react-query';

import FeedBackApi from "@apis/services/FeedBackApi";

/** 피드백 목록을 가져오는 쿼리 */
export const useGetFeedBackQuery = () => {
  return useQuery(
    ['feedbackList'],
    () =>
      FeedBackApi.get(),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};