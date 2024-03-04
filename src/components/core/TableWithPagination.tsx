import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  data: any;
  totalPage: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TableWithPagination = ({
  data,
  totalPage,
  currentPage,
  itemsPerPage,
  onPageChange,
}: Props): ReactElement => {
  return <></>;
};

export default TableWithPagination;
