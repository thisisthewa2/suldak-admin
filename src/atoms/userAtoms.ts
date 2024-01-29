import { atomWithStorage } from 'jotai/utils';

export interface IUser {
  adminId: string;
  adminNm: string;
  createAt: string;
  id: number;
  modifiedAt: string;
  refreshToken: string;
}

const defaultUser: IUser = {
  adminId: '',
  adminNm: '',
  createAt: '',
  id: 0,
  modifiedAt: '',
  refreshToken: '',
};

// 유저 데이터
export const userAtom = atomWithStorage<IUser | null>('user', defaultUser);
