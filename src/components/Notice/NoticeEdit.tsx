import Input from '@components/core/Input';
import TextEditor from '@components/core/TextEditor';
import { useDeleteNoticeMutation, useEditNoticeMutation } from '@hooks/apis/Notice/useNoticeMutation';
import { useGetNoticeDetailQuery } from '@hooks/apis/Notice/useNoticeQuery';
import useInput from '@hooks/useInput';
import { useState } from 'react';

export default function NoticeEdit({ noticeId }: { noticeId: number }) {
  const { mutate: editNotice } = useEditNoticeMutation(noticeId);
  const { mutate: deleteNotice } = useDeleteNoticeMutation();
  const { data: notice, isLoading } = useGetNoticeDetailQuery(noticeId);

  const title = useInput(notice.title);
  const [body, setBody] = useState(notice.body);

  const handleChangeBody = (markdown: string) => {
    setBody(markdown);
  };

  const handleSubmit = () => {
    editNotice({
      formD: {
        title: title.value,
        body: body,
      },
      noticeId,
    });
  };

  if (isLoading || !notice) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Input label="제목" name="name" value={title.value} onChange={title.onChange} />

      <TextEditor
        initialValue={notice.body}
        onChange={handleChangeBody}
        onConfirm={handleSubmit}
        confirmBtnText="공지 수정"
        onCancel={() => deleteNotice(noticeId)}
        cancelBtnText="공지 삭제"
      />
    </>
  );
}
