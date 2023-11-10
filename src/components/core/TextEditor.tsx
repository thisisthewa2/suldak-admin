import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';

/** 텍스트 에디터 컴포넌트 */
const TextEditor = () => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  return (
    <>
      <Editor
        initialEditType="wysiwyg"
        toolbarItems={toolbarItems}
        hideModeSwitch
        language="ko-KR"
        theme="dark"
      />
    </>
  );
};

export default TextEditor;
