import NoticeApi from '@apis/services/NoticeApi';
import { useQuery } from 'react-query';

export const useGetNoticeQuery = () => {
  const data = useQuery(['noticeList'], () => NoticeApi.get(), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return data.data;
};

export const useGetNoticeDetailQuery = (noticeId: number) => {
  const data = useQuery(['notice', noticeId], () => NoticeApi.getDetail(noticeId), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return data.data;
};
