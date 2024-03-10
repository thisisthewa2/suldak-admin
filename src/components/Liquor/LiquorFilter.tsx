import React from 'react';
import styled from 'styled-components';

import { useGetTagQuery } from '@hooks/apis/Tag/useTagQuery';
import Tag from '@components/core/Tag';
import Title from '@components/core/Title';
import { SearchParams } from '@apis/services/LiquorApi';

interface Props {
  filterList: Omit<SearchParams, 'pageNum' | 'recordSize'>;
  onChangeFilter: (filterType: string, filterId: number) => void;
}

const LiquorFilter = ({ filterList, onChangeFilter }: Props) => {
  const { data: nameData } = useGetTagQuery('liquor-name');
  const { data: detailData } = useGetTagQuery('liquor-detail');
  const { data: abvData } = useGetTagQuery('liquor-abv');
  const { data: tasteData } = useGetTagQuery('taste-type');
  return (
    <>
      <Title>1차 분류</Title>
      <FilterTagWrap>
        {nameData.data.map((abv: any) => (
          <div onClick={() => onChangeFilter('liquorNamePriKeys', abv.id)}>
            <Tag
              key={abv.id}
              isActived={
                filterList.liquorNamePriKeys.includes(abv.id) ? true : false
              }
            >
              {abv.name}
            </Tag>
          </div>
        ))}
      </FilterTagWrap>

      <Title>2차 분류</Title>
      <FilterTagWrap>
        {detailData.data.map((abv: any) => (
          <div onClick={() => onChangeFilter('liquorDetailPriKeys', abv.id)}>
            <Tag
              key={abv.id}
              isActived={
                filterList.liquorDetailPriKyes.includes(abv.id) ? true : false
              }
            >
              {abv.name}
            </Tag>
          </div>
        ))}
      </FilterTagWrap>

      <Title>도수</Title>
      <FilterTagWrap>
        {abvData.data.map((abv: any) => (
          <div onClick={() => onChangeFilter('liquorAbvPriKeys', abv.id)}>
            <Tag
              key={abv.id}
              isActived={
                filterList.liquorAbvPriKeys.includes(abv.id) ? true : false
              }
            >
              {abv.name}
            </Tag>
          </div>
        ))}
      </FilterTagWrap>

      <Title>맛</Title>
      <FilterTagWrap>
        {tasteData.data.map((abv: any) => (
          <div onClick={() => onChangeFilter('tastePriKeys', abv.id)}>
            <Tag
              key={abv.id}
              isActived={
                filterList.tastePriKeys.includes(abv.id) ? true : false
              }
            >
              {abv.name}
            </Tag>
          </div>
        ))}
      </FilterTagWrap>
    </>
  );
};

export default LiquorFilter;

const FilterTagWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  margin-bottom: 1rem;
`;
