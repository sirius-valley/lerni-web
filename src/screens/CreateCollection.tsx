import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { ProgramStudents } from '../components/program/ProgramStudents';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import CollectionDetails from '../components/collection/CollectionDetails';
import CollectionPrograms from '../components/collection/CollectionPrograms';

const CreateCollection = () => {
  const theme = useTheme();
  const collection = useLSelector((state) => state.collection);
  const navigate = useNavigate();
  const dispatch = useLDispatch();

  const handleSave = () => {
    console.log(collection);
  };

  return (
    <StyledBox css={{ height: '100%' }}>
      <StyledRow
        css={{
          width: '100%',
          height: '66px',
          background: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText variant="h2">Crear nueva colección</StyledText>
      </StyledRow>

      <StyledColumn
        css={{
          background: theme.gray200,
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <StyledColumn
          css={{
            marginTop: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          <CollectionDetails />
          <CollectionPrograms />
          <ProgramStudents />
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={handleSave}
            labelSize={'body3'}
            css={{
              marginTop: '8px',
              width: 'auto',
              height: '30px',
              padding: '8px 16px 8px 16px',
              fontFamily: 'Roboto-Bold',
              cursor: 'pointer',
            }}
          >
            Guardar
          </Button>
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default CreateCollection;
