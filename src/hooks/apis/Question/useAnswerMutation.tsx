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

/** 프로필 질문 답변 추가 */
export const useAnswerAddMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AnswerApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('프로필 질문이 추가되었습니다.');
      queryClient.invalidateQueries(['questionAnswerList']);
    },
    onError: () => {
      showErrorToastMessage('프로필 질문 추가를 실패했습니다.');
    },
  });
};

/** 프로필 질문 답변 삭제 */
export const useAnswerDeleteMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(AnswerApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('프로필 질문이 삭제되었습니다.');
      queryClient.invalidateQueries(['questionAnswerList']);
    },
    onError: () => {
      showErrorToastMessage('프로필 질문 삭제를 실패했습니다.');
    },
  });
};
