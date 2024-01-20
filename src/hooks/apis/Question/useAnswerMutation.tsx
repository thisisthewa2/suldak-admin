import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';

import AnswerApi from '@apis/services/AnswerApi';

/** 프로필 질문 답변 수정 */
export const useAnswerEditMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AnswerApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('프로필 질문 답변이 수정되었습니다.');
      queryClient.invalidateQueries(['questionAnswerList']);
    },
    onError: () => {
      showErrorToastMessage('프로필 질문 답변 수정을 실패했습니다.');
    },
  });
};
