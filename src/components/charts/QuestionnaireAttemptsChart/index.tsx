import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../styled/styles';
import { Card } from '../Card';
import { useGetQuestionnaireAttemptsQuery } from '../../../redux/service/program.service';

interface ChartProps {
  programId: string;
}

export const QuestionnaireAttemptsChart = ({ programId }: ChartProps) => {
  const theme = useTheme();

  const { data, isLoading, isError } = useGetQuestionnaireAttemptsQuery(programId);

  const mockedData = [
    {
      attempts: 1,
      studentsQty: 1,
    },
    {
      attempts: 2,
      studentsQty: 8,
    },
    {
      attempts: 3,
      studentsQty: 12,
    },
  ];

  if (!data) return <></>;

  const totalStudents = data.reduce((total, item) => total + item.studentQty, 0);

  const cardHeader = (
    <StyledColumn css={{ padding: '0px 14px 7px', gap: '4px' }}>
      <StyledText variant="h1" color="gray900" css={{ fontFamily: 'Roboto' }}>
        {'Cuestionario'}
      </StyledText>
      <StyledText variant="body2" color="gray700">
        {'Resultados del cuestionario'}
      </StyledText>
    </StyledColumn>
  );

  const colors = [
    theme.primary500,
    theme.primary200,
    theme.primary600,
    theme.primary700,
    theme.gray300,
  ];
  const attempts = data.map((item) => item.attempts);
  const students = data.map((item) => item.studentQty);
  //Chart styling and labeling.
  const options = {
    chart: {
      height: 145,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '35%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      x: {
        formatter: function (seriesName: string, opts: any) {
          return `Cantidad de intentos: ${seriesName}`;
        },
      },
    },
    xaxis: {
      categories: attempts,
      labels: {
        style: {
          fontSize: '8px',
          color: theme.gray800,
        },
      },
    },
    yaxis: {
      categories: students,
      labels: {
        style: {
          fontSize: '8px',
          color: theme.gray800,
        },
      },
    },
  };

  const series = [
    {
      name: 'Cantidad de estudiantes',
      data: data.map((item) => item.studentQty),
    },
  ];

  return (
    <Card header={cardHeader}>
      <StyledBox
        css={{ justifyContent: 'center', width: '100%', height: '100%', alignContent: 'center' }}
      >
        {!data ? (
          <StyledText variant="body1" color="gray500" css={{ textAlign: 'center' }}>
            {'No hay datos'}
          </StyledText>
        ) : (
          <StyledBox
            css={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* it ignores type errors over apex charts legends position and horizontalAlign */}
            {/* @ts-ignore */}
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="bar"
              height={145}
            />

            <StyledRow
              css={{ position: 'absolute', top: '150px', left: '35px', right: '0px', gap: '18px' }}
            >
              <StyledText
                css={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: '8px' }}
                color="gray800"
              >
                {'Y: Cantidad de alumnos'}
              </StyledText>
              <StyledText
                css={{ fontFamily: 'Roboto', fontWeight: '400', fontSize: '8px' }}
                color="gray800"
              >
                {'X: Cantidad de intentos'}
              </StyledText>
            </StyledRow>
          </StyledBox>
        )}
      </StyledBox>
    </Card>
  );
};
