import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';
import useModal from '@hooks/useModal';

import LiquorApi from '@apis/services/LiquorApi';

/** 술 추가 */
export const useAddLiquorMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(LiquorApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('술이 추가되었습니다.');
      // 술 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['liquor-list'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('술 추가를 실패했습니다.');
    },
  });
};

export const useEditLiquorMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(LiquorApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('술이 수정되었습니다.');
      // 술 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['liquor-list'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('술 수정을 실패했습니다.');
    },
  });
};

export const useDeleteLiquorMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(LiquorApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('술이 삭제되었습니다.');
      // 술 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['liquor-list'] });
    },
    onError: () => {
      showErrorToastMessage('술 삭제를 실패했습니다.');
    },
  });
};