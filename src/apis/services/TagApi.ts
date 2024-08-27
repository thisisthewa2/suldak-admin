import { axiosInstance } from '@apis/interceptor';

// 태그 추가 타입
interface IAdd {
  tagType: string; // endpoint url
  name: string;
}

// 태그 수정 타입
interface IEdit {
  tagType: string;
  name: string;
  priKey: number;
}

// 폼 태그 추가
interface IAddForm {
  formD: any;
  tagType: string;
}

// 폼 태그 수정
interface IEditForm {
  eFormD: any;
  tagType: string;
  priKey: number;
}

// 모임 태그 추가
interface IAddParty {
  tagType: string; 
  name: string;
  id?: number;
}

// 태그 삭제 타입
interface IDelete {
  tagType: string;
  priKey: number;
}

// 태그 조회
interface IGet {
  tagType: string;
}

/** 태그 API */
class TagApi {
  // 추가 및 수정 (id값이 있으면 수정)
  add = async ({ tagType, name }: IAdd) => {
    const { data } = await axiosInstance.post(`/api/admin/tag/add/${tagType}`, {
      name,
    });

    return data;
  };

  edit = async ({ tagType, priKey, name }: IEdit) => {
    const { data } = await axiosInstance.put(`/api/admin/tag/add/${tagType}/${priKey}`, {
      name,
    });

    return data;
  }

  addForm = async({ formD, tagType }: IAddForm) => {
    const { data } = await axiosInstance.post(`/api/admin/tag/add/${tagType}`, formD);

    return data;
  }

  editForm = async({ eFormD, tagType, priKey }: IEditForm) => {
    const { data } = await axiosInstance.put(`/api/admin/tag/add/${tagType}/${priKey}`, eFormD);

    return data;
  }

  // 모임 태그 추가 및 수정
  addParty = async ({ tagType, id, name }:IAddParty) => {
    const { data } = await axiosInstance.post(`/api/admin/${tagType}`, {
      id: id ? id : null,
      name,
    });
    
    return data;
  };

  // 삭제
  delete = async ({ tagType, priKey }: IDelete) => {
    const response = await axiosInstance.delete(
      `/api/admin/tag/del/${tagType}/${priKey}`
    );

    return response.data;
  };

  // 모임 태그 삭제
  deleteParty = async ({ tagType, priKey }: IDelete) => {
    const response = await axiosInstance.delete(
      `/api/admin/${tagType}/${priKey}`
    );

    return response.data;
  };

  // 조회 (tagType을 통해 기본 태그 & 모임 태그 분류)
  get = async ({ tagType }: IGet) => {
    const { data } = await axiosInstance.get(`/api/tag/view/${tagType}`);
    return data;
  };
}

export default new TagApi();
