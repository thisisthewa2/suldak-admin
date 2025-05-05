import { useQuery } from 'react-query';

import TagApi from '@apis/services/TagApi';
import LiquorApi, { SearchParams } from '@apis/services/LiquorApi';

/** 술 추가 태그 목록 가져오는 쿼리 */
export const useGetLiquorTagListQuery = (tagType: string) => {
  const data = useQuery(['liquorTagList', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const resData = data.data.data.map((item: any) => {
    return { id: item.id, name: item.name };
  });

  console.log(resData);

  return resData;
};

/** 술 검색 쿼리 */
export const useGetLiquorQuery = (params: SearchParams) => {
  return useQuery(['liquor-list', params], () => LiquorApi.get(params), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
