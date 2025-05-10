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

// hooks
import useTheme from '@hooks/useTheme';

interface IProps {
  initialValue?: string;
  confirmBtnText?: string;
  onConfirm?: (data?: any) => void;
  cancelBtnText?: string;
  onCancel?: (data?: any) => void;
  onChange?: (markdown: string) => void;
}

/** 텍스트 에디터 컴포넌트 */
const TextEditor = ({
  initialValue,
  confirmBtnText = '저장',
  onConfirm,
  cancelBtnText,
  onCancel,
  onChange,
}: IProps) => {
  const { currentTheme } = useTheme();
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

  const handleChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown();
    if (onChange && markdown !== undefined) {
      onChange(markdown);
    }
  };

  // 입력된 데이터 markdown으로 추출
  const handleRegister = () => {
    if (onConfirm) {
      const markdown = editorRef.current?.getInstance().getMarkdown();
      onConfirm(markdown);
    }
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
        theme={currentTheme === 'DARK' ? 'dark' : 'light'}
        placeholder="텍스트를 입력해주세요..."
        usageStatistics={false} // 구글 분석 통계 수집 거부
        initialValue={initialValue}
        autofocus
        onChange={handleChange}
      />

      <ButtonWrap>
        {cancelBtnText && (
          <Button onClick={onCancel} buttonType="reset">
            {cancelBtnText}
          </Button>
        )}
        <Button onClick={handleRegister}>{confirmBtnText}</Button>
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
  justify-content: flex-end;
  gap: 1rem;
`;
