import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useState } from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { TriviaIcon } from '../../../assets/icons/TriviaIcon';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';

interface ProgramTriviaProps {
  hasPills: boolean;
}

export const ProgramTrivia = ({ hasPills = true }: ProgramTriviaProps) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const TriviaBody = (
    <StyledColumn css={{ gap: '6px', marginTop: '12px', borderBottom: '1px solid #DDDDDD' }}>
      <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
        <StyledRow style={{ gap: 6, alignItems: 'center' }}>
          <TriviaIcon size={18} color={theme.gray300} />
          <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
            {'Trivia'}
          </StyledText>
        </StyledRow>
        {hasPills ? (
          <Button
            onClick={() => alert('open modal')}
            variant={ComponentVariantType.PRIMARY}
            labelSize={ButtonLabelSize.BODY3}
            css={{
              padding: '8px 16px 8px 16px',
              width: 'auto',
              height: '30px',
              fontWeight: 400,
            }}
          >
            {'Cargar trivia'}
          </Button>
        ) : (
          <StyledBox onClick={() => setShow(true)}>
            <ShowIcon size={18} color={theme.gray400} />
          </StyledBox>
        )}
      </StyledRow>
    </StyledColumn>
  );

  return (
    <Card height="auto" title="Trivia">
      {TriviaBody}
    </Card>
  );
};
