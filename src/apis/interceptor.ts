import axios, { AxiosRequestHeaders, AxiosError, AxiosResponse } from 'axios'

interface HeaderType extends AxiosRequestHeaders {
  ["Content-Type"]: string;
  Authorization: string | null;
}

export const BASE_URL = ""

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
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
  console.log(config)

  return config;
})

// api 응답 인터셉터
axiosInstance.interceptors.response.use((response) => {
  console.log(response)

  return response
})