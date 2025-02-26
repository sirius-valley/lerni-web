import React from 'react';
import { useLSelector } from '../../../redux/hooks';
import { useGetMetricsQuery, useStatsQuery } from '../../../redux/service/collection.service';
import { useParams } from 'react-router-dom';
import { MetricChart } from '../../charts/MetricChart';
import { StyledRow } from '../../styled/styles';
import CollectionStatisticsSkeleton from './Skeleton';

const CollectionStatistics = () => {
  const { id } = useParams();
  const { data: stats, isLoading } = useStatsQuery(id as string);

  const finished = stats?.finished ?? 0;
  const total = stats?.total ?? 0;
  const inProgress = total - finished;

  if (isLoading) return <CollectionStatisticsSkeleton />;

  return (
    <StyledRow style={{ justifyContent: 'space-between', width: '832px', gap: 12 }}>
      <MetricChart title={'Finalizaron'} value={finished} description={'Estudiantes'} />
      <MetricChart title={'En curso'} value={inProgress} description={'Estudiantes'} />
      <MetricChart title={'Total de estudiantes'} value={total} description={'Estudiantes'} />
    </StyledRow>
  );
};

export default CollectionStatistics;
