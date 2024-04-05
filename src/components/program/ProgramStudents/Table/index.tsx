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
import { Tooltip } from 'react-tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { useLDispatch } from '../../../../redux/hooks';
import { removeStudent } from '../../../../redux/slices/program.slice';

interface StudentsTableProps {
  students: {
    authId: string;
    email: string;
    name?: string;
    lastname?: string;
    status?: boolean;
    profilePicture?: string;
  }[];
}

export const StudentsTable = ({ students }: StudentsTableProps) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  return (
    <StyledBox style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <StyledTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '14px 10px 14px 0px', width: '40%' }}>
              {'Email'}
            </th>
            <th style={{ padding: '14px 10px 14px 10px', width: '25%' }}>{'Nombre'}</th>
            <th style={{ padding: '14px 10px 14px 10px', width: '20%' }}>{'Status'}</th>
            <th style={{ textAlign: 'right', padding: '14px 0px 14px 10px', width: '15%' }}></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => {
            const fullname = `${student.name} ${student.lastname}`;
            const isRegistered = student.name !== undefined;

            return (
              <tr key={idx} style={{ borderBottom: `1px solid ${theme.gray200}` }}>
                <td style={{ padding: '12px 10px 12px 0px' }}>
                  <StyledRow
                    style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}
                  >
                    <StyledAvatar src={student.profilePicture} />
                    <StyledText
                      variant="body1"
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                      data-tooltip-content={student.email}
                      data-tooltip-id={student.email.length > 30 ? 'email' : undefined}
                    >
                      {student.email}
                    </StyledText>
                    <Tooltip
                      style={{
                        padding: '8px 12px 8px 12px',
                        borderRadius: 8,
                        gap: 10,
                        backgroundColor: theme.gray600,
                        color: 'white',
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        textAlign: 'center',
                        whiteSpace: 'normal',
                        width: '20%',
                      }}
                      place="right"
                      id="email"
                    />
                  </StyledRow>
                </td>
                <td style={{ padding: '12px 10px 12px 10px' }}>
                  <StyledText
                    variant="body1"
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    data-tooltip-content={fullname}
                    data-tooltip-id={fullname && fullname.length > 20 ? 'name' : undefined}
                  >
                    {`${student.name ?? ''} ${student.lastname ?? '...'}`}
                  </StyledText>
                  <Tooltip
                    style={{
                      padding: '8px 12px 8px 12px',
                      borderRadius: 8,
                      gap: 10,
                      backgroundColor: theme.gray600,
                      color: 'white',
                      fontSize: 14,
                      fontFamily: 'Roboto',
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      width: '20%',
                    }}
                    place="right"
                    id="name"
                  />
                </td>
                <td
                  style={{
                    padding: '12px 10px 12px 10px',
                    fontSize: 14,
                    color: isRegistered ? theme.gray900 : theme.red500,
                  }}
                >
                  {isRegistered ? 'Registrado' : 'Sin registrar'}
                </td>
                <td
                  style={{
                    fontSize: 14,
                    padding: '12px 0px 12px 10px',
                  }}
                >
                  <StyledBox
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignContent: 'flex-end',
                    }}
                  >
                    <StyledBox
                      style={{ cursor: 'pointer', width: 'auto' }}
                      onClick={() => dispatch(removeStudent({ email: student.email }))}
                    >
                      <RemoveIcon size={18} color={theme.gray400} />
                    </StyledBox>
                  </StyledBox>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledBox>
  );
};
