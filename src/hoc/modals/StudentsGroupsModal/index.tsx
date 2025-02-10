import { ModalProps } from '../interfaces';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { useTheme } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { api } from '../../../redux/service/api';
import Spinner from '../../../components/Spinner/Spinner';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Card from '../../../components/Card';

import { Chip } from '@mui/material';
import { AutocompleteComponent, Option } from '../../../components/Autocomplete';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useGetGroupsQuery } from '../../../redux/service/groups.service';
import { updateCollectionInfo } from '../../../redux/slices/collection.slice';
import { updatePillInfo } from '../../../redux/slices/program.slice';
import { EntityType } from '../../../utils/permissions';

type StudentsGroupsModalProps = ModalProps;

const StudentsGroupsModal = ({ handleOnClose }: StudentsGroupsModalProps) => {
  const dispatch = useLDispatch();
  const theme = useTheme();
  const studentEmail = useLSelector((state) => state.utils.metadata.studentEmail);
  const entityType = useLSelector((state) => state.utils.metadata.entityType);

  const students = useLSelector((state) =>
    entityType === EntityType.COLLECTION ? state.collection.students : state.program.students,
  );

  const updateAction = entityType === EntityType.COLLECTION ? updateCollectionInfo : updatePillInfo;

  const student = students.find((s) => s.email === studentEmail);
  const { data: allGroups } = useGetGroupsQuery();

  const [groups, setGroups] = useState<Option[]>(
    student?.group ? student.group.map((group) => ({ id: group.name, text: group.name })) : [],
  );

  console.log('g', groups);

  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['StudentsProgress']));
    };
  }, []);

  if (!studentEmail || !student) {
    console.log({ studentEmail, student });
    console.log(!studentEmail || !student);
    return <Spinner />;
  }

  const addGroup = (newGroups: Option[]) => {
    const filteredNewGroups = newGroups.filter(
      (newGroup) => !groups.some((group) => group.text === newGroup.text),
    );
    setGroups([...groups, ...filteredNewGroups]);
  };

  const handleSave = () => {
    dispatch(
      updateAction({
        students: students.map((s) => {
          if (s.email === studentEmail) {
            return {
              ...s,
              group: groups.map((group) => ({ name: group.text })),
            };
          }
          return s;
        }),
      }),
    );
    handleOnClose();
  };

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          {student!.name != null && student!.lastname != null
            ? `${student!.name} ${student!.lastname}`
            : `${student!.email}`}
        </StyledText>
        <StyledText variant="body2">Grupos a los que está asignado el estudiante.</StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        height: 'fit-content',
        width: '568px',
        zIndex: 30,
      }}
    >
      <StyledColumn style={{ gap: '24px', marginBottom: '12px' }}>
        {groups?.length === 0 ? (
          <StyledText variant="body2" color="gray400">
            Este estudiante no está asignado a ningún grupo.
          </StyledText>
        ) : (
          <StyledRow
            css={{
              gap: '6px',
              marginTop: '12px',
              maxHeight: '422px',
              flexWrap: 'wrap',
            }}
          >
            {groups?.map((group) => (
              <Chip
                key={group.text}
                label={group.text}
                variant="outlined"
                style={{ cursor: 'pointer' }}
                sx={{
                  cursor: 'pointer',
                  borderColor: theme.primary500,
                  color: theme.primary500,
                  '& .MuiChip-deleteIcon': {
                    color: theme.primaty500,
                  },
                  '&.MuiChip-outlinedPrimary': {
                    borderColor: theme.primary500,
                    color: theme.primary500,
                  },
                }}
                onDelete={() => setGroups(groups.filter((g) => g.id !== group.id))}
                deleteIcon={
                  <StyledBox
                    onClick={() => setGroups(groups.filter((g) => g.id !== group.id))}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CloseIcon color={theme.primary500} />
                  </StyledBox>
                }
              />
            ))}
          </StyledRow>
        )}
        <AutocompleteComponent
          content={allGroups!.map((group) => {
            return { id: group.id, text: group.name };
          })}
          multiple
          placeholder={'Seleccione los grupos que desee agregar'}
          setMultipleValues={addGroup}
          value={[]}
        />
      </StyledColumn>
      <StyledRow
        style={{
          justifyContent: 'flex-end',
          marginTop: '24px',
          gap: '12px',
        }}
      >
        <Button
          onClick={handleOnClose}
          variant={ComponentVariantType.GHOST}
          labelSize={'body3'}
          css={{ padding: '16px 8px', height: '30px' }}
        >
          {'Cancelar'}
        </Button>
        <Button
          onClick={handleSave}
          variant={ComponentVariantType.PRIMARY}
          labelSize={'body3'}
          css={{ padding: '16px 8px', height: '30px' }}
        >
          {'Guardar'}
        </Button>
      </StyledRow>
    </Card>
  );
};

export default StudentsGroupsModal;
