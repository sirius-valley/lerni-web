import { useTheme } from 'styled-components';
import { QuestionnaireIcon } from '../../../assets/icons/QuestionnaireIcon';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React, { useState } from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { RemoveIcon } from '../../../assets/icons/RemoveIcon';

interface ProgramQuestionnaireProps {
  hasQuestionnaire: boolean;
  hasPills: boolean;
}

export const ProgramQuestionnaire = ({
  hasQuestionnaire = false,
  hasPills = true,
}: ProgramQuestionnaireProps) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const QuestionnaireHeader = (
    <StyledRow style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        {'Cuestionario'}
      </StyledText>
      <StyledBox style={{ marginBottom: '6px' }}>
        {/* Acá hay dos opciones, o se bloquea el botón, o ni se muestra */}
        <Button
          variant={ComponentVariantType.PRIMARY}
          onClick={() => console.log('open modal')}
          labelSize={ButtonLabelSize.BODY3}
          disabled={!hasQuestionnaire && hasPills ? false : true}
          css={{
            width: 'auto',
            height: '30px',
            padding: '8px 16px 8px 16px',
            fontFamily: 'Roboto-Bold',
          }}
        >
          {'Cargar cuestionario'}
        </Button>
      </StyledBox>
    </StyledRow>
  );

  const QustionnaireBody = (
    <StyledColumn css={{ gap: '6px', marginTop: '12px', borderBottom: '1px solid #DDDDDD' }}>
      <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
        <StyledRow style={{ gap: 6, alignItems: 'center' }}>
          <QuestionnaireIcon size={18} color={theme.gray300} />
          <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
            {`Cuestionario - ${'Nombre de programa'}`}
          </StyledText>
        </StyledRow>
        {!hasQuestionnaire ? (
          <Button
            onClick={() => alert('open modal')}
            variant={ComponentVariantType.PRIMARY}
            labelSize={ButtonLabelSize.BODY3}
            css={{
              width: 'auto',
              height: '30px',
              padding: '8px 16px 8px 16px',
              fontWeight: 400,
            }}
          >
            {'Cargar cuestionario'}
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
    <Card height="auto" headerComponent={QuestionnaireHeader}>
      {hasQuestionnaire ? (
        QustionnaireBody
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
            {'No se agregó el cuestionario todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
