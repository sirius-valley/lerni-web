import { useTheme } from 'styled-components';
import { QuestionnaireIcon } from '../../../assets/icons/QuestionnaireIcon';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React from 'react';
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

  const QuestionnaireHeader = (
    <StyledRow
      style={{
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.gray200}`,
      }}
    >
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        {'Cuestionario'}
      </StyledText>
      <StyledBox style={{ marginBottom: '6px' }}>
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
            cursor: !hasQuestionnaire ? 'pointer' : '',
          }}
        >
          {'Agregar cuestionario'}
        </Button>
      </StyledBox>
    </StyledRow>
  );

  const QustionnaireBody = (
    <StyledColumn css={{ gap: '6px', marginTop: '12px' }}>
      <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
        <StyledRow style={{ gap: 6, alignItems: 'center' }}>
          <QuestionnaireIcon size={18} color={theme.gray300} />
          <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
            {`Cuestionario + ${'Nombre de programa'}`}
          </StyledText>
        </StyledRow>
        <StyledRow css={{ gap: '8px' }}>
          <StyledBox onClick={() => alert('open modal')} css={{ cursor: 'pointer' }}>
            <ShowIcon size={18} color={theme.gray400} />
          </StyledBox>
          <StyledBox onClick={() => alert('removed')} css={{ cursor: 'pointer' }}>
            <RemoveIcon size={18} color={theme.gray400} />
          </StyledBox>
        </StyledRow>
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
