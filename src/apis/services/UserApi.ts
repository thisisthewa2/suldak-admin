import { axiosInstance } from "@apis/interceptor";

// 유저 정보 조회


/** 유저 정보 API */
class UserApi {

  // 유저 목록 조회
  get = async () => {
    const { data } = await axiosInstance.post(`/api/user/view/user`, {
      birthdayYear: 0,
      endYear: 0,
      // gender: 'M',
      isActive: true,
      levelList: [0],
      // nickname: '',
      // registration: 'APPLE',
      startYear: 0,
      userEmail: '',
      warningCntList: []
    })

    return data
  }
}

export default new UserApi()