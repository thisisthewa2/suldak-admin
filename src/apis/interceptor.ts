import axios, { AxiosRequestHeaders, AxiosError, AxiosResponse } from 'axios'

interface HeaderType extends AxiosRequestHeaders {
  ["Content-Type"]: string;
  Authorization: string | null;
}

export const BASE_URL = "http://122.45.203.134:8083"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

let isRefreshing = false;
let failedQueue: ((token: string | AxiosError) => void)[] = [];

// 대기 중인 요청 처리 함수
const processQueue = (token: string | AxiosError) => {
  failedQueue.forEach(prom => {
    prom(token)
  })
  failedQueue = []
}

// api 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  console.log("--- Request ---");
  console.log(config)

  const headers = config.headers as HeaderType;
  const token = localStorage.getItem('token');


  // 헤더에 토큰 추가
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // 폼데이터를 사용하는 경우
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  // JSON 데이터만 보내는 경우
  else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config;
})

// api 응답 인터셉터
axiosInstance.interceptors.response.use((response) => {
  console.log(response)

  return response
}, async (error) => {
  const { config, response: { status } } = error;

})