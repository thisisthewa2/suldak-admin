import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';

import TagApi from '@apis/services/TagApi';

/** 태그 추가 */
export const useAddTagMutation = () => {
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

/** 폼 데이터 태그 추가 */
export const useAddFormTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.addForm, {
    onSuccess: () => {
      showSuccessToastMessage('폼 데이터 태그가 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['tagList'] });
    },
    onError: () => {
      showErrorToastMessage('폼 데이터 태그 추가를 실패했습니다.');
    },
  });
};

/** 태그 수정 */
export const useEditTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.edit, {
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

/** 폼 데이터 태그 수정 */
export const useEditFormTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.editForm, {
    onSuccess: () => {
      showSuccessToastMessage('폼 데이터 태그가 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['tagList'] });
    },
    onError: () => {
      showErrorToastMessage('폼 데이터 태그 수정에 실패했습니다.');
    },
  });
};

/** 태그 삭제 */
export const useDeleteTagMutation = () => {
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
