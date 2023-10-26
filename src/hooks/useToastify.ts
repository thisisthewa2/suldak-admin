import { toast } from 'react-toastify'

/** 토스트 메시지 커스텀 훅 */
const useToastify = () => {
  // 인포 토스트 메시지
  const showInfoToastMessage = (message: string) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 3000,
    })
  }

  // 성공 토스트 메시지
  const showSuccessToastMessage = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 3000,
    })
  }

  // 경고 토스트 메시지
  const showWarningToastMessage = (message: string) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 3000,
    })
  }

  // 에러 토스트 메시지
  const showErrorToastMessage = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 3000,
    })
  }

  return { showInfoToastMessage, showSuccessToastMessage, showWarningToastMessage, showErrorToastMessage }
}

export default useToastify;