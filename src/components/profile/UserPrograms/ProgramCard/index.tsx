import React from 'react';
import { ProgramCardItem } from '../../../../redux/service/types/profile.types';
import {
  StyledBox,
  StyledColumn,
  StyledImage,
  StyledRow,
  StyledText,
} from '../../../styled/styles';
import { useTheme } from 'styled-components';
import CheckIcon from '../../../../assets/icons/CheckIcon';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  program: ProgramCardItem;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const theme = useTheme();

  return (
    <Link to={`/program/${program.id}`} style={{ textDecoration: 'none' }}>
      <StyledColumn
        style={{
          backgroundColor: theme.gray100,
          borderRadius: 8,
          overflow: 'hidden',
          width: '240px',
          position: 'relative',
        }}
      >
        {program.progress < 100 ? (
          <StyledBox
            style={{
              position: 'absolute',
              top: '125px',
              left: '90%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: theme.gray400,
              padding: '5px 8px',
              borderRadius: 20,
            }}
          >
            <StyledText style={{ fontFamily: 'Roboto-Bold', fontSize: '12px' }} color="white">
              {program.progress}%
            </StyledText>
          </StyledBox>
        ) : (
          <StyledColumn
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <StyledRow
              style={{
                backgroundColor: theme.primary500,
                padding: '5px 8px',
                borderRadius: 20,
                width: 'fit-content',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <CheckIcon />
              <StyledText style={{ fontFamily: 'Roboto-Bold', fontSize: '12px' }} color="white">
                Completado
              </StyledText>
            </StyledRow>

            <StyledBox
              style={{
                backgroundColor: theme.primary500,
                padding: '5px 8px',
                borderRadius: 20,
                width: 'fit-content',
              }}
            >
              <StyledText style={{ fontFamily: 'Roboto-Bold', fontSize: '12px' }} color="white">
                {program.points}/{program.maxPoints}
              </StyledText>
            </StyledBox>
          </StyledColumn>
        )}

        <StyledImage
          src={program.image}
          style={{ height: 125, width: '100%', objectFit: 'cover' }}
        />

        <StyledColumn style={{ padding: 16, gap: 16 }}>
          <StyledText variant="h4" css={{ fontSize: '16px' }}>
            {program.name}
          </StyledText>

          <StyledRow style={{ gap: 4 }}>
            <StyledImage
              src={program.teacher.image}
              css={{
                borderRadius: '100%',
                width: '28px',
                height: '28px',
                objectFit: 'cover',
              }}
            />
            <StyledText
              variant="body2"
              css={{ fontFamily: 'Roboto', fontSize: '14px', alignContent: 'center' }}
              color="gray400"
            >
              {program.teacher.name} {program.teacher.lastname}
            </StyledText>
          </StyledRow>
        </StyledColumn>
      </StyledColumn>
    </Link>
  );
};

export default ProgramCard;
