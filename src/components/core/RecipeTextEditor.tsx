import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from '@toast-ui/react-editor';

// hooks
import useTheme from '@hooks/useTheme';

interface RecipeProps {
  onChange?: (data: any) => void;
  label?: string;
  value?: string[];
}

/** 술 레시피 에디터 커스텀 컴포넌트 */
const RecipeTextEditor = ({
  onChange,
  label,
  value,
}: RecipeProps) => {
  const { currentTheme } = useTheme();
  const editorRef = useRef<Editor>(null);

  const toolbarItems = [
    ['ol'],
  ];

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();

    if (editorInstance && value) {
      const htmlValue = value.map(item => `<li><p>${item}</p></li>`).join('');
      const listHTML = `<ol>${htmlValue}<li><p> </p></li></ol>`;
      editorInstance.setHTML(listHTML);
    }
  }, []);

  const handleChange = () => {
    if (onChange) {
      const editorContent = editorRef.current?.getInstance()?.getHTML();
      
      if (editorContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorContent, 'text/html');

        const liquorRecipe = Array.from(doc.querySelectorAll('li')).map(li => {
          return Array.from(li.querySelectorAll('p')).map(el => el.textContent || '').join(' ');
        }).filter(item => item.trim() !== '');

        onChange(liquorRecipe);
      } else {
        console.log("특별한 레시피가 없습니다.");
      }
    }
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledEditor>
        <Editor
          ref={editorRef}
          initialEditType="wysiwyg"
          toolbarItems={toolbarItems}
          hideModeSwitch
          language="ko-KR"
          placeholder="상단 번호 매기기를 적용하고 순서에 맞게 레시피를 입력 해주세요."
          theme={currentTheme === 'DARK' ? 'dark' : 'light'}
          usageStatistics={false}
          autofocus
          onChange={handleChange} // 입력이 변경될 때 호출
        />
      </StyledEditor>
    </Wrapper>
  );
};

export default RecipeTextEditor;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.text.primary};
  margin-bottom: 0.25rem;
  min-width: 100px;
  width: 200px;
`;

const StyledEditor = styled.div`
  width: 1000px;
`;
