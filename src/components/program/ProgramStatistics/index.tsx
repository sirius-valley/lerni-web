import React from 'react';
import { useTheme } from 'styled-components';
import Card from '../../Card';
import { StyledBox, StyledRow, StyledText } from '../../styled/styles';
import { AttendanceChart } from '../../charts/AttendanceChart';
import { LikesChart } from '../../charts/LikesChart';
import { useParams } from 'react-router-dom';
import { QuestionnaireAttemptsChart } from '../../charts/QuestionnaireAttemptsChart';
import { useLSelector } from '../../../redux/hooks';
import ProgramStatisticsSkeleton from './Skeleton';
export const ProgramStatistics = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { isLoading } = useLSelector((state) => state.program);

  if (isLoading) return <ProgramStatisticsSkeleton />;

  return (
    <Card
      height="auto"
      headerComponent={
        <StyledRow
          style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.gray200}`,
          }}
        >
          <StyledText variant="h2" style={{ marginBottom: '6px' }}>
            {'Estadísticas'}
          </StyledText>
          <StyledBox style={{ marginBottom: '6px' }}></StyledBox>
        </StyledRow>
      }
    >
      <StyledRow
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 0px 16px 0px',
          gap: '10px',
        }}
      >
        <AttendanceChart programId={id ?? ''} />
        <QuestionnaireAttemptsChart programId={id ?? ''} />
        <LikesChart programId={id ?? ''} />
      </StyledRow>
    </Card>
  );
};
