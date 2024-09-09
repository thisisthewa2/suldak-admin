import { axiosInstance } from '@apis/interceptor';

export interface IGet {
  partyRoleType: string;
}

interface IAdd {
  partyRoleType: string;
  reason: string;
  priKey?: number;
}

interface IDelete {
  priKey: number;
}

/** 모임 취소 이유 API */
class CancelApi {
  get = async ({ partyRoleType }:IGet) => {
    const { data } = await axiosInstance.get(
      `/api/party-cancel/view/list`, {
        params: {
          partyRoleType,
        }
      }
    );

    return data;
  };

  add = async ({ partyRoleType, reason}: IAdd) => {
    const { data } = await axiosInstance.post(`/api/admin/party-cancel`, {
      partyRoleType,
      reason,
    });

    return data;
  }

  edit = async ({ partyRoleType, reason, priKey}: IAdd) => {
    const { data } = await axiosInstance.put(`/api/admin/party-cancel/${priKey}`, {
      partyRoleType,
      reason,
    });

    return data;
  }

  delete = async ({ priKey }: IDelete) => {
    const { data } = await axiosInstance.delete(`/api/admin/party-cancel/${priKey}`);

    return data;
  }
}

export default new CancelApi();
