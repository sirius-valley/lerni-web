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
    </>
  );
};

export default ProgramsList;
