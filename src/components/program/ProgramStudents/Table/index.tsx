import React, { useEffect, useState } from 'react';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow } from '../../../styled/styles';
import { useLDispatch } from '../../../../redux/hooks';
import { removeStudent } from '../../../../redux/slices/program.slice';
import { setModalOpen } from '../../../../redux/slices/utils.slice';
import { TextInput } from '../../../styled/TextInput';
import { UpArrowIcon } from '../../../../assets/icons/UpArrowIcon';
import { DownArrowIcon } from '../../../../assets/icons/DownArrowIcon';
import { Chip, IconButton } from '@mui/material';
import FilterGroups from './FilterGroups';
import Email from './columns/Email';
import Fullname from './columns/Fullname';
import Status from './columns/Status';
import Progress from './columns/Progress';
import Groups from './columns/Groups';
import Actions from './columns/Actions';
import { Dropdown } from '../../../Dropdown';
import FilterIcon from '../../../../assets/icons/FilterIcon';
import { StudentDTO } from '../../../../redux/service/types/students.response';
import { GroupDTO } from '../../../../redux/service/types/groups.types';

// interface Student {
//   authId: string;
//   email: string;
//   name?: string;
//   lastname?: string;
//   status?: boolean;
//   image?: string;
//   id: string;
//   progress?: number;
//   groups: {
//     id: string;
//     name: string;
//   }[];
// }

interface StudentsTableProps {
  students: StudentDTO[];
  groups: GroupDTO[];
  programVersionId: string;
  onMenuClick: (action: 'view' | 'delete' | 'edit', student: StudentDTO) => void;
}

interface Filters {
  progress: ProgressStatus;
  status: StateStatus;
  groups: string[];
}

type StateStatus = 'Registrado' | 'No registrado';
type ProgressStatus = 'Finalizado' | 'En progreso' | 'No iniciado';

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

  const [showFilters, setShowFilters] = useState(false);

  const filtersMap: Record<string, any[]> = {
    progress: ['Finalizado', 'En progreso', 'No iniciado'],
    status: ['Registrado', 'No registrado'],
    groups: groups.map((group) => group.name), // Dinámico basado en los grupos disponibles
  };

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    progress: 'No iniciado',
    status: 'No registrado',
    groups: [],
  });

  const filterableColumns = ['status', 'progress', 'groups'];

  const handleFilters = (columnId: string, value: string) => {
    const updatedFilters = {
      ...appliedFilters,
      [columnId]: value,
    };
    setAppliedFilters(updatedFilters);
  };

  const getFilterValue = (columnId: string) => {
    switch (columnId) {
      case 'status':
        return appliedFilters.status;
      case 'progress':
        return appliedFilters.progress;
      case 'groups':
        return appliedFilters.groups;
      default:
        return '';
    }
  };

  useEffect(() => {
    table.setGlobalFilter(value);
  }, [value]);

  useEffect(() => {
    table.getColumn('groups')?.setFilterValue(filteredGroups);
  }, [filteredGroups]);

  const handleIcon = (isOpen: boolean) =>
    isOpen ? <UpArrowIcon size={20} /> : <DownArrowIcon size={20} />;

  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});

  const handleExpandGroups = React.useCallback((id: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id], // Alterna entre expandido y no expandido
    }));
  }, []);

  useEffect(() => {
    return () => {
      console.log('Desmontando');
    };
  }, []);

  useEffect(() => {
    console.log('-------------------------------');
    console.log('');
    console.log('expandedGroups', expandedGroups);
    console.log('');
    console.log('-------------------------------');
  }, [expandedGroups]);

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
          return true; // Para que no se filtre si no se selecciona ningún valor
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
              open={open}
              anchorEl={anchorEl}
              programVersionId={programVersionId}
              expandedGroups={expandedGroups}
              onExpand={onExpand}
              onClick={handleClick}
              onClose={handleClose}
              onMenuClick={onMenuClick}
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

  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({}); // Estado de mapa para filtros abiertos

  const handleToggle = (filterId: string) => {
    setOpenFilters((prev) => {
      const newState = { ...prev, [filterId]: !prev[filterId] };
      // Asegúrate de que solo uno esté abierto a la vez
      Object.keys(newState).forEach((key) => {
        if (key !== filterId) newState[key] = false;
      });
      return newState;
    });
  };

  const handleClickFilters = () => {
    setShowFilters(!showFilters);
    setOpenFilters((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      return newState;
    });
  };

  return (
    <StyledColumn style={{ padding: '2px' }}>
      <StyledRow style={{ alignItems: 'center', gap: '20px' }}>
        <TextInput
          type="text"
          placeholder="Search..."
          onChange={(value) => setValue(value)}
          value={value}
        />
        {/*<FilterGroups*/}
        {/*  groups={groups}*/}
        {/*  filterGroup={(group) => {*/}
        {/*    if (!filteredGroups.some((filteredGroup) => filteredGroup.id === group.id)) {*/}
        {/*      setFilteredGroups([...filteredGroups, group]);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<IconButton*/}
        {/*  aria-label="filter"*/}
        {/*  style={{ overflow: 'visible' }}*/}
        {/*  onClick={handleClickFilters}*/}
        {/*>*/}
        {/*  <FilterIcon color={theme.primary500} selected={showFilters} />*/}
        {/*</IconButton>*/}
      </StyledRow>

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
      <StyledBox style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', maxWidth: '100%' }}>
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
                      {header.column.getCanFilter() &&
                        filterableColumns.includes(header.id) &&
                        showFilters && (
                          <FilterGroups
                            id={header.id}
                            options={filtersMap[header.id]}
                            selected={getFilterValue(header.id)}
                            onSelect={(option) => handleFilters(header.id, option)}
                            open={openFilters[header.id]} // Pasar si el filtro está abierto
                            onToggle={() => handleToggle(header.id)} // Maneja el toggle
                          />
                        )}
                    </StyledRow>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{ borderBottom: `1px solid ${theme.gray200}`, cursor: 'pointer' }}
                onClick={() => console.log('view Profile')}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: '12px 10px', textAlign: 'left' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledBox>
    </StyledColumn>
  );
};
