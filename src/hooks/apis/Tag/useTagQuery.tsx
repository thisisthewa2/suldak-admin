import { useQuery } from 'react-query';

import TagApi from '@apis/services/TagApi';

/** 태그 목록 가져오는 쿼리 */
export const useGetTagQuery = (tagType: string) => {
  return useQuery(['tagList', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
