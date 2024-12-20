import React from 'react';
import { useStudentsRegisteredQuery } from '../../../redux/service/students.service';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
import { Card } from '../Card';

export const StudentsRegisteredChart = () => {
  const { data, isLoading } = useStudentsRegisteredQuery();
  const students = data?.registeredStudents;
  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h2" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {'Estudiantes registrados'}
      </StyledText>
    </StyledColumn>
  );

  return (
    <Card header={cardHeader}>
      <StyledBox
        css={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          alignContent: 'center',
        }}
      >
        <StyledColumn css={{ gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText variant="h1" color="primary500" css={{ fontSize: '70px' }}>
            {students}
          </StyledText>
          <StyledText variant="h2" color="gray800" css={{ fontFamily: 'Roboto' }}>
            {'Estudiantes'}
          </StyledText>
        </StyledColumn>
      </StyledBox>
    </Card>
  );
};
