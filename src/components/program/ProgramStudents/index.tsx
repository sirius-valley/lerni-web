import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React from 'react';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { StudentsTable } from './Table';
import { useLDispatch } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';

interface ProgramStudentsProps {
  hasPills: boolean;
}

const mockedStudents = [
  {
    email: 'hola@email.com',
    name: 'holaholaholaholaholaholaholaholaholaholahola',
    lastname: 'email',
    status: true,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  },
  {
    email: 'chatchatchatchatchat@gmail.com',
    name: 'chau',
    lastname: 'gmail',
    status: true,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Dark',
  },
  {
    email: 'test@gmail.com',
    status: false,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Dark',
  },
];

export const ProgramStudents = ({ hasPills = true }: ProgramStudentsProps) => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'STUDENTS_CREATE' }));
  };

  const StudentsHeader = (
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
  );

  const StudentsBody = <StudentsTable students={mockedStudents} />;

  return (
    <Card padding="18px" height="auto" headerComponent={StudentsHeader}>
      {mockedStudents.length ? (
        StudentsBody
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
