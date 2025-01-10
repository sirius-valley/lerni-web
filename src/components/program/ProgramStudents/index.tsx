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

const mockedStudents = [
  {
    authId: 'auth1',
    email: 'hola@email.com',
    name: 'holaholaholaholaholaholaholaholaholaholahola',
    lastname: 'email',
    status: true,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    id: '1',
    progress: 90,
    groups: [
      { groupId: 'g1', groupName: 'Frontend Masters' },
      { groupId: 'g2', groupName: 'Backend Gurus' },
      { groupId: 'g3', groupName: 'UI Designers' },
    ],
  },
  {
    authId: 'auth2',
    email: 'chatchatchatchatchat@gmail.com',
    name: 'chau',
    lastname: 'gmail',
    status: true,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Dark',
    id: '2',
    progress: 75,
    groups: [{ groupId: 'g4', groupName: 'Chess Club' }],
  },
  {
    authId: 'auth3',
    email: 'test@gmail.com',
    name: 'Test',
    lastname: 'User',
    status: false,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Dark',
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
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&eyeType=Wink&eyebrowType=Default&mouthType=Smile&skinColor=Brown',
    id: '4',
    progress: 80,
    groups: [
      { groupId: 'g5', groupName: 'Science Club' },
      { groupId: 'g6', groupName: 'Robotics Team' },
      { groupId: 'g7', groupName: 'Art Enthusiasts' },
      { groupId: 'g8', groupName: 'Sports Club' },
      { groupId: 'g9', groupName: 'Music Band' },
      { groupId: 'g10', groupName: 'Debate Team' },
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
    groups: [{ groupId: 'g11', groupName: 'Literature Club' }],
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
    groups: [{ groupId: 'g12', groupName: 'Gaming Club' }],
  },
];

interface ProgramStudents {
  programVersionId?: string;
}

export const ProgramStudents = ({ programVersionId }: ProgramStudents) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const students = useLSelector((state) => state.program.students);

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'STUDENTS_CREATE' }));
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
        <StudentsTable students={students} programVersionId={programVersionId ?? ''} />
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
