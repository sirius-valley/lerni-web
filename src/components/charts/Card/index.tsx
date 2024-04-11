import React from 'react';
import { StyledBox, StyledColumn, StyledLine, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';

interface CardProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const Card = ({ header, children }: CardProps) => {
  const theme = useTheme();
  return (
    <StyledBox
      css={{
        gap: '7px',
        padding: '21px 0px',
        minWidth: '264px',
        borderRadius: '19px',
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1.19 },
        backgroundColor: theme.white,
      }}
    >
      <StyledColumn
        css={{
          gap: '14px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <StyledColumn
          css={{ gap: '7px', width: '100%', borderBottom: `1px solid ${theme.gray200}` }}
        >
          {header}
        </StyledColumn>
        <StyledBox
          css={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          {children}
        </StyledBox>
      </StyledColumn>
    </StyledBox>
  );
};
