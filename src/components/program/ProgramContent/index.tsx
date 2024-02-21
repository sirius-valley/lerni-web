import React from 'react';
import Card from '../../Card';
import { StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';

const ProgramContent = () => {
  const ProgramHeader = (
    <StyledRow style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        Contenido
      </StyledText>
      <Button
        labelSize={ButtonLabelSize.BODY3}
        variant={ComponentVariantType.PRIMARY}
        onClick={() => console.log('hola')}
        label="Agregar pildora"
        css={{ maxHeight: '30px', maxWidth: '114px' }}
      />
    </StyledRow>
  );
  const ProgramBody = (
    <StyledRow
      style={{ gap: '24px', marginTop: '12px', justifyContent: 'center', alignItems: 'center' }}
    >
      <StyledText color="gray400" variant="body3">
        No se agregó ninguna píldora todavía
      </StyledText>
    </StyledRow>
  );
  return (
    <Card height={'137px'} headerComponent={ProgramHeader}>
      {ProgramBody}
    </Card>
  );
};
export default ProgramContent;
