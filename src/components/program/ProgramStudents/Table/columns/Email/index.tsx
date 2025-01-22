import { StyledAvatar, StyledRow, StyledText } from '../../../../../styled/styles';
import { transformFirstLetterToLowerCase } from '../../../../../../utils/utils';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { useTheme } from 'styled-components';

interface EmailProps {
  email: string;
  image?: string;
}
const Email = ({ email, image }: EmailProps) => {
  const theme = useTheme();
  return (
    <StyledRow style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>
      <StyledAvatar src={transformFirstLetterToLowerCase(image ?? '')} />
      <StyledText
        variant="body1"
        style={{
          maxWidth: '170px',
          textAlign: 'center',
          fontSize: 14,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        data-tooltip-content={email}
        data-tooltip-id={email?.length > 22 ? 'email-tooltip' : undefined}
      >
        {email}
      </StyledText>
      <Tooltip
        id="email-tooltip"
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          backgroundColor: theme.gray600,
          color: 'white',
          fontSize: 14,
          fontFamily: 'Roboto',
        }}
        place="top"
      />
    </StyledRow>
  );
};

export default Email;
