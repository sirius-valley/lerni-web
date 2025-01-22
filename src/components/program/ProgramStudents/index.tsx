import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React from 'react';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { StudentsTable } from './Table';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { useGetGroupsQuery } from '../../../redux/service/groups.service';

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

interface ProgramStudents {
  programVersionId?: string;
}

export const ProgramStudents = ({ programVersionId }: ProgramStudents) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const groups = useGetGroupsQuery();

  const students = useLSelector((state) => state.program.students);

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'PROGRAM_STUDENTS_CREATE' }));
  };

  return (
    <Card
      padding="18px"
      height="auto"
      headerComponent={
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.gray200}`,
          }}
        >
          <StyledText variant="h2" style={{ marginBottom: '6px' }}>
            {'Estudiantes'}
          </StyledText>
          <StyledBox style={{ marginBottom: '6px' }}>
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={handleShowModal}
              labelSize={ButtonLabelSize.BODY3}
              css={{
                width: 'auto',
                height: '30px',
                padding: '8px 16px 8px 16px',
                fontFamily: 'Roboto-Bold',
                cursor: 'pointer',
              }}
            >
              {'Agregar estudiantes'}
            </Button>
          </StyledBox>
        </StyledRow>
      }
    >
      {students.length ? (
        <StudentsTable
          students={mockedStudents}
          groups={groups.data ?? []}
          programVersionId={programVersionId ?? ''}
        />
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
            {'No se agregaron estudiantes todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
