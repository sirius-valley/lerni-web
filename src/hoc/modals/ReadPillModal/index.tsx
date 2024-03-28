import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Card from '../../../components/Card';
import Button from '../../../components/styled/Button';
import {
  StyledBox,
  StyledColumn,
  StyledImage,
  StyledRow,
  StyledText,
} from '../../../components/styled/styles';
import { useLDispatch } from '../../../redux/hooks';
import { useConvertToLerniPillMutation } from '../../../redux/service/program.service';
import { ComponentVariantType } from '../../../utils/constants';
import { ModalProps } from '../interfaces';
import { removeHtmlTags } from '../../../utils/utils';
import EllipseIcon from '../../../assets/icons/EllipseIcon';
import { SquaredIcon } from '../../../assets/icons/SquaredIcon';
import { mockedPill } from './mocked';

interface BubbleProps {
  type: string;
  id: string;
  metadata?: {
    metadata?: { lerni_question_type: string };
    options?: string[];
  };
  name: string;
  question_type?: string;
}

const RenderBubble = ({ type, id, metadata, name, question_type }: BubbleProps) => {
  if (type === 'ACTION') {
    if (!metadata) {
      return (
        <StyledColumn css={{ justifyContent: 'center', alignItems: 'left', gap: '4px' }}>
          <StyledText variant="body3" color="primary500" css={{ fontFamily: 'Roboto-Bold' }}>
            {'Text'}
          </StyledText>
          <StyledText variant="body2" color="gray950">
            {removeHtmlTags(name)}
          </StyledText>
        </StyledColumn>
      );
    } else if (metadata && metadata.metadata && metadata.metadata.lerni_question_type === 'image') {
      return (
        <StyledColumn css={{ justifyContent: 'center', alignItems: 'left', gap: '4px' }}>
          <StyledText variant="body3" color="primary500" css={{ fontFamily: 'Roboto-Bold' }}>
            {'Imagen'}
          </StyledText>
          <StyledImage src={name} css={{ borderRadius: '8px' }} width={150} height={150} />
        </StyledColumn>
      );
    } else return null;
  } else if (question_type === 'SINGLECHOICE') {
    console.log('question');
    return (
      <StyledColumn css={{ justifyContent: 'left', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" css={{ fontFamily: 'Roboto-Bold', color: '#C642A9' }}>
          {'Single Choice'}
        </StyledText>
        {metadata?.options?.map((option: any, idx: number) => (
          <StyledRow css={{ gap: '4px', alignItems: 'left' }} key={idx}>
            <EllipseIcon />
            <StyledText variant="body2" color="gray950">
              {option}
            </StyledText>
          </StyledRow>
        ))}
      </StyledColumn>
    );
  } else if (question_type === 'MULTIPLECHOICE') {
    return (
      <StyledColumn css={{ justifyContent: 'left', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" css={{ fontFamily: 'Roboto-Bold', color: '#C642A9' }}>
          {'Multiple Choice'}
        </StyledText>
        {metadata?.options?.map((option: any, idx: number) => (
          <StyledRow css={{ gap: '4px', alignItems: 'left' }} key={idx}>
            <SquaredIcon />
            <StyledText variant="body2" color="gray950">
              {option}
            </StyledText>
          </StyledRow>
        ))}
      </StyledColumn>
    );
  } else {
    return null;
  }
};

interface CreateQuestionnaireModalProps extends ModalProps {
  openModal?: boolean;
}

const ReadPillModal = ({ handleOnClose }: CreateQuestionnaireModalProps) => {
  const [errors, setErrors] = useState(false);
  const dispatch = useLDispatch();
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
          {'Visuzalizar JSON'}
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
      }}
      height={`${window.innerHeight * 0.7}px`}
    >
      <StyledColumn css={{ width: '100%' }}>
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
              <RenderBubble
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
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default ReadPillModal;
