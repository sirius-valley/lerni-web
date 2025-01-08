import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Card from '../../Card';
import { useTheme } from 'styled-components';
import { useLDispatch } from '../../../redux/hooks';
import { AutocompleteComponent } from '../../Autocomplete';
import { useProgramListQuery } from '../../../redux/service/program.service';
import ProgramRow from './ProgramRow';
import { ProgramListItem } from '../../../redux/service/types/program.types';

const CollectionPrograms = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const { data } = useProgramListQuery();

  const availablePrograms =
    data?.results.map((program) => {
      return { id: program.programVersionId, text: program.name };
    }) || [];
  const [programs, setPrograms] = React.useState<ProgramListItem[]>([]);

  const addProgram = (programId: string) => {
    const program: ProgramListItem | null =
      data?.results.find((program) => program.programVersionId === programId) || null;
    // si program no es null, y si programs no contiene a program, agrego program a programs
    if (program && !programs.includes(program)) {
      setPrograms([...programs, program]);
    }
  };

  return (
    <Card
      height="auto"
      css={{ gap: 0 }}
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
            {'Programas'}
          </StyledText>
          <StyledBox style={{ marginBottom: '6px', width: '250px' }}>
            <AutocompleteComponent
              multiple
              placeholder={'Buscar programas...'}
              content={availablePrograms}
              value={[]}
              onChange={(value: string) => addProgram(value)}
            />
          </StyledBox>
        </StyledRow>
      }
    >
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
                program={program}
                onDelete={() =>
                  setPrograms(
                    programs.filter(
                      (deletedProgram) =>
                        deletedProgram.programVersionId !== program.programVersionId,
                    ),
                  )
                }
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
    </Card>
  );
};

export default CollectionPrograms;
