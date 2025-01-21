import React from 'react';
import {
  StyledAvatar,
  StyledBox,
  StyledColumn,
  StyledRow,
  StyledText,
} from '../../../styled/styles';
import { ProgramListItem } from '../../../../redux/service/types/program.types';
import { transformFirstLetterToLowerCase } from '../../../../utils/utils';
import { RemoveIcon } from '../../../../assets/icons/RemoveIcon';
import { useTheme } from 'styled-components';

interface ProgramRowProps {
  program: ProgramListItem;
  onDelete?: (programId: string) => void;
  deletable?: boolean;
}

const ProgramRow = ({ program, onDelete, deletable }: ProgramRowProps) => {
  const theme = useTheme();

  return (
    <StyledRow
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px',
        marginTop: '12px',
      }}
    >
      <StyledRow style={{ gap: '8px', alignItems: 'center', height: '100%' }}>
        <StyledAvatar
          src={transformFirstLetterToLowerCase(program.icon ?? '')}
          style={{ borderRadius: 4, objectFit: 'cover', height: '40px', width: '40px' }}
        />
        <StyledColumn
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
            padding: '2px 0',
          }}
        >
          <StyledText
            variant="body2"
            style={{
              color: theme.gray950,
              fontFamily: 'Roboto',
              fontWeight: 500,
            }}
          >
            {program.name}
          </StyledText>
          <StyledText
            variant="body3"
            style={{
              color: theme.gray400,
              fontFamily: 'Roboto',
            }}
          >
            {program.programVersionId}
          </StyledText>
        </StyledColumn>
      </StyledRow>
      {deletable && (
        <StyledBox
          style={{
            cursor: 'pointer',
            width: 'auto',
            marginRight: '16px',
          }}
          onClick={() => onDelete && onDelete(program.programVersionId)}
        >
          <RemoveIcon size={18} color={theme.gray400} />
        </StyledBox>
      )}
    </StyledRow>
  );
};

export default ProgramRow;
