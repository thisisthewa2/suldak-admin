import { useMutation, useQueryClient } from 'react-query';

import useToastify from '@hooks/useToastify';

import TagApi from '@apis/services/TagApi';

/** 태그 수정 및 추가 */
export const useAddEditTagMutation = () => {
  const queryClient = useQueryClient();
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();

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
