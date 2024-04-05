import React from 'react';
import { useTheme } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Card from '../../../components/Card';
import Button from '../../../components/styled/Button';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ComponentVariantType } from '../../../utils/constants';
import { ModalProps } from '../interfaces';
import { ElementTypeRender } from './ElementTypeRender';
import { mockedPill } from './mocked';

interface CreateQuestionnaireModalProps extends ModalProps {
  openModal?: boolean;
}

const ReadPillModal = ({ handleOnClose }: CreateQuestionnaireModalProps) => {
  const theme = useTheme();

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          {'Visualizar JSON'}
        </StyledText>
        <StyledText variant="body2">
          {'En esta sección, se puede visualizar el contenido que se consumirán en la aplicación.'}
        </StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        width: '568px',
        zIndex: 30,
        padding: '32px',
      }}
      height={`${window.innerHeight * 0.7}px`}
    >
      <StyledColumn css={{ width: '100%', gap: 24 }}>
        <StyledColumn
          css={{
            maxHeight: `${window.innerHeight * 0.5}px`,
            overflow: 'auto',
            width: '100%',
            justifyContent: 'left',
            alignItems: 'left',
            borderRadius: '8px',
            padding: '8px',
            gap: '24px',
            backgroundColor: theme.gray100,
          }}
        >
          {mockedPill &&
            mockedPill.elements &&
            mockedPill.elements.map((bubble, idx) => (
              <ElementTypeRender
                key={idx}
                type={bubble.type}
                id={bubble.id}
                name={bubble.name}
                metadata={bubble.metadata}
                question_type={bubble.question_type}
              />
            ))}
        </StyledColumn>
        <StyledRow
          css={{
            marginTop: '24px',
            width: '100%',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            css={{
              padding: '24px 32px 32px 50px',
            }}
          >
            {'Cerrar'}
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default ReadPillModal;
