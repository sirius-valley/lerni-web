import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledText } from '../../styled/styles';
import ProgramCard from './ProgramCard';
import { Grid } from '@mui/material';
import { useTheme } from 'styled-components';
import { useStudentProgramsQuery } from '../../../redux/service/students.service';
import { useParams } from 'react-router-dom';

const UserPrograms = () => {
  const { id: studentId } = useParams();
  const theme = useTheme();

  const { data: programs = [], isLoading, error } = useStudentProgramsQuery(studentId as string);

  return (
    <Card title={'Programas asignados'} height={'100%'}>
      <StyledBox
        style={{ alignItems: 'center', maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {isLoading ? (
          <StyledBox
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0px 16px 0px',
            }}
          >
            <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
              {'Cargando programas...'}
            </StyledText>
          </StyledBox>
        ) : error ? (
          <StyledBox
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0px 16px 0px',
            }}
          >
            <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
              {'Error al cargar los programas'}
            </StyledText>
          </StyledBox>
        ) : programs.length !== 0 ? (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {programs.map((program) => (
              <Grid item xs={2} sm={4} md={4} key={program.id} justifyContent={'center'}>
                <ProgramCard key={program.id} program={program} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <StyledBox
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0px 16px 0px',
            }}
          >
            <StyledText variant="body3" style={{ textAlign: 'center', color: theme.gray400 }}>
              {'No se asignaron programas todavía'}
            </StyledText>
          </StyledBox>
        )}
      </StyledBox>
    </Card>
  );
};

export default UserPrograms;
