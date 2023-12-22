import { useQuery } from 'react-query';

import AuthApi from '@apis/services/AuthApi';

/** 어드민 목록 가져오는 쿼리 */
export const useGetAdminQuery = () => {
  return useQuery(['adminList'], () => AuthApi.getAdmins(), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
