import React, { useMemo } from 'react';
import { ProgramListItem } from '../../../../redux/service/types/program.types';
import { ColumnDef } from '@tanstack/react-table';
import { StyledColumn, StyledText, StyledRow, StyledAvatar } from '../../../styled/styles';
import { transformFirstLetterToLowerCase } from '../../../../utils/utils';
import { useTheme } from 'styled-components';
import Table from '../../../Table';
import { useGetProgramAttendanceQuery } from '../../../../redux/service/program.service';
import { useNavigate } from 'react-router-dom';

interface ProgramsTableProps {
  programs: ProgramListItem[];
}

interface ProgramItem {
  program: ProgramListItem;
  studentsInProgram?: number;
  studentsCompleted?: number;
  studentsNotStarted?: number;
}

const ProgramsTable = ({ programs }: ProgramsTableProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const attendanceData = programs.map((program) => {
    const { data } = useGetProgramAttendanceQuery(program.programVersionId, {
      refetchOnMountOrArgChange: true,
    });
    return {
      program,
      studentsInProgram: data?.inProgress ?? 0,
      studentsCompleted: data?.completed ?? 0,
      studentsNotStarted: data?.notStarted ?? 0,
    };
  });

  const redirectToProgram = (program: ProgramItem) => {
    navigate(`/details/program/${program.program.programVersionId}`);
  };

  const columns: ColumnDef<ProgramItem, any>[] = useMemo(
    () => [
      {
        accessorFn: (row) => row.program.name,
        id: 'programName',
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
        cell: (info) => (
          <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
            {info.getValue()}
          </StyledText>
        ),
      },
      {
        accessorKey: 'studentsCompleted',
        header: 'Completados',
        cell: (info) => (
          <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
            {info.getValue()}
          </StyledText>
        ),
      },
      {
        accessorKey: 'studentsNotStarted',
        header: 'Sin iniciar',
        cell: (info) => (
          <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
            {info.getValue()}
          </StyledText>
        ),
      },
    ],
    [],
  );

  return (
    <Table
      data={attendanceData ?? []}
      columns={columns}
      entityName={'programa'}
      onRowClick={redirectToProgram}
    />
  );
};

export default ProgramsTable;
