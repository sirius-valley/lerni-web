import React from 'react';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { Card } from '../Card';
import Chart from 'react-apexcharts';
import { useGetProgramLikesQuery } from '../../../redux/service/program.service';
import { LikesResponse } from '../../../redux/service/types/program.types';

interface LikesChartProps {
  programId: string;
}

export const LikesChart = ({ programId }: LikesChartProps) => {
  const theme = useTheme();

  const { data, isLoading, isError, error } = useGetProgramLikesQuery(programId) as {
    data: LikesResponse;
    isLoading: boolean;
    isError: boolean;
    error: any;
  };

  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h1" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {'Me gusta'}
      </StyledText>
      <StyledText variant="body2" color="gray700">
        {'Likes del programa'}
      </StyledText>
    </StyledColumn>
  );

  const totalVotes = (data?.likes || 0) + (data?.dislikes || 0);

  //Chart styling and labeling.
  const options = {
    labels: ['Me gusta', 'No me gusta'],
    colors: [theme.primary500, theme.primary600],
    legend: {
      show: true,
      fontFamily: 'Roboto',
      fontSize: '12px',
      position: 'bottom',
      horizontalAlign: 'center',
      formatter: function (seriesName: string, opts: any) {
        return [
          `${Math.round(
            (opts.w.globals.series[opts.seriesIndex] / totalVotes) * 100,
          )}% ${seriesName}`,
        ];
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
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return null;
      },
      followCursor: false,
      style: {
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
    },
  };
  const series = [data?.likes, data?.dislikes];
  const labels = ['Me gusta', 'No me gusta'];

  return (
    <Card header={cardHeader}>
      <StyledBox
        css={{ justifyContent: 'center', width: '100%', height: '100%', alignContent: 'center' }}
      >
        {(!data?.likes && !data?.dislikes) || isLoading || isError ? (
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
                top: '51px',
                left: '92px',
              }}
            >
              <StyledText
                variant="body1"
                color="primary500"
                style={{ fontSize: '22px', textAlign: 'center' }}
              >
                {totalVotes}
              </StyledText>
              <StyledText variant="body2" color="gray900" css={{ fontSize: '14px' }}>
                {'Opiniones'}
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
