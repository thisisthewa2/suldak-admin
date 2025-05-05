import Button from '@components/core/Button';
import Input from '@components/core/Input';
import { useDeleteNoticeMutation, useEditNoticeMutation } from '@hooks/apis/Notice/useNoticeMutation';
import { useGetNoticeDetailQuery } from '@hooks/apis/Notice/useNoticeQuery';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function NoticeEdit({ noticeId }: { noticeId: number }) {
  const { mutate: editNotice } = useEditNoticeMutation();
  const { mutate: deleteNotice } = useDeleteNoticeMutation();
  const { data: notice, isLoading } = useGetNoticeDetailQuery(noticeId);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setBody(notice.body);
    }
  }, [notice]);

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  if (isLoading || !notice) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Input label="제목" name="name" value={title} onChange={handleChangeTitle} />

      <textarea
        value={body}
        onChange={handleChangeBody}
        placeholder="내용을 입력하세요"
        style={{ width: '100%', height: '200px' }}
      />

      <ButtonWrapper>
        <Button buttonType="cancel" onClick={() => deleteNotice(noticeId)}>
          삭제
        </Button>
        <Button
          onClick={() =>
            editNotice({
              formD: {
                title,
                body,
              },
              noticeId,
            })
          }
        >
          수정
        </Button>
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
