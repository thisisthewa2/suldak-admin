import { useQuery } from "react-query";

import UserApi, { GetUserParams } from "@apis/services/UserApi";

/** 유저 목록 가져오는 쿼리 */
export const useGetUserQuery = (params: GetUserParams) => {
  return useQuery(["user", params], () => UserApi.get(params), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
