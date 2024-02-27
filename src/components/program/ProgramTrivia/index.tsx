import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useState } from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { TriviaIcon } from '../../../assets/icons/TriviaIcon';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { RemoveIcon } from '../../../assets/icons/RemoveIcon';

interface ProgramTriviaProps {
  hasPills: boolean;
  hasTrivia: boolean;
}

export const ProgramTrivia = ({ hasPills = true, hasTrivia }: ProgramTriviaProps) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const TriviaHeader = (
    <StyledRow style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        {'Trivia'}
      </StyledText>
      <StyledBox style={{ marginBottom: '6px' }}>
        {/* Acá hay dos opciones, o se bloquea el botón, o ni se muestra */}
        <Button
          variant={ComponentVariantType.PRIMARY}
          onClick={() => console.log('open modal')}
          labelSize={ButtonLabelSize.BODY3}
          disabled={!hasTrivia && hasPills ? false : true}
          css={{
            width: 'auto',
            height: '30px',
            padding: '8px 16px 8px 16px',
            fontFamily: 'Roboto-Bold',
          }}
        >
          {'Cargar trivia'}
        </Button>
      </StyledBox>
    </StyledRow>
  );

  const TriviaBody = (
    <StyledColumn css={{ gap: '6px', marginTop: '12px', borderBottom: '1px solid #DDDDDD' }}>
      <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
        <StyledRow style={{ gap: 6, alignItems: 'center' }}>
          <TriviaIcon size={18} color={theme.gray300} />
          <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
            {`Trivia - ${'Nombre del programa'}`}
          </StyledText>
        </StyledRow>
        {!hasTrivia ? (
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
          <StyledRow css={{ gap: 8 }}>
            <StyledBox onClick={() => setShow(true)}>
              <ShowIcon size={18} color={theme.gray400} />
            </StyledBox>
            <StyledBox onClick={() => alert('removed')}>
              <RemoveIcon size={18} color={theme.gray400} />
            </StyledBox>
          </StyledRow>
        )}
      </StyledRow>
    </StyledColumn>
  );

  return (
    <Card height="auto" headerComponent={TriviaHeader}>
      {hasTrivia ? (
        TriviaBody
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
            {'No se agregó la trivia todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
