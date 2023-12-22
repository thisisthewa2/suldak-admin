import { useQuery } from 'react-query';

import ConsentApi, { itemType } from '@apis/services/ConsentApi';

/** 동의 항목 목록 가져오는 쿼리 */
export const useGetConsentQuery = (itemType: itemType) => {
  return useQuery(
    ['consentList', itemType],
    () =>
      ConsentApi.get({
        itemType: itemType,
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
