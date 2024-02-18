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
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('술 추가를 실패했습니다.');
    },
  });
};
