import React from 'react';
import { StyledColumn, StyledRow, StyledText } from '../styled/styles';
import { useTheme } from 'styled-components';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  height?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon }) => {
  const theme = useTheme();

  return (
    <StyledRow
      css={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {icon && <StyledColumn css={{ alignItems: 'center', gap: '8px' }}>{icon}</StyledColumn>}
      <StyledColumn css={{ alignItems: 'center', gap: '4px' }}>
        <StyledText
          variant="h3"
          color="gray700"
          css={{ textAlign: 'center', fontFamily: 'Roboto' }}
        >
          {title}
        </StyledText>
        {description && (
          <StyledText variant="body2" color="gray500" css={{ textAlign: 'center' }}>
            {description}
          </StyledText>
        )}
      </StyledColumn>
    </StyledRow>
  );
};

export default EmptyState;
