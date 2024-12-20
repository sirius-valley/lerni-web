import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from 'styled-components';
import Button from '../../styled/Button';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { removePill } from '../../../redux/slices/program.slice';
import PillRow from './PillRow';

const ProgramContent = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const pills = useLSelector((state) => state.program.pills);
  const emptyPills = pills.length === 0;
  const edit = useLSelector((state) => state.program.edit);

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'PILL_CREATE' }));
  };

  const handleShowQuestionnaire = (id: string) => {
    dispatch(setModalOpen({ modalType: 'PILL_READ', metadata: { type: 'pill', id: id } }));
  };

  const handleRemove = (id: string) => {
    dispatch(removePill(id));
  };

  const ProgramHeader = (
    <StyledRow
      style={{
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.gray200}`,
      }}
    >
      <StyledText variant="h2" style={{ marginBottom: '6px' }}>
        Contenido
      </StyledText>
      <StyledBox style={{ marginBottom: '6px' }}>
        <Button
          variant={ComponentVariantType.PRIMARY}
          onClick={handleShowModal}
          labelSize={ButtonLabelSize.BODY3}
          css={{
            width: '114px',
            height: '30px',
            cursor: 'pointer',
          }}
        >
          Agregar pildora
        </Button>
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card height={'auto'} headerComponent={ProgramHeader}>
      {emptyPills ? (
        <StyledRow
          style={{
            gap: '24px',
            padding: '16px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StyledText color="gray400" variant="body3">
            No se agregó ninguna píldora todavía
          </StyledText>
        </StyledRow>
      ) : (
        <StyledColumn
          css={{ gap: '6px', marginTop: '12px', overflowY: 'scroll', maxHeight: '230px' }}
        >
          {pills.map(({ title, id }, index) => (
            <PillRow
              handleShowQuestionnaire={handleShowQuestionnaire}
              handleRemove={handleRemove}
              title={title}
              id={id}
              index={index}
              edit={edit}
              key={index}
            />
          ))}
        </StyledColumn>
      )}
    </Card>
  );
};
export default ProgramContent;
