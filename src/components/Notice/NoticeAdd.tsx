import { useState } from 'react';
import Input from '@components/core/Input';
import TextEditor from '@components/core/TextEditor';
import { useAddNoticeMutation } from '@hooks/apis/Notice/useNoticeMutation';
import useInput from '@hooks/useInput';

export default function NoticeAdd() {
  const title = useInput('');
  const [body, setBody] = useState('');
  const [isAlarm, setIsAlarm] = useState(false);

  const { mutate: addNotice } = useAddNoticeMutation();

  const handleToggleIsAlarm = () => {
    setIsAlarm((prev) => !prev);
  };

  const handleChangeBody = (markdown: string) => {
    setBody(markdown);
  };

  const handleSubmit = () => {
    addNotice({
      formD: {
        title: title.value,
        body: body,
      },
      sendAlarm: isAlarm,
    });
  };

  return (
    <>
      <Input label="제목" name="title" value={title.value} onChange={title.onChange} />

      <div>
        <label>알람 보내기</label>
        <input type="checkbox" checked={isAlarm} onChange={handleToggleIsAlarm} />
      </div>

      <TextEditor initialValue="" onChange={handleChangeBody} onConfirm={handleSubmit} confirmBtnText="공지 추가" />
    </>
  );
}
