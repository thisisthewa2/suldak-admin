import { axiosInstance, BASE_URL } from '@apis/interceptor';

class NoticeApi {
  get = async () => {
    const { data } = await axiosInstance.get(`/api/notice/view/list`);

    return data;
  };

  getDetail = async (noticeId: number) => {
    const { data } = await axiosInstance.get(`/api/notice/view/${noticeId}`);

    return data;
  };

  add = async ({ formD, sendAlarm }: { formD: { title: string; body: string }; sendAlarm: boolean }) => {
    const { data } = await axiosInstance.post(`${BASE_URL}/api/notice?sendAlarm=${sendAlarm}`, formD, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    return data;
  };

  edit = async ({
    formD,
    noticeId,
  }: {
    formD: {
      title: string;
      body: string;
    };
    noticeId: number;
  }) => {
    const { data } = await axiosInstance.put(`${BASE_URL}/api/notice/${noticeId}`, formD);

    return data;
  };

  delete = async (noticeId: number) => {
    const { data } = await axiosInstance.delete(`${BASE_URL}/api/notice/${noticeId}`);

    return data;
  };
}

export default new NoticeApi();
