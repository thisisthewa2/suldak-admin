import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

// apis
import TagApi from '@apis/services/TagApi';

interface IProps {
  tagType: string;
}

/** 태그 목록 컴포넌트 */
const TagList = ({ tagType }: IProps) => {
  const { data } = useQuery(['tag', tagType], () => TagApi.get({ tagType }), {
    suspense: true,
    useErrorBoundary: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div>{data && data.data[0].name}</div>
    </>
  );
};

export default TagList;
