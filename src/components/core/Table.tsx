import React from 'react';
import styled from 'styled-components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  
} from '@tanstack/react-table';

interface IProps {
  data: any; // 테이블에 표기할 데이터
  columns: any;
}

/** 테이블 컴포넌트 */
const Table = ({ data, columns }: IProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="table-header-row">
            {headerGroup.headers.map((header) => (
              <th key={header.id} style={{ width: header.getSize() }} className="table-header-cell">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="table-body-row">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="table-body-cell">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled.table`
  .table-header-row {
    border-bottom: 1px solid ${(props) => props.theme.form.border};

    .table-header-cell {
      color: ${(props) => props.theme.text.secondary};
      font-weight: 500;
      padding: 0.75rem;
    }
  }

  .table-body-row {
    border-bottom: 1px solid ${(props) => props.theme.form.border};
    &:hover {
      background-color: ${(props) => props.theme.hoverColor};
      cursor: pointer;
    }

    .table-body-cell {
      color: ${(props) => props.theme.text.secondary};
      padding: 0.75rem;
    }
  }
`;
