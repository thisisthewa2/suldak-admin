import { useMutation } from 'react-query';
import { queryClient } from '@utils/QueryClient';

import useToastify from '@hooks/useToastify';

import TagApi from '@apis/services/TagApi';

/** 모임 태그 추가 */
export const useAddPartyTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.addParty, {
    onSuccess: () => {
      showSuccessToastMessage('모임 태그가 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['partyTagList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 태그 추가를 실패했습니다.');
    },
  });
};

/** 모임 태그 수정 */
export const useEditPartyTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.editParty, {
    onSuccess: () => {
      showSuccessToastMessage('모임 태그 정보가 수정되었습니다.');
      // 태그 정보가 수정되면 태그 리스트를 재호출
      queryClient.invalidateQueries({ queryKey: ['partyTagList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 태그 정보 수정을 실패했습니다.');
    },
  });
};

/** 모임 태그 삭제 */
export const useDeletePartyTagMutation = () => {
  const { showSuccessToastMessage, showErrorToastMessage } = useToastify();

  return useMutation(TagApi.deleteParty, {
    onSuccess: () => {
      showSuccessToastMessage('모임 태그가 삭제되었습니다.');
      // 태그 정보가 수정되면 태그 리스트를 재호출
      queryClient.invalidateQueries({ queryKey: ['partyTagList'] });
    },
    onError: () => {
      showErrorToastMessage('모임 태그 삭제를 실패했습니다.');
    },
  });
};
