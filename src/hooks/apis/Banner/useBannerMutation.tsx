import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';
import useModal from '@hooks/useModal';

import BannerApi from '@apis/services/BannerApi';

/** 배너 추가 */
export const useAddBannerMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(BannerApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('배너가 추가되었습니다.');
      // 배너 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['bannerList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('배너 추가에 실패했습니다.');
    },
  });
};

/** 배너 수정 */
export const useEditBannerMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(BannerApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('배너가 수정되었습니다.');
      // 배너 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['bannerList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('배너 수정을 실패했습니다.');
    },
  });
};

/** 배너 삭제 */
export const useDeleteBannerMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(BannerApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('배너가 삭제되었습니다.');
      // 배너 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['bannerList'] });
    },
    onError: () => {
      showErrorToastMessage('배너 삭제를 실패했습니다.');
    },
  });
};