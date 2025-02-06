import React, { useMemo } from 'react';
import { ProgramListItem } from '../../../../redux/service/types/program.types';
import { ColumnDef } from '@tanstack/react-table';
import { StyledColumn, StyledText, StyledRow, StyledAvatar } from '../../../styled/styles';
import { transformFirstLetterToLowerCase } from '../../../../utils/utils';
import { useTheme } from 'styled-components';
import Table from '../../../Table';
import { useGetProgramAttendanceQuery } from '../../../../redux/service/program.service';

interface ProgramsTableProps {
  programs: ProgramListItem[];
}

const ProgramsTable = ({ programs }: ProgramsTableProps) => {
  const theme = useTheme();

  const columns: ColumnDef<ProgramListItem, any>[] = useMemo(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'programName',
        header: 'Programa',
        cell: (info) => {
          const program = info.row.original;
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
        id: 'studentsInProgram',
        header: 'En progreso',
        cell: (info) => {
          const program = info.row.original;
          const { data } = useGetProgramAttendanceQuery(program.programVersionId);
          return (
            <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
              {data?.inProgress ?? 0}
            </StyledText>
          );
        },
      },
      {
        id: 'studentsCompleted',
        header: 'Completados',
        cell: (info) => {
          const program = info.row.original;
          const { data } = useGetProgramAttendanceQuery(program.programVersionId);
          return (
            <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
              {data?.completed ?? 0}
            </StyledText>
          );
        },
      },
      {
        id: 'studentsNotStarted',
        header: 'Sin iniciar',
        cell: (info) => {
          const program = info.row.original;
          const { data } = useGetProgramAttendanceQuery(program.programVersionId);
          return (
            <StyledText style={{ textAlign: 'center', fontSize: '14px' }}>
              {data?.notStarted ?? 0}
            </StyledText>
          );
        },
      },
    ],
    [],
  );

  return <Table data={programs ?? []} columns={columns} entityName={'programa'} />;
};

export default ProgramsTable;
