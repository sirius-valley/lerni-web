import React from 'react';
import { useLSelector } from '../../../redux/hooks';
import { useGetMetricsQuery, useStatsQuery } from '../../../redux/service/collection.service';
import { useParams } from 'react-router-dom';
import { MetricCard } from '../../charts/MetricChart';
import { StyledRow } from '../../styled/styles';
import CollectionStatisticsSkeleton from './Skeleton';

const CollectionStatistics = () => {
  const { id } = useParams();
  const collection = useLSelector((state) => state.collection);
  const { data: groups, isLoading } = useGetMetricsQuery(id as string);
  const { data: stats, isLoading: statsLoading } = useStatsQuery(id as string);

  const totalFinished = groups?.reduce((sum, group) => sum + group.finished, 0) || 0;
  const totalStudents = groups?.reduce((sum, group) => sum + group.total, 0) || 0;
  const totalGroups = groups?.length || 0;

  if (isLoading) return <CollectionStatisticsSkeleton />;

  return (
    <StyledRow style={{ justifyContent: 'space-between', width: '832px', gap: 12 }}>
      <MetricCard title={'Finalizaron'} value={stats?.finished ?? 0} description={'Estudiantes'} />
      <MetricCard
        title={'Total de estudiantes'}
        value={stats?.total ?? 0}
        description={'Estudiantes'}
      />
      <MetricCard title={'Total de grupos'} value={totalGroups} description={'Grupos'} />
    </StyledRow>
  );
};

export default CollectionStatistics;
