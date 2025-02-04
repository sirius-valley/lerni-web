import { ProgramListItem } from '../../../../redux/service/types/program.types';
import { StyledBox, StyledColumn, StyledText } from '../../../styled/styles';
import ProgramRow from './ProgramRow';
import React from 'react';
import { useTheme } from 'styled-components';

interface ProgramsListProps {
  programs: ProgramListItem[];
  onDelete: (id: string) => void;
}

const ProgramsList = ({ programs, onDelete }: ProgramsListProps) => {
  const theme = useTheme();
  return (
    <>
      {programs.length !== 0 ? (
        <StyledColumn css={{ gap: '0px', maxHeight: '262px', overflowY: 'auto' }}>
          {programs.map((program, index) => (
            <StyledColumn
              key={index}
              style={{
                borderBottom: index !== programs.length - 1 ? `1px solid ${theme.gray200}` : 'none',
                paddingBottom: '16px',
              }}
            >
              <ProgramRow
                deletable={true}
                program={program}
                onDelete={() => onDelete(program.programVersionId)}
              />
            </StyledColumn>
          ))}
        </StyledColumn>
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
            {'No se agregaron programas todavía'}
          </StyledText>
        </StyledBox>
      )}
    </>
  );
};

export default ProgramsList;
