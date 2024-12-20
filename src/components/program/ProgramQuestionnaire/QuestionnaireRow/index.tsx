import React from 'react';
import { StyledBox, StyledRow, StyledText } from '../../../styled/styles';
import { QuestionnaireIcon } from '../../../../assets/icons/QuestionnaireIcon';
import { ShowIcon } from '../../../../assets/icons/ShowIcon';
import { RemoveIcon } from '../../../../assets/icons/RemoveIcon';
import { useTheme } from 'styled-components';

interface QuestionnaireRowProps {
  handleShowQuestionnaire: () => void;
  edit: boolean;
  handleRemove: () => void;
}

const QuestionnaireRow = ({
  handleShowQuestionnaire,
  edit,
  handleRemove,
}: QuestionnaireRowProps) => {
  const theme = useTheme();
  return (
    <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
      <StyledRow style={{ gap: 6, alignItems: 'center' }}>
        <QuestionnaireIcon size={18} color={theme.gray300} />
        <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
          Cuestionario
        </StyledText>
      </StyledRow>
      <StyledRow css={{ gap: '8px' }}>
        <StyledBox onClick={handleShowQuestionnaire} css={{ cursor: 'pointer' }}>
          <ShowIcon size={18} color={theme.gray400} />
        </StyledBox>
        {edit && (
          <StyledBox onClick={handleRemove} css={{ cursor: 'pointer' }}>
            <RemoveIcon size={18} color={theme.gray400} />
          </StyledBox>
        )}
      </StyledRow>
    </StyledRow>
  );
};

export default QuestionnaireRow;
