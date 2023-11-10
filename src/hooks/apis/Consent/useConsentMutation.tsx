import { useMutation, useQueryClient } from 'react-query';

import useToastify from '@hooks/useToastify';

import ConsentApi from '@apis/services/ConsentApi';

/** 동의 항목 추가 */
export const useAddConsentMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(ConsentApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('동의 항목이 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['consentList'] });
    },
    onError: () => {
      showErrorToastMessage('동의 항목 추가를 실패했습니다.');
    },
  });
};

/** 동의 항목 수정 */
export const useEditConsentMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(ConsentApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('동의 항목이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['consentList'] });
    },
    onError: () => {
      showErrorToastMessage('동의 항목 수정을 실패했습니다.');
    },
  });
};

/** 동의 항목 삭제 */
export const useDeleteConsentMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(ConsentApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('동의 항목이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['consentList'] });
    },
    onError: () => {
      showErrorToastMessage('동의 항목 삭제를 실패했습니다.');
    },
  });
};
