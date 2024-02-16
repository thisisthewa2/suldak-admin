import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { BsFillTriangleFill } from 'react-icons/bs';

// components
import Tag from '@components/core/Tag';

// hooks
import { useGetTagQuery } from '@hooks/apis/Tag/useTagQuery';

export type tagType = {
  id: number;
  name: string;
};

interface IProps {
  placeholder?: string;
  selectedTagList: tagType[];
  tagType: string;
  onClickTag?: (tag: tagType) => void;
}

/** 드롭다운 선택시 아이템 렌더링 하는 컴포넌트 */
const DropdownSelector = ({
  placeholder = '선택해주세요',
  selectedTagList,
  tagType,
  onClickTag,
}: IProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: tagList } = useGetTagQuery(tagType);

  // 드롭다운 on/off
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectTag = (tag: tagType) => {
    if (onClickTag) {
      onClickTag(tag);
    } else {
      // 멀티 태그 선택
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={wrapperRef}>
      <DropdownHeader onClick={handleToggle}>
        {selectedTagList?.length > 0
          ? selectedTagList.map((tag: tagType) => (
              <Tag key={tag.id} pk={tag.id} name={tag.name}>
                {tag.name}
              </Tag>
            ))
          : placeholder}
        <Arrow $isOpen={isOpen} />
      </DropdownHeader>
      {isOpen && (
        <DropdownListWrapper>
          {tagList.data.map((tag: tagType) => (
            <Tag key={tag.id} pk={tag.id} name={tag.name} onClick={handleSelectTag}>
              {tag.name}
            </Tag>
          ))}
        </DropdownListWrapper>
      )}
    </DropdownWrapper>
  );
};

export default DropdownSelector;

const DropdownWrapper = styled.div`
  position: relative;
  color: ${(props) => props.theme.text.secondary};
`;

const DropdownHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.theme.componentBgColor};
  border: 1px solid ${(props) => props.theme.form.border};
  border-radius: 0.25rem;
  cursor: pointer;
`;

const Arrow = styled(BsFillTriangleFill)<{ $isOpen: boolean }>`
  position: absolute;
  right: 1rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.3s ease-in-out;
  font-size: 0.5rem;
`;

const DropdownListWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* min-height: 50px; */
  top: 120%;
  left: 0;
  width: 100%;
  color: ${(props) => props.theme.text.primary};
  background-color: ${(props) => props.theme.componentBgColor};
  border: 1px solid ${(props) => props.theme.form.border};
  border-radius: 0.25rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0.75rem;
  margin: 0;
  z-index: 10;
`;
