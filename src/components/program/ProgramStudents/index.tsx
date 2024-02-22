import { useTheme } from 'styled-components';
import { QuestionnaireIcon } from '../../../assets/icons/QuestionnaireIcon';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useState } from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { StudentsTable } from './Table';

interface ProgramStudentsProps {
  hasPills: boolean;
}

const mockedStudents = [
  {
    email: 'hola@email.com',
    name: 'hola',
    lastname: 'email',
    status: false,
    profilePicture:
      'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  },
  {
    email: 'chat@gmail.com',
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
  const [show, setShow] = useState(false);

  const StudentsHeader = (
    <StyledRow style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        {'Estudiantes'}
      </StyledText>
      <StyledBox style={{ marginBottom: '6px' }}>
        <Button
          variant={ComponentVariantType.PRIMARY}
          onClick={() => console.log('open modal')}
          labelSize={ButtonLabelSize.BODY3}
          css={{
            width: 'auto',
            height: '30px',
            padding: '8px 16px 8px 16px',
            fontWeight: 14,
          }}
        >
          {'Cargar estudiantes'}
        </Button>
      </StyledBox>
    </StyledRow>
  );

  const StudentsBody = <StudentsTable students={mockedStudents} />;

  return (
    <Card height="auto" headerComponent={StudentsHeader}>
      {StudentsBody}
    </Card>
  );
};