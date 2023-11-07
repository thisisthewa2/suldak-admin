import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

// components
import Input from '@components/core/Input';
import Dropdown from '@components/core/Dropdown';
import Button from '@components/core/Button';

// utils
import { TagTypes } from '@libs/getTagType';

interface IProps {
  tagName: string;
  onChangeTagName: (event: ChangeEvent<HTMLInputElement>) => void;
  // selectTagType: (selected: { value: string; label: string }) => void;
}

/** 태그 추가 컴포넌트 */
const TagAdd = ({ tagName, onChangeTagName }: IProps) => {
  return (
    <Wrapper>
      <FormWrapper>
        {/* <Dropdown options={TagTypes} onSelect={selectTagType} placeholder="주량" /> */}
        <Input label="태그명" value={tagName} onChange={onChangeTagName} />

        <Button onClick={() => console.log(tagName)} />
      </FormWrapper>
    </Wrapper>
  );
};

export default TagAdd;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
`;
