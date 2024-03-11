import React from 'react';
import { CSSObject, DefaultTheme, useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../styled/styles';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  css?: CSSObject;
}

const Card = ({
  title,
  children,
  headerComponent,
  padding,
  width = '832px',
  height = '412px',
  css,
}: CardProps) => {
  const theme = useTheme() as DefaultTheme;
  return (
    <StyledColumn
      style={{
        borderRadius: '16px',
        padding: padding ?? '24px',
        gap: '12px',
        width: width,
        height: height,
        background: theme.white,
        ...css,
      }}
    >
      {headerComponent ?? (
        <StyledRow style={{ borderBottom: `1px solid ${theme.gray200}` }}>
          <StyledText variant="h2" style={{ marginBottom: '6px' }}>
            {title}
          </StyledText>
        </StyledRow>
      )}
      <StyledBox>{children}</StyledBox>
    </StyledColumn>
  );
};

export default Card;
