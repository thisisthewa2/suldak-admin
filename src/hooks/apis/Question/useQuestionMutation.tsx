import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';

import QuestionApi from '@apis/services/QuestionApi';

/** 프로필 질문 수정 */
export const useEditQuesitonMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(QuestionApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('프로필 질문이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['questionList'] });
    },
    onError: () => {
      showErrorToastMessage('프로필 질문 수정을 실패했습니다.');
    },
  });
};

/** 프로필 질문 삭제 */
export const useDeleteQuestionMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(QuestionApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('프로필 질문이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['questionList'] });
    },
    onError: () => {
      showErrorToastMessage('프로필 질문 삭제를 실패했습니다.');
    },
  });
};
