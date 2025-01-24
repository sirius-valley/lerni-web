import { StyledAvatar, StyledBox, StyledRow, StyledText } from '../../../../../styled/styles';
import { transformFirstLetterToLowerCase } from '../../../../../../utils/utils';
import { Tooltip } from 'react-tooltip';
import React from 'react';
import { useTheme } from 'styled-components';
import { PeopleIcon } from '../../../../../../assets/icons/PeopleIcon';
import { UserIcon } from '../../../../../../assets/icons/UserIcon';

interface EmailProps {
  email: string;
  image?: string;
}
const Email = ({ email, image }: EmailProps) => {
  const theme = useTheme();
  return (
    <StyledRow style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 12 }}>
      {image ? (
        <StyledAvatar src={transformFirstLetterToLowerCase(image ?? '')} />
      ) : (
        <StyledBox
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.gray200,
            width: 40,
            height: 40,
            borderRadius: 40,
          }}
        >
          <UserIcon color={theme.gray400} size={20} />
        </StyledBox>
      )}
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
        data-tooltip-id={email?.length > 20 ? 'email-tooltip' : undefined}
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
