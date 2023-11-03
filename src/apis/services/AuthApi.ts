import { axiosInstance } from "@apis/interceptor";

// 로그인 타입
interface ILogin {
  adminId: string;
  adminPw: string;
}

// 관리자 추가 타입
interface IAdd {
  adminId: string;
  adminNm: string; // 관리자 이름
  adminPw: string;
  priKey?: string; // 관리자 계정 기본키 (없으면 서버에서 자동 생성)
}

// 관리자 삭제 타입
interface IDelete {
  priKey: number;
}

/** 계정 API */
class AuthApi {

  // 로그인
  login = async ({ adminId, adminPw }: ILogin) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/auth/login`, {
        adminId: adminId,
        adminPw: adminPw
      })

      // 로그인 성공시 토큰 저장
      localStorage.setItem('token', data.data.refreshToken)

      return data
    }
    catch (error) {
      throw error
    }
  }

  // 로그아웃
  logout = async () => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/auth/logout`)

      return data
    }
    catch (error) {
      throw error
    }
  }

  // 관리자 조회
  getAdmins = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/auth/admin-user`)
      return data
    }
    catch (error) {
      throw error
    }
  }

  // 관리자 추가
  addAdmin = async ({ adminId, adminNm, adminPw, priKey }: IAdd) => {
    try {
      const { data } = await axiosInstance.post(`/api/admin/auth/signup`, {
        adminId, adminNm, adminPw,
        priKey: priKey ? priKey : null
      })
      return data
    }
    catch (error) {
      throw error;
    }
  }

  // 관리자 삭제
  deleteAdmin = async ({ priKey }: IDelete) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/auth/admin-user`, {
        data: {
          priKey
        }
      })

      return response.data
    }
    catch (error) {
      throw error
    }
  }
}

export default new AuthApi()