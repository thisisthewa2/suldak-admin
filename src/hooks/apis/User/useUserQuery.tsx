import { useQuery } from 'react-query';

import UserApi from '@apis/services/UserApi';

/** 유저 목록 가져오는 쿼리 */
export const useGetUserQuery = () => {
  return useQuery(['user'], () => UserApi.getUsers(), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
