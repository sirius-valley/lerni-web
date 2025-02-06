import React, { useCallback, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styled/styles';
import { useTheme } from 'styled-components';
import { TextInput } from '../styled/TextInput';
import { UpArrowIcon } from '../../assets/icons/UpArrowIcon';
import { DownArrowIcon } from '../../assets/icons/DownArrowIcon';

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  entityName?: string;
  onRowClick?: (row: T) => void;
};

const Table = <T,>({ data, columns, entityName = 'elemento', onRowClick }: TableProps<T>) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleIcon = (isOpen: boolean) =>
    isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    table.setGlobalFilter(searchQuery);
  }, [searchQuery]);

  const { rows } = table.getRowModel();
  const getItemKey = useCallback((index: number) => {
    return rows[index]?.id;
  }, []);

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 65,
    overscan: 5,
    getItemKey: getItemKey,
  });

  const items = virtualizer.getVirtualItems();
  const [paddingTop, paddingBottom] =
    items.length > 0
      ? [
          Math.max(0, items[0].start - virtualizer.options.scrollMargin),
          Math.max(0, virtualizer.getTotalSize() - items[items.length - 1].end),
        ]
      : [0, 0];

  return (
    <StyledColumn style={{ padding: '2px', maxHeight: '80vh' }}>
      <StyledRow style={{ alignItems: 'center', gap: '20px' }}>
        <TextInput
          type="text"
          placeholder="Search..."
          onChange={(value) => setSearchQuery(value)}
          value={searchQuery}
        />
      </StyledRow>
      <StyledBox style={{ maxWidth: '100%', overflow: 'auto' }} ref={tableContainerRef}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            maxWidth: '100%',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      textAlign: 'left',
                      padding: '14px 10px',
                      borderBottom: `2px solid ${theme.gray200}`,
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: theme.gray900,
                    }}
                  >
                    <StyledRow>
                      <StyledRow
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: header.column.getCanSort() ? 'pointer' : 'default',
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() &&
                          handleIcon(header.column.getIsSorted() === 'asc')}
                      </StyledRow>
                    </StyledRow>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: paddingTop }} />
              </tr>
            )}
            {items.map((virtualRow, index) => {
              const row = rows[virtualRow.index] as Row<T>;
              return (
                <tr
                  key={row.id}
                  style={{ borderBottom: `1px solid ${theme.gray200}`, cursor: 'pointer' }}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ padding: '12px 10px', textAlign: 'left', height: '65px' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: paddingBottom }} />
              </tr>
            )}
          </tbody>
        </table>
      </StyledBox>
      <StyledRow style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 20px 0 0' }}>
        <StyledText style={{ color: theme.gray400, fontSize: 12 }}>
          {data.length} {entityName}
          {data.length > 1 ? 's' : ''}
        </StyledText>
      </StyledRow>
    </StyledColumn>
  );
};

export default Table;
