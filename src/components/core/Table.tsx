import React from 'react';
import styled from 'styled-components';

export interface IColumn {
  Header: string;
  accessor: string | ((row: any) => JSX.Element);
  width: string;
  align?: 'left' | 'right' | 'center';
}

interface IProps {
  data: any[]; // 테이블 데이터
  columns: IColumn[];
}

/** 테이블 컴포넌트 */
const Table = ({ data, columns }: IProps) => {
  return (
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
        {data.map((row, rowIndex) => (
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
