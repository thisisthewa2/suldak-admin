import NoticeApi from '@apis/services/NoticeApi';
import useModal from '@hooks/useModal';
import useToastify from '@hooks/useToastify';
import { queryClient } from '@utils/QueryClient';
import { useMutation } from 'react-query';

/**
 * 공지사항 추가
 */
export const useAddNoticeMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(NoticeApi.add, {
    onSuccess: () => {
      showSuccessToastMessage('공지사항이 추가되었습니다.');

      queryClient.invalidateQueries({ queryKey: ['noticeList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('공지사항 추가를 실패했습니다');
    },
  });
};

/**
 * 공지사항 수정
 */
export const useEditNoticeMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(NoticeApi.edit, {
    onSuccess: () => {
      showSuccessToastMessage('공지사항이 수정되었습니다.');

      queryClient.invalidateQueries({ queryKey: ['noticeList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('공지사항 수정을 실패했습니다');
    },
  });
};

/**
 * 공지사항 삭제
 */
export const useDeleteNoticeMutation = () => {
  const { showErrorToastMessage, showSuccessToastMessage } = useToastify();
  const { closeModal } = useModal();

  return useMutation(NoticeApi.delete, {
    onSuccess: () => {
      showSuccessToastMessage('공지사항이 삭제되었습니다.');

      queryClient.invalidateQueries({ queryKey: ['noticeList'] });
      closeModal();
    },
    onError: () => {
      showErrorToastMessage('공지사항 삭제를 실패했습니다');
    },
  });
};
