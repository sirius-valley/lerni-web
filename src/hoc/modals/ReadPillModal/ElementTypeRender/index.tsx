import React from 'react';
import EllipseIcon from '../../../../assets/icons/EllipseIcon';
import { SquaredIcon } from '../../../../assets/icons/SquaredIcon';
import {
  StyledColumn,
  StyledImage,
  StyledRow,
  StyledText,
} from '../../../../components/styled/styles';
import { removeHtmlTags } from '../../../../utils/utils';

export interface BubbleProps {
  type: string;
  id: string;
  metadata?: {
    metadata?: { lerni_question_type: string };
    options?: string[];
  };
  name: string;
  question_type?: string;
}

export const ElementTypeRender = ({ type, id, metadata, name, question_type }: BubbleProps) => {
  if (type === 'ACTION') {
    if (!metadata) {
      return (
        <StyledColumn css={{ justifyContent: 'center', alignItems: 'left', gap: '4px' }}>
          <StyledText variant="body3" color="primary500" css={{ fontFamily: 'Roboto-Bold' }}>
            {'Texto'}
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
          <StyledImage src={name} css={{ borderRadius: '8px' }} />
        </StyledColumn>
      );
    } else return null;
  } else if (
    question_type === 'SINGLECHOICE' &&
    metadata?.metadata?.lerni_question_type === 'single-choice'
  ) {
    return (
      <StyledColumn css={{ justifyContent: 'left', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" css={{ fontFamily: 'Roboto-Bold', color: '#C642A9' }}>
          {'Selección única'}
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
  } else if (
    question_type === 'MULTIPLECHOICE' &&
    metadata?.metadata?.lerni_question_type === 'multiple-choice'
  ) {
    return (
      <StyledColumn css={{ justifyContent: 'left', alignItems: 'left', gap: '4px' }}>
        <StyledText variant="body3" css={{ fontFamily: 'Roboto-Bold', color: '#C642A9' }}>
          {'Selección multiple'}
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
