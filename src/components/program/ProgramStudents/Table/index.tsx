import { useTheme } from 'styled-components';
import { RemoveIcon } from '../../../../assets/icons/RemoveIcon';
import {
  StyledAvatar,
  StyledBox,
  StyledColumn,
  StyledRow,
  StyledText,
} from '../../../styled/styles';
import { StyledTable } from './styles';
import React from 'react';

interface StudentsTableProps {
  students: {
    email: string;
    name?: string;
    lastname?: string;
    status: boolean;
    profilePicture: string;
  }[];
}

export const StudentsTable = ({ students }: StudentsTableProps) => {
  const theme = useTheme();

  return (
    <StyledBox style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <StyledTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '14px 10px 14px 0px', width: 180 }}>
              {'Email'}
            </th>
            <th style={{ padding: '14px 10px 14px 10px' }}>{'Nombre'}</th>
            <th style={{ padding: '14px 10px 14px 10px' }}>{'Status'}</th>
            <th style={{ textAlign: 'right', padding: '14px 0px 14px 10px' }}></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => {
            return (
              <tr key={idx}>
                <td style={{ padding: '14px 10px 14px 0px' }}>
                  <StyledRow
                    style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}
                  >
                    <StyledAvatar src={student.profilePicture} />
                    <StyledText variant="body1" style={{ textAlign: 'center', fontSize: 14 }}>
                      {student.email}
                    </StyledText>
                  </StyledRow>
                </td>
                <td style={{ padding: '14px 10px 14px 10px' }}>
                  {student.name ?? ''} {student.lastname ?? '...'}
                </td>
                <td
                  style={{
                    padding: '14px 10px 14px 10px',
                    fontSize: 14,
                    color: student.status ? '#444444' : theme.red500,
                  }}
                >
                  {student.status ? 'Registrado' : 'Sin registrar'}
                </td>
                <td style={{ textAlign: 'right', fontSize: 14, padding: '14px 0px 14px 10px' }}>
                  <RemoveIcon size={18} color={theme.gray400} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledBox>
  );
};
