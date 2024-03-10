import React from 'react';
import styled from 'styled-components';

import { useGetTagQuery } from '@hooks/apis/Tag/useTagQuery';
import Tag from '@components/core/Tag';
import Title from '@components/core/Title';

interface Props {
  onChangeFilter: (filterType: string, filterId: number) => void;
}

const LiquorFilter = ({ onChangeFilter }: Props) => {
  const { data: abvData } = useGetTagQuery('liquor-abv');
  return (
    <>
      <Title>도수</Title>
      <FilterTagWrap>
        {abvData.data.map((abv: any) => (
          <div onClick={() => onChangeFilter('liquorAbvPriKeys', abv.id)}>
            <Tag key={abv.id}>{abv.name}</Tag>
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
`;
