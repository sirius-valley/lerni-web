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

type StudentsGroupsModalProps = ModalProps;

const mockedStudents = [
  {
    authId: 'auth1',
    email: 'hola@email.com',
    name: 'holaholaholaholaholaholaholaholaholaholahola',
    lastname: 'email',
    status: true,
    profilePicture: 'https://dlp3kegsr4prd.cloudfront.net/introduction/primerprogramaheader.png',
    id: '1',
    progress: 90,
    groups: [
      { id: 'g1', name: 'Frontend Masters' },
      { id: 'g2', name: 'Backend Gurus' },
      { id: 'g3', name: 'UI Designers' },
    ],
  },
  {
    authId: 'auth2',
    email: 'chatchatchatchatchat@gmail.com',
    name: 'hola@email.com',
    lastname: 'gmail',
    status: true,
    profilePicture: 'https://dlp3kegsr4prd.cloudfront.net/introduction/primerprogramaheader.png',
    id: '2',
    progress: 75,
    groups: [{ id: 'g4', name: 'Chess Club' }],
  },
  {
    authId: 'auth3',
    email: 'test@gmail.com',
    name: 'Test',
    lastname: 'User',
    status: false,
    profilePicture: 'https://dlp3kegsr4prd.cloudfront.net/introduction/primerprogramaheader.png',
    id: '3',
    progress: 0,
    groups: [],
  },
  {
    authId: 'auth4',
    email: 'maxgroups@example.com',
    name: 'Max',
    lastname: 'Groups',
    status: true,
    profilePicture: 'https://dlp3kegsr4prd.cloudfront.net/introduction/primerprogramaheader.png',
    id: '4',
    progress: 100,
    groups: [
      { id: 'g5', name: 'Science Club' },
      { id: 'g6', name: 'Robotics Team' },
      { id: 'g7', name: 'Art Enthusiasts' },
      { id: 'g8', name: 'Sports Club' },
      { id: 'g9', name: 'Music Band' },
      { id: 'g10', name: 'Debate Team' },
    ],
  },
  {
    authId: 'auth5',
    email: 'minimal@example.com',
    name: 'Minimal',
    lastname: 'Example',
    status: true,
    profilePicture: '',
    id: '5',
    progress: 10,
    groups: [{ id: 'g11', name: 'Literature Club' }],
  },
  {
    authId: 'auth6',
    email: 'bordercase@example.com',
    name: '',
    lastname: '',
    status: false,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Red&facialHairType=MoustacheFancy&clotheType=Hoodie&eyeType=Happy&eyebrowType=AngryNatural&mouthType=Disbelief&skinColor=Brown',
    id: '6',
    progress: 50,
    groups: [{ id: 'g12', name: 'Gaming Club' }],
  },
];
const allGroups = mockedStudents
  .flatMap((student) => student.groups) // Aplanar todos los grupos de los estudiantes
  .reduce(
    (acc, group) => {
      if (!acc.find((g) => g.name === group.name)) {
        acc.push({ id: group.id, name: group.name });
      }
      return acc;
    },
    [] as { id: string; name: string }[],
  );

const mockedGroups = [
  { id: 'g1', name: 'Frontend Masters' },
  { id: 'g2', name: 'Backend Gurus' },
  { id: 'g3', name: 'UI Designers' },
];

const StudentsGroupsModal = ({ handleOnClose }: StudentsGroupsModalProps) => {
  const dispatch = useLDispatch();
  const theme = useTheme();
  // const studentId = useLSelector((state) => state.utils.metadata.studentId);
  const programVersionId = useLSelector((state) => state.utils.metadata.programVersionId);

  const [groups, setGroups] = useState(mockedGroups);

  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['StudentsProgress']));
    };
  }, []);

  // if (!studentId || !studentProgress || studentProgressFetching || studentProgressLoading)
  //   return <Spinner />;

  const addGroup = (newGroups: Option[]) => {
    const filteredNewGroups = newGroups.filter(
      (newGroup) => !groups.some((group) => group.id === newGroup.id),
    );
    setGroups([
      ...groups,
      ...filteredNewGroups.map((group) => ({ id: group.id, name: group.text })),
    ]);
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
          {/*{`${student?.name} ${student?.lastname}`}*/}
          Lucas Lovaglio
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
        {groups.length === 0 ? (
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
            {groups.map((group) => (
              <Chip
                key={group.id}
                label={group.name}
                variant="outlined"
                style={{ cursor: 'pointer' }}
                sx={{
                  cursor: 'pointer',
                  borderColor: theme.primary500, // Color del borde
                  color: theme.primary500, // Color del texto
                  '& .MuiChip-deleteIcon': {
                    color: theme.primaty500, // Color de la cruz de eliminar
                  },
                  '&.MuiChip-outlinedPrimary': {
                    borderColor: theme.primary500, // Personaliza el borde en estado primary
                    color: theme.primary500, // Personaliza el texto en estado primary
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
          content={allGroups.map((group) => {
            return { id: group.id, text: group.name };
          })}
          multiple
          placeholder={'Seleccione los grupos que desee agregar'}
          setMultipleValues={addGroup}
          value={[]}
        />
      </StyledColumn>
    </Card>
  );
};

export default StudentsGroupsModal;
