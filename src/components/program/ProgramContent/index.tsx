import React from 'react';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from 'styled-components';
import Button from '../../styled/Button';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import TrashIcon from '../../../assets/icons/TrashIcon';
import { removePill } from '../../../redux/slices/program.slice';

const ProgramContent = () => {
  const theme = useTheme();
  const dispatch = useLDispatch();
  const pills = useLSelector((state) => state.program.pills);
  const emptyPills = pills.length === 0;

  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'PILL_CREATE' }));
  };

  const handleShowQuestionnaire = () => {
    dispatch(setModalOpen({ modalType: 'PILL_READ' }));
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
            <StyledRow
              key={index}
              css={{
                justifyContent: 'space-between',
                padding: '8px 0px 4px 0px',
                marginLeft: '6px',
                borderBottom: `1px solid ${theme.gray200}`,
              }}
            >
              <StyledRow
                style={{
                  gap: '6px',
                  alignItems: 'center',
                }}
              >
                <StyledBox
                  css={{
                    height: '24px',
                    width: '24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgressbar
                    styles={{
                      root: {
                        display: 'flex',
                      },
                      path: {
                        stroke: '#18BAC8', // check with ceci
                        strokeLinecap: 'butt',
                        transition: 'none',
                      },
                      trail: {
                        stroke: '#D3DDEB',
                        strokeLinecap: 'butt',
                      },
                      text: {
                        fontFamily: 'Roboto-bold',
                        fill: '#000000',
                        fontSize: '60px',
                        fontWeight: 600,
                      },
                    }}
                    maxValue={1}
                    strokeWidth={12}
                    value={0}
                    text={String(index + 1)}
                  />
                </StyledBox>
                <StyledText
                  variant="h4"
                  css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  {title}
                </StyledText>
              </StyledRow>
              <StyledRow
                css={{
                  padding: '8px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <StyledColumn
                  onClick={() => dispatch(handleShowQuestionnaire())}
                  css={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <ShowIcon size={20} color={theme.gray400} />
                </StyledColumn>
                <StyledColumn
                  onClick={() => dispatch(removePill(id))}
                  css={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <TrashIcon size={20} color={theme.gray400} />
                </StyledColumn>
              </StyledRow>
            </StyledRow>
          ))}
        </StyledColumn>
      )}
    </Card>
  );
};
export default ProgramContent;
