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
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { removeQuestionnaire } from '../../../redux/slices/program.slice';
import QuestionnaireRow from './QuestionnaireRow';
import { usePermissions } from '../../../utils/permissions';

export const ProgramQuestionnaire = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();

  const hasPills = useLSelector((state) => state.program.pills)?.length > 0;
  const questionnaire = useLSelector((state) => state.program.questionnaire);
  const hasQuestionnaire = questionnaire !== undefined;
  const edit = useLSelector((state) => state.program.edit);

  const { canUpdateProgram } = usePermissions();
  const canUpdate = canUpdateProgram();

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'QUESTIONNAIRE_CREATE' }));
  };
  const handleShowQuestionnaire = () => {
    dispatch(setModalOpen({ modalType: 'PILL_READ', metadata: { type: 'questionnaire' } }));
  };

  const handleRemoveQuestionnaire = () => {
    dispatch(removeQuestionnaire());
  };

  return (
    <Card
      height="auto"
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
            {'Cuestionario'}
          </StyledText>
          {canUpdate && (
            <StyledBox style={{ marginBottom: '6px' }}>
              <Button
                variant={ComponentVariantType.PRIMARY}
                onClick={handleShowModal}
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
          )}
        </StyledRow>
      }
    >
      {hasQuestionnaire ? (
        <StyledColumn css={{ gap: '6px', marginTop: '12px' }}>
          <QuestionnaireRow
            handleShowQuestionnaire={handleShowQuestionnaire}
            edit={edit}
            handleRemove={handleRemoveQuestionnaire}
          />
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
            {'No se agregó el cuestionario todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
