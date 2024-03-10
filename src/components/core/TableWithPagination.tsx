import React, { ReactElement } from 'react';
import styled from 'styled-components';
import PaginationWithAPI from './PaginationWithAPI';

export interface IColumn {
  Header: string;
  accessor: string | ((row: any) => JSX.Element);
  width: string;
  align?: 'left' | 'right' | 'center';
}

interface Props {
  data: any;
  columns: IColumn[];
  totalPage: number;
  currentPage: number;
  // itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const TableWithPagination = ({
  data,
  columns,
  totalPage,
  currentPage,
  onPageChange,
}: // itemsPerPage,
Props): ReactElement => {
  return (
    <>
      <StyledTable>
        <Thead>
          <tr>
            {columns.map((column, index) => (
              <Th key={index} $width={column.width}>
                {column.Header}
              </Th>
            ))}
          </tr>
        </Thead>
        <Tbody>
          {data.map((row: any, id: number) => (
            <Tr key={id}>
              {columns.map((column, columnIndex) => {
                const cellData =
                  typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor as string];
                return (
                  <Td key={columnIndex} $align={column.align}>
                    {cellData}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </StyledTable>
      <PaginationWithAPI
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default TableWithPagination;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.25rem;
  overflow: hidden;
  table-layout: fixed;
`;

const Thead = styled.thead`
  background-color: ${(props) => props.theme.form.tableHeaderBg};
  color: #eff2f7;
  font-weight: 500;
  text-align: left;
`;

const Th = styled.th<{ $width: string }>`
  padding: 12px 15px;
  width: ${({ $width }) => $width};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  color: ${(props) => props.theme.form.tableRow};
  border-bottom: 1px solid ${(props) => props.theme.form.border};

  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Td = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  text-align: ${({ $align }) => $align || 'left'};
  padding: 12px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;
  vertical-align: middle;
`;
