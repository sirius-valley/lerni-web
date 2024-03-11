import React from 'react';
import {
  StyledAvatar,
  StyledBox,
  StyledColumn,
  StyledImage,
  StyledRow,
  StyledText,
} from '../../styled/styles';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { useTheme } from 'styled-components';
import { Avatar } from '@mui/material';

interface ProfessorItemProps {
  id: string;
  name: string;
  surname: string;
  imgURL: string;
}

const ProfessorItem = ({ name, surname, imgURL }: ProfessorItemProps) => {
  const theme = useTheme();

  const openProfessorDetails = () => {
    console.log('');
  };
  return (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 6px',
        borderBottom: '1px solid',
        borderBottomColor: theme.gray200,
      }}
    >
      <StyledRow css={{ alignItems: 'center', gap: '6px' }}>
        <StyledAvatar src={imgURL} />
        <StyledText variant={'body2'} css={{ fontWeight: 900 }}>
          {name} {surname}
        </StyledText>
      </StyledRow>
      <StyledBox css={{ cursor: 'pointer' }}>
        <ShowIcon color={theme.gray400} size={18} />
      </StyledBox>
    </StyledRow>
  );
};

export default ProfessorItem;
