import { useQuery } from 'react-query';

import TagApi from '@apis/services/TagApi';

/** 모임 태그 목록을 가져오는 쿼리 */
export const useGetPartyTagQuery = (tagType: string ) => {
  return useQuery(['partyTagList', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
