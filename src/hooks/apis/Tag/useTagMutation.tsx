import { useMutation, useQueryClient } from 'react-query';

import useToastify from '@hooks/useToastify';

import TagApi from '@apis/services/TagApi';

/** 태그 추가 */
export const useAddTagMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('태그가 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['tagList'] });
    },
    onError: () => {
      showErrorToastMessage('태그 추가를 실패했습니다.');
    },
  });
};

/** 태그 수정 */
export const useEditTagMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('태그 정보가 수정되었습니다.');
      // 태그 정보가 수정되면 태그 리스트를 재호출
      queryClient.invalidateQueries({ queryKey: ['tagList'] });
    },
    onError: () => {
      showErrorToastMessage('태그 정보 수정을 실패했습니다.');
    },
  });
};

/** 태그 삭제 */
export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('태그가 삭제되었습니다.');
      // 태그 정보가 수정되면 태그 리스트를 재호출
      queryClient.invalidateQueries({ queryKey: ['tagList'] });
    },
    onError: () => {
      showErrorToastMessage('태그 삭제를 실패했습니다.');
    },
  });
};
