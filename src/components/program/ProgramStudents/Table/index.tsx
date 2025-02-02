import React, { useCallback, useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
} from '@tanstack/react-table';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow } from '../../../styled/styles';
import { useLDispatch } from '../../../../redux/hooks';
import { TextInput } from '../../../styled/TextInput';
import { UpArrowIcon } from '../../../../assets/icons/UpArrowIcon';
import { DownArrowIcon } from '../../../../assets/icons/DownArrowIcon';
import { Chip } from '@mui/material';
import Email from './columns/Email';
import Fullname from './columns/Fullname';
import Status from './columns/Status';
import Progress from './columns/Progress';
import Groups from './columns/Groups';
import Actions from './columns/Actions';
import { StudentDTO } from '../../../../redux/service/types/students.response';
import { GroupDTO } from '../../../../redux/service/types/groups.types';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Tooltip } from 'react-tooltip';
import TableMenu from './Menu';

interface StudentsTableProps {
  students: StudentDTO[];
  groups: GroupDTO[];
  programVersionId: string;
  onMenuClick: (action: 'view' | 'delete' | 'edit', student: StudentDTO) => void;
}

export const StudentsTable = ({
  students,
  groups,
  programVersionId,
  onMenuClick,
}: StudentsTableProps) => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const [value, setValue] = React.useState('');
  const [filteredGroups, setFilteredGroups] = useState<{ id: string; name: string }[]>([]);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentDTO | null>(null);

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>, student: StudentDTO) => {
      setMenuAnchor(event.currentTarget);
      setSelectedStudent(student);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchor(null);
    setSelectedStudent(null);
  }, []);

  const handleMenuClick = (action: 'view' | 'delete' | 'edit', student: StudentDTO | null) => {
    student && onMenuClick(action, student);
  };

  useEffect(() => {
    table.setGlobalFilter(value);
  }, [value]);

  useEffect(() => {
    table.getColumn('groups')?.setFilterValue(filteredGroups);
  }, [filteredGroups]);

  const handleIcon = (isOpen: boolean) =>
    isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />;

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const handleExpandGroups = useCallback((id: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isRegistered = (student: StudentDTO) => {
    const hasName = student.name != null;
    const hasLastName = student.lastname != null;
    return hasName && hasLastName;
  };
  const columns = React.useMemo<ColumnDef<StudentDTO, any>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => {
          const email = info.getValue();
          const image = info.row.original.image;
          return <Email email={email} image={image} />;
        },
      },
      {
        accessorFn: (row) => `${row.name ?? ''} ${row.lastname ?? '...'}`,
        id: 'fullname',
        header: 'Nombre',
        cell: (info) => {
          const fullname = info.getValue();
          return <Fullname fullname={fullname} />;
        },
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: (info) => {
          const status = isRegistered(info.row.original);
          return <Status status={status} />;
        },
        meta: {
          filterVariant: 'select',
        },
        filterFn: (row, columnId, value) => {
          const status = row.getValue(columnId);
          if (value === 'true') {
            return status === true;
          }
          if (value === 'false') {
            return status === false;
          }
          return true;
        },
      },
      {
        accessorKey: 'progress',
        header: 'Progreso',
        cell: (info) => {
          const progress = info.row.original.progress ?? 0;
          return <Progress progress={progress} />;
        },
      },
      {
        accessorKey: 'group',
        header: 'Grupos',
        cell: (info) => {
          const groups = info.getValue() ?? [];
          const studentId = info.row.original.id;
          const expanded = expandedGroups[studentId] ?? false;
          const maxGroups = 1;
          const visibleGroups = groups.slice(0, maxGroups);
          const extraGroups = groups.length - maxGroups;

          return (
            <Groups
              studentId={studentId}
              groups={groups}
              maxGroups={maxGroups}
              visibleGroups={visibleGroups}
              extraGroups={extraGroups}
              expanded={expanded}
              onExpand={() => handleExpandGroups(studentId)}
            />
          );
        },
        meta: {
          filterVariant: 'select',
        },
        filterFn: 'arrIncludesAll',
      },
      {
        id: 'actions',
        cell: (info) => {
          const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
          const open = Boolean(anchorEl);
          const student = info.row.original;

          const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          };

          const handleClose = () => {
            setAnchorEl(null);
          };

          const onExpand = (id: string) => {
            handleExpandGroups(id);
          };

          return (
            <Actions
              onMenuOpen={(event, student) => handleMenuOpen(event, student)}
              student={student}
            />
          );
        },
      },
    ],
    [expandedGroups],
  );

  const table = useReactTable({
    data: students,
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

  // const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const [paddingTop, paddingBottom] =
    items.length > 0
      ? [
          Math.max(0, items[0].start - virtualizer.options.scrollMargin),
          Math.max(0, virtualizer.getTotalSize() - items[items.length - 1].end),
        ]
      : [0, 0];
  // const paddingTop = virtualRows?.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  // const paddingBottom = virtualRows?.length > 0 ? totalSize - (virtualRows?.at(-1)?.end || 0) : 0;

  return (
    <StyledColumn style={{ padding: '2px', maxHeight: '80vh' }}>
      <StyledRow style={{ alignItems: 'center', gap: '20px' }}>
        <TextInput
          type="text"
          placeholder="Search..."
          onChange={(value) => setValue(value)}
          value={value}
        />
      </StyledRow>
      {students.length}
      <StyledRow style={{ gap: '8px', width: '100%', overflowX: 'auto' }}>
        {filteredGroups.map((group) => (
          <Chip
            key={group.id}
            label={group.name}
            style={{ borderColor: theme.primary500 }}
            variant="outlined"
            onDelete={() => setFilteredGroups(filteredGroups.filter((g) => g.id !== group.id))}
          />
        ))}
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
              const row = rows[virtualRow.index] as Row<StudentDTO>;
              return (
                <tr
                  key={row.id}
                  style={{ borderBottom: `1px solid ${theme.gray200}`, cursor: 'pointer' }}
                  onClick={() => console.log('view Profile')}
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
      <Tooltip
        id="table-tooltip"
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          backgroundColor: theme.gray600,
          color: 'white',
          fontSize: 14,
          fontFamily: 'Roboto',
        }}
        place="top"
      />
      <TableMenu
        onClick={(action) => handleMenuClick(action, selectedStudent)}
        onClose={handleMenuClose}
        menuAnchor={menuAnchor}
      />
    </StyledColumn>
  );
};
