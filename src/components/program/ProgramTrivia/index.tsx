import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import Button from '../../styled/Button';
import React from 'react';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { TriviaIcon } from '../../../assets/icons/TriviaIcon';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../styled/Button/styles';
import { RemoveIcon } from '../../../assets/icons/RemoveIcon';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { setModalOpen } from '../../../redux/slices/utils.slice';
import { removeTrivia } from '../../../redux/slices/program.slice';

export const ProgramTrivia = () => {
  const theme = useTheme();
  const hasPills = useLSelector((state) => state.program.pills)?.length > 0;
  const hasTrivia = useLSelector((state) => state.program.trivia) !== undefined;

  const dispatch = useLDispatch();
  const handleShowModal = () => {
    dispatch(setModalOpen({ modalType: 'TRIVIA_CREATE' }));
  };

  const handleShowPreview = () => {
    dispatch(setModalOpen({ modalType: 'PILL_READ', metadata: { type: 'trivia' } }));
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
            {'Trivia'}
          </StyledText>
          <StyledBox style={{ marginBottom: '6px' }}>
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={handleShowModal}
              labelSize={ButtonLabelSize.BODY3}
              disabled={!(!hasTrivia && hasPills)}
              css={{
                width: 'auto',
                height: '30px',
                padding: '8px 16px 8px 16px',
                fontFamily: 'Roboto-Bold',
                cursor: !hasTrivia ? 'pointer' : '',
              }}
            >
              {'Agregar trivia'}
            </Button>
          </StyledBox>
        </StyledRow>
      }
    >
      {hasTrivia ? (
        <StyledColumn css={{ gap: '6px', marginTop: '12px' }}>
          <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
            <StyledRow style={{ gap: 6, alignItems: 'center' }}>
              <TriviaIcon size={18} color={theme.gray300} />
              <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
                {`Trivia`}
              </StyledText>
            </StyledRow>
            <StyledRow css={{ gap: '8px' }}>
              <StyledBox onClick={handleShowPreview} css={{ cursor: 'pointer' }}>
                <ShowIcon size={18} color={theme.gray400} />
              </StyledBox>
              <StyledBox onClick={() => dispatch(removeTrivia())} css={{ cursor: 'pointer' }}>
                <RemoveIcon size={18} color={theme.gray400} />
              </StyledBox>
            </StyledRow>
          </StyledRow>
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
            {'No se agregó la trivia todavía'}
          </StyledText>
        </StyledBox>
      )}
    </Card>
  );
};
