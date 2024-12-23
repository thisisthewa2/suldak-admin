import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';
import useModal from '@hooks/useModal';

import RecommendApi from '@apis/services/RecommendApi';

/** 추천 검색어 추가 및 수정 */
export const useAddRecommendMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(RecommendApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('추천 검색어가 추가되었습니다.');
      // 추천 검색어 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['recommendList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('추천 검색어 추가에 실패했습니다.');
    },
  });
};

/** 추천 검색어 수정 */
export const useEditRecommendMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(RecommendApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('추천 검색어가 수정되었습니다.');
      // 추천 검색어 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['recommendList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('추천 검색어 수정을 실패했습니다.');
    },
  });
};

/** 추천 검색어 삭제 */
export const useDeleteRecommendMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(RecommendApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('추천 검색어가 삭제되었습니다.');
      // 추천 검색어 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['recommendList'] });
    },
    onError: () => {
      showErrorToastMessage('추천 검색어 삭제를 실패했습니다.');
    },
  });
};

/** 추천 검색어 활성화 핸들링 */
export const useHandleActiveRecommendMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(RecommendApi.handleActive, {
    onSuccess: () => {
      showSuccessToastMessage('추천 검색어가 수정되었습니다.');
      // 추천 검색어 리스트 재호출
      queryClient.invalidateQueries({ queryKey: ['recommendList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('추천 검색어 수정을 실패했습니다.');
    },
  });
};