import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';

import CancelApi from '@apis/services/CancelApi';

/** 모임 취소 이유 추가 */
export const useAddReasonMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(CancelApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('모임 취소 이유 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['cancelList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 취소 이유 추가를 실패했습니다.');
    },
  });
};

/** 모임 취소 이유 수정 */
export const useEditReasonMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(CancelApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('모임 취소 이유가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['cancelList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 취소 이유 수정을 실패했습니다.');
    },
  });
};

/** 모임 취소 이유 삭제 */
export const useDeleteReasonMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(CancelApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('모임 취소 이유가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['cancelList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 취소 이유 삭제를 실패했습니다.');
    },
  });
};
