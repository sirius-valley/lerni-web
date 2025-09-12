import React from 'react';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { Card } from '../Card';
import Chart from 'react-apexcharts';
import { useAllProgramsChartQuery } from '../../../redux/service/program.service';
import Spinner from '../../Spinner/Spinner';
import MetricChartSkeleton from '../MetricChart/Skeleton';

const AllProgramsChart = () => {
  const { data, isLoading } = useAllProgramsChartQuery();
  const theme = useTheme();

  if (isLoading) return <MetricChartSkeleton height={'274px'} />;
  if (!data) return <></>;

  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h2" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {'Estado de programas'}
      </StyledText>
    </StyledColumn>
  );

  const totalPrograms = data.total;

  //Chart styling and labeling.
  const options = {
    labels: ['Terminaron', 'En curso', 'Sin empezar'],
    colors: [theme.primary500, theme.primary600, theme.gray300],
    legend: {
      show: true,
      fontFamily: 'Roboto',
      fontSize: '12px',
      position: 'right',
      offsetY: 20,
      horizontalAlign: 'left',
      itemMargin: {
        horizontal: -10,
        vertical: 2,
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      followCursor: false,
      formatter: function (seriesName: string, opts: any) {
        return [
          `${Math.round(
            (opts.w.globals.series[opts.seriesIndex] / totalPrograms) * 100,
          )}% ${seriesName}`,
        ];
      },
      style: {
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
    },
  };
  const series = [data.completed, data.inProgress, data.notStarted];
  const labels = ['Terminaron', 'En curso', 'Sin empezar'];

  return (
    <Card header={cardHeader}>
      <StyledBox
        css={{ justifyContent: 'center', width: '100%', height: '100%', alignContent: 'center' }}
      >
        {isLoading ? (
          <StyledBox css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </StyledBox>
        ) : !data.total ? (
          <StyledText variant="body1" color="gray500" css={{ textAlign: 'center' }}>
            {'No hay datos'}
          </StyledText>
        ) : (
          <StyledBox css={{ position: 'relative' }}>
            <StyledColumn
              css={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '35%',
                left: '20.5%',
              }}
            >
              <StyledText
                variant="body1"
                color="primary500"
                css={{ fontSize: '22px', textAlign: 'center' }}
              >
                {totalPrograms}
              </StyledText>
              <StyledText variant="body2" color="gray900">
                {'Programas'}
              </StyledText>
            </StyledColumn>
            {/* it ignores type errors over apex charts legends position and horizontalAlign */}
            {/* @ts-ignore */}
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="donut"
              width="100%"
            />
          </StyledBox>
        )}
      </StyledBox>
    </Card>
  );
};

export default AllProgramsChart;
