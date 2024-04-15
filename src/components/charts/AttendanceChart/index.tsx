import React from 'react';
import { StyledBox, StyledColumn, StyledText } from '../../styled/styles';
import { useTheme } from 'styled-components';
import { Card } from '../Card';
import Chart from 'react-apexcharts';
import { useGetProgramLikesQuery } from '../../../redux/service/program.service';
import { LikesResponse } from '../../../redux/service/types/program.types';

interface AttendanceChartProps {
  programId: string;
}

export const AttendanceChart = ({ programId }: AttendanceChartProps) => {
  const theme = useTheme();
  const data = {
    finished: 9,
    studying: 15,
    notStarted: 2,
  };

  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h1" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {'Completitud'}
      </StyledText>
      <StyledText variant="body2" color="gray700">
        {'Alumnos cursando el programa'}
      </StyledText>
    </StyledColumn>
  );

  // if (isError || isLoading || !data) {
  //   return null;
  // }

  const totalStudents = (data.finished || 0) + (data.notStarted || 0) + (data.studying || 0);

  //Chart styling and labeling.
  const options = {
    labels: ['Terminaron', 'En progreso', 'Sin empezar'],
    colors: [theme.primary500, theme.primary600, theme.gray300],
    legend: {
      show: true,
      fontFamily: 'Roboto',
      fontSize: '12px',
      position: 'right',
      horizontalAlign: 'left',

      itemMargin: {
        horizontal: -10,
        vertical: 4,
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
            (opts.w.globals.series[opts.seriesIndex] / totalStudents) * 100,
          )}% ${seriesName}`,
        ];
      },
      style: {
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
    },
  };
  const series = [data.finished, data.studying, data.notStarted];
  const labels = ['Terminaron', 'En progreso', 'Sin empezar'];

  return (
    <Card header={cardHeader}>
      <StyledBox
        css={{ justifyContent: 'center', width: '100%', height: '100%', alignContent: 'center' }}
      >
        {!data.notStarted && !data.studying && !data.finished ? (
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
                top: '48px',
                left: '52px',
              }}
            >
              <StyledText
                variant="body1"
                color="primary500"
                css={{ fontSize: '22px', textAlign: 'center' }}
              >
                {totalStudents}
              </StyledText>
              <StyledText variant="body2" color="gray900">
                {'Alumnos'}
              </StyledText>
            </StyledColumn>
            {/* it ignores type errors over apex charts legends position and horizontalAlign */}
            {/* @ts-ignore */}
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="donut"
              width="82%"
            />
          </StyledBox>
        )}
      </StyledBox>
    </Card>
  );
};