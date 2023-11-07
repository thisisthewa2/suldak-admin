import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';

// apis
import TagApi from '@apis/services/TagApi';

// types
import { IColumn } from '@components/core/Table';

interface IProps {
  tagType: string;
  searchKeyword?: string;
  selecteTag: (row: any) => void;
}

/** 태그 목록 컴포넌트 */
const TagList = ({ tagType, searchKeyword = '', selecteTag }: IProps) => {
  const { data } = useQuery(['tagList', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const filteredData = useSearchFilter(data?.data || [], searchKeyword, 'name');

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '아이디',
      accessor: 'id',
      width: '20%',
    },
    {
      Header: '태그명',
      accessor: 'name',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button onClick={() => selecteTag(row)}>수정</Button>
          <Button onClick={() => selecteTag(row)} buttonType="cancel">
            삭제
          </Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'right',
    },
  ];

  return (
    <>
      <div>{data && <Table data={filteredData} columns={columns} />}</div>
    </>
  );
};

export default TagList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
