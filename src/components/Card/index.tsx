import React from 'react';
import { CSSObject, DefaultTheme, useTheme } from 'styled-components';
import { StyledBox, StyledRow, StyledText } from '../styled/styles';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  width?: string;
  height?: string;
  css?: CSSObject;
}

const Card = ({
  title,
  children,
  headerComponent,
  width = '832px',
  height = '412px',
  css,
}: CardProps) => {
  const theme = useTheme() as DefaultTheme;
  return (
    <StyledBox
      style={{
        borderRadius: '16px',
        padding: '24px',
        gap: '12px',
        width: width,
        height: height,
        background: theme.white,
        ...css,
      }}
    >
      <StyledRow style={{ borderBottom: `1px solid ${theme.gray200}` }}>
        {headerComponent ?? (
          <StyledText variant="h2" style={{ marginBottom: '6px' }}>
            {title}
          </StyledText>
        )}
      </StyledRow>
      <StyledBox>{children}</StyledBox>
    </StyledBox>
  );
};

export default Card;