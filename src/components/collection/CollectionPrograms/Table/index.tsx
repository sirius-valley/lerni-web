import React, { useCallback, useEffect, useState } from 'react';
import { ProgramListItem } from '../../../../redux/service/types/program.types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  StyledAvatar,
  StyledBox,
  StyledColumn,
  StyledRow,
  StyledText,
} from '../../../styled/styles';
import { TextInput } from '../../../styled/TextInput';
import { Chip } from '@mui/material';
import { StudentDTO } from '../../../../redux/service/types/students.response';
import { Tooltip } from 'react-tooltip';
import TableMenu from '../../../program/ProgramStudents/Table/Menu';
import { useTheme } from 'styled-components';
import { UpArrowIcon } from '../../../../assets/icons/UpArrowIcon';
import { transformFirstLetterToLowerCase } from '../../../../utils/utils';
import { useGetProgramAttendanceQuery } from '../../../../redux/service/program.service';

interface ProgramsTableProps {
  programs: ProgramListItem[];
}

interface ProgramItem {
  program: ProgramListItem;
  studentsInProgram: number;
  studentsCompleted: number;
  studentsNotStarted: number;
}

const ProgramsTable = ({ programs }: ProgramsTableProps) => {
  const theme = useTheme();
  const programData = programs.map((program) => {
    const { data } = useGetProgramAttendanceQuery(program.programVersionId);
    return {
      program,
      studentsInProgram: data?.inProgress || 0,
      studentsCompleted: data?.completed || 0,
      studentsNotStarted: data?.notStarted || 0,
    };
  });

  const columns = React.useMemo<ColumnDef<ProgramItem, any>[]>(
    () => [
      {
        accessorKey: 'programName',
        header: 'Programa',
        cell: (info) => {
          const program = info.row.original.program;
          return (
            <StyledRow style={{ gap: '8px', alignItems: 'center', height: '100%' }}>
              <StyledAvatar
                src={transformFirstLetterToLowerCase(program.icon ?? '')}
                style={{ borderRadius: 4, objectFit: 'cover', height: '40px', width: '40px' }}
              />
              <StyledColumn
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '100%',
                  padding: '2px 0',
                }}
              >
                <StyledText
                  variant="body2"
                  style={{
                    color: theme.gray950,
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                  }}
                >
                  {program.name}
                </StyledText>
                <StyledText
                  variant="body3"
                  style={{
                    color: theme.gray400,
                    fontFamily: 'Roboto',
                  }}
                >
                  {program.programVersionId}
                </StyledText>
              </StyledColumn>
            </StyledRow>
          );
        },
      },
      {
        accessorKey: 'studentsInProgram',
        header: 'En progreso',
        cell: (info) => <StyledText style={{ textAlign: 'center' }}>{info.getValue()}</StyledText>,
      },
      {
        accessorKey: 'studentsCompleted',
        header: 'Completados',
        cell: (info) => <StyledText style={{ textAlign: 'center' }}>{info.getValue()}</StyledText>,
      },
      {
        accessorKey: 'studentsNotStarted',
        header: 'Sin iniciar',
        cell: (info) => <StyledText style={{ textAlign: 'center' }}>{info.getValue()}</StyledText>,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: programData,
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
      <StyledRow style={{ alignItems: 'center', gap: '20px' }}></StyledRow>

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
                        {header.column.getIsSorted() && <UpArrowIcon size={20} />}
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
              const row = rows[virtualRow.index] as Row<ProgramItem>;
              return (
                <tr
                  key={row.id}
                  style={{ borderBottom: `1px solid ${theme.gray200}`, cursor: 'pointer' }}
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
    </StyledColumn>
  );
};

export default ProgramsTable;
