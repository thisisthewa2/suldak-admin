import { useQuery } from 'react-query';

import CancelApi, { IGet } from '@apis/services/CancelApi';

/** 모임 취소 이유 목록을 가져오는 쿼리 */
export const useGetCancelReasonQuery = ({ partyRoleType }: IGet) => {
  return useQuery(
    ['cancelList', partyRoleType],
    () =>
      CancelApi.get({
        partyRoleType,
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};