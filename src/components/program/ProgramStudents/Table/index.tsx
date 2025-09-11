import React, { useCallback, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTheme } from 'styled-components';
import Email from './columns/Email';
import Fullname from './columns/Fullname';
import Status from './columns/Status';
import Progress from './columns/Progress';
import Groups from './columns/Groups';
import Actions from './columns/Actions';
import { StudentDTO } from '../../../../redux/service/types/students.response';
import { GroupDTO } from '../../../../redux/service/types/groups.types';
import { Tooltip } from 'react-tooltip';
import TableMenu from './Menu';
import Table from '../../../Table';
import { EntityType, usePermissions } from '../../../../utils/permissions';

interface StudentsTableProps {
  students: StudentDTO[];
  groups: GroupDTO[];
  programVersionId: string;
  entityType: EntityType;
  onMenuClick: (action: 'view' | 'delete' | 'edit' | 'reset', student: StudentDTO) => void;
}

export const StudentsTable = ({ students, entityType, onMenuClick }: StudentsTableProps) => {
  const theme = useTheme();

  const { canEditStudentsListFromCollection, canEditStudentsListFromProgram } = usePermissions();
  const canEdit =
    entityType === EntityType.COLLECTION
      ? canEditStudentsListFromCollection()
      : canEditStudentsListFromProgram();

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

  const handleMenuClick = (
    action: 'view' | 'delete' | 'edit' | 'reset',
    student: StudentDTO | null,
  ) => {
    student && onMenuClick(action, student);
  };

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
        sortingFn: (a, b) => {
          const statusA = isRegistered(a.original);
          const statusB = isRegistered(b.original);
          // Esto ordena los valores `true` antes que los `false`
          return statusA === statusB ? 0 : statusA ? 1 : -1;
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
          const student = info.row.original;
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

  return (
    <>
      <Table
        data={students}
        columns={columns}
        entityName={'estudiante'}
        onRowClick={(student: StudentDTO) => handleMenuClick('view', student)}
      />
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
        canEdit={canEdit}
        entityType={entityType}
      />
    </>
  );
};
