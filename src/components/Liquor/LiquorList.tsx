import styled from 'styled-components';

// components
import Table, { IColumn } from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import useModal from '@hooks/useModal';

interface IProps {
  searchKeyword?: string;
}

/** 술 목록 컴포넌트 */
const LiquorList = ({ searchKeyword = '' }: IProps) => {
  return <></>;
};

export default LiquorList;
