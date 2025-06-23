import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import ProgramCard from './ProgramCard';
import { ProgramCardItem } from '../../../redux/service/types/profile.types';
import { Grid } from '@mui/material';
import { useTheme } from 'styled-components';

const UserPrograms = () => {
  const profile = useLSelector((state) => state.profile);
  const theme = useTheme();

  const imageUrl = 'https://lerni-images-2024.s3.amazonaws.com/default_image_program.jpg';

  const program: ProgramCardItem = {
    id: '1',
    name: 'Programa de prueba',
    image: imageUrl,
    progress: 100,
    points: 0,
    maxPoints: 10,
    teacher: {
      id: '1',
      name: 'Juan',
      lastname: 'Perez',
      profession: 'Profesor',
      image: imageUrl,
    },
  };

  const mockedPrograms = Array.from({ length: 8 }, (_, i) => ({
    ...program,
    id: i.toString(),
    name: `Programa de prueba ${i}`,
    progress: Math.random() > 0.5 ? 100 : Math.floor(Math.random() * 100),
    points: Math.floor(Math.random() * 10),
  }));

  return (
    <Card title={'Programas asignados'} height={'100%'}>
      <StyledBox
        style={{ alignItems: 'center', maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {mockedPrograms.length !== 0 ? (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {mockedPrograms.map((program) => (
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
