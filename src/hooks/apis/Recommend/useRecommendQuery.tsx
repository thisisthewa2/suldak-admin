import { useQuery } from 'react-query';

import RecommendApi, { IGet } from '@apis/services/RecommendApi';

/** 추천 검색어 리스트를 가져오는 쿼리 */
export const useGetRecommendQuery = ({ searchType, isActive }: IGet) => {
  return useQuery(
    ['recommendList', searchType, isActive],
    () =>
      RecommendApi.get({
        searchType: searchType,
        isActive: isActive,
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
