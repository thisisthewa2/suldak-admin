import { useRef } from 'react';
import styled from 'styled-components';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from '@toast-ui/react-editor';

// 글자 색상 변경 플러그인
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';

// components
import Button from '@components/core/Button';

interface IProps {
  theme?: 'dark' | 'light';
  initialValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** 텍스트 에디터 컴포넌트 */
const TextEditor = ({ theme = 'dark', initialValue }: IProps) => {
  const editorRef = useRef<Editor>(null);
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  // 입력된 데이터 html로 추출
  const handleRegister = () => {
    console.log(editorRef.current?.getInstance().getHTML());
  };

  return (
    <Wrapper>
      <Editor
        ref={editorRef}
        plugins={[colorSyntax]}
        initialEditType="wysiwyg" // 초기 편집 타입
        toolbarItems={toolbarItems}
        hideModeSwitch // markdown/wysiwyg 스위칭 버튼 비활성화
        language="ko-KR"
        theme={theme}
        placeholder="텍스트를 입력해주세요..."
        usageStatistics={false} // 구글 분석 통계 수집 거부
        initialValue={initialValue}
      />

      <ButtonWrap>
        <Button onClick={handleRegister}>저장</Button>
      </ButtonWrap>
    </Wrapper>
  );
};

export default TextEditor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
`;
