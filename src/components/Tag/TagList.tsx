import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { createColumnHelper } from '@tanstack/react-table';

// components
import Table from '@components/core/Table';

// apis
import TagApi from '@apis/services/TagApi';

interface IProps {
  tagType: string;
  searchKeyword?: string;
}


/** 태그 목록 컴포넌트 */
const TagList = ({ tagType, searchKeyword }: IProps) => {
  const { data } = useQuery(['tag', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', { header: '태그명', size: 200 }),
    columnHelper.accessor('id', {
      header: '아이디',
      size: 100,
    }),
  ];

  return (
    <>
      <div>{data && <Table data={data.data} columns={columns} />}</div>
    </>
  );
};

export default TagList;
