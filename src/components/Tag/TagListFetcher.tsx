import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

// components
import Loader from '@components/core/Loader';

// utils
import { getTagType } from '@libs/getTagType';

// apis
import TagApi from '@apis/services/TagApi';

interface IProps {
  children?: React.ReactNode;
  tagType: string;
}

/** 태그 리스트 fetch 컴포넌트 */
const TagListFetcher = ({ children, tagType = '주량' }: IProps) => {
  // 태그 리스트 가져오는 함수
  const { data, error, isLoading } = useQuery(['tag', tagType], () =>
    TagApi.get({ tagType: getTagType(tagType) })
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) {
    throw error;
  }

  if (isLoading) {
    return <Loader />;
  }

  // React.Children.map을 사용하여 여러 자식에 데이터 전달 가능
  return <></>;
};
export default TagListFetcher;
