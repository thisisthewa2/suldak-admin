import { useMutation, useQueryClient } from 'react-query';

import useToastify from '@hooks/useToastify';

import AuthApi from '@apis/services/AuthApi';

/** 관리자 추가 */
export const useAddAdminMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AuthApi.addAdmin, {
    onSuccess: () => {
      showSuccessToastMessage('어드민이 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: () => {
      showErrorToastMessage('어드민 추가를 실패했습니다.');
    },
  });
};

/** 관리자 수정 */
export const useEditAdminMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AuthApi.addAdmin, {
    onSuccess: () => {
      showSuccessToastMessage('어드민 정보가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: () => {
      showErrorToastMessage('어드민 정보 수정을 실패했습니다');
    },
  });
};

/** 관리자 삭제 */
export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AuthApi.deleteAdmin, {
    onSuccess: () => {
      showSuccessToastMessage('어드민이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
    onError: () => {
      showErrorToastMessage('어드민 삭제를 실패했습니다.');
    },
  });
};
