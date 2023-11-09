import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// components
import Pagination from '@components/core/Pagination';

export interface IColumn {
  Header: string;
  accessor: string | ((row: any) => JSX.Element);
  width: string;
  align?: 'left' | 'right' | 'center';
}

interface IProps {
  data: any[]; // 테이블 데이터
  columns: IColumn[]; // 컬럼 데이터
  rowsPerPage?: number; // 페이지당 보여줄 행 수
}

/** 테이블 컴포넌트 */
const Table = ({ data, columns, rowsPerPage = 1 }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / rowsPerPage));

  // 페이지 변경시 실행
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // 현재 페이지의 데이터를 계산
  const currentTableData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    // 데이터가 변경되면 페이지 수를 다시 계산합니다.
    setTotalPages(Math.ceil(data.length / rowsPerPage));
    // 데이터 변경시 1페이지로 이동
    setCurrentPage(1);
  }, [data]); // data 배열이 변경될 때마다 이 효과를 다시 실행합니다.

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
          {currentTableData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default Table;

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
    /* cursor: pointer; */
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Td = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  text-align: ${({ $align }) => $align || 'left'};
  padding: 12px 15px;
`;
