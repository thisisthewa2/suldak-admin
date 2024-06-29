import { useQuery } from 'react-query';

import BannerApi, { IGet } from '@apis/services/BannerApi';

/** 배너 리스트를 가져오는 쿼리 */
export const useGetBannerQuery = ({ bannerCategory, isActive }: IGet) => {
  return useQuery(
    ['bannerList', bannerCategory, isActive],
    () =>
      BannerApi.get({
        bannerCategory: bannerCategory,
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
