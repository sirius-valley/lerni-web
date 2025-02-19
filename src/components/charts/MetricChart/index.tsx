import React from 'react';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
import Card from '../../Card';

interface MetricCardProps {
  title: string;
  value: number;
  description?: string;
  isLoading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, isLoading }) => {
  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h2" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {title}
      </StyledText>
    </StyledColumn>
  );

  return (
    <Card title={title}>
      <StyledBox
        css={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          alignContent: 'center',
        }}
      >
        <StyledColumn css={{ gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
          <StyledText variant="h1" color="primary500" css={{ fontSize: '70px' }}>
            {value}
          </StyledText>
          <StyledText variant="h2" color="gray800" css={{ fontFamily: 'Roboto' }}>
            {description}
          </StyledText>
        </StyledColumn>
      </StyledBox>
    </Card>
  );
};
