import { axiosInstance } from "@apis/interceptor";

export interface IConsentItem {
  itemType: 'PRIVACY_POLICY' | 'TEAM_OF_SERVICE';
}

// 동의 항목 조회
interface IGet {
  id: number; // 동의 항목 기본키 (생략하면 생성)
  itemSeq: number; // 동의 항목 순서
  itemText: string; // 동의 항목 내용
  itemType: ''
}

/** 동의 항목 API */
class ConsentApi {

  // 조회
  get = async () => {

  }
}

export default new ConsentApi()