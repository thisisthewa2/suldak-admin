import Button from '@components/core/Button';
import Input from '@components/core/Input';
import { useAddNoticeMutation } from '@hooks/apis/Notice/useNoticeMutation';
import useInput from '@hooks/useInput';
import { useState } from 'react';

export default function NoticeAdd() {
  const title = useInput('');
  const [body, setBody] = useState('');

  const { mutate: addNotice } = useAddNoticeMutation();

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  return (
    <>
      <Input label="제목" name="name" value={title.value} onChange={title.onChange} />

      <textarea
        value={body}
        onChange={handleChangeBody}
        placeholder="내용을 입력하세요"
        style={{ width: '100%', height: '200px' }}
      />

      <Button
        onClick={() =>
          addNotice({
            title: title.value,
            body,
          })
        }
      >
        추가
      </Button>
    </>
  );
}
