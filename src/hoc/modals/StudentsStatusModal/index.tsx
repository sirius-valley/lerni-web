import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { useTheme } from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { QuestionnaireIcon } from '../../../assets/icons/QuestionnaireIcon';
import { useStudentsProgressQuery } from '../../../redux/service/program.service';
import Spinner from '../../../components/Spinner/Spinner';
import { TriviaIcon } from '../../../assets/icons/TriviaIcon';
import { api } from '../../../redux/service/api';

type StudentsStatusModalProps = ModalProps;

const StudentsStatusModal = ({ handleOnClose }: StudentsStatusModalProps) => {
  const dispatch = useLDispatch();
  const theme = useTheme();
  const studentId = useLSelector((state) => state.utils.metadata.studentId);
  const programVersionId = useLSelector((state) => state.utils.metadata.programVersionId);
  const {
    data: studentProgress,
    isLoading: studentProgressLoading,
    isFetching: studentProgressFetching,
  } = useStudentsProgressQuery({ programVersionId, studentId });

  const { student, pills, questionnaire, trivia, program } = studentProgress || {};

  const renderTriviaStatusLabel = () => {
    if (trivia?.status === 'Won') return 'Ganó';
    if (trivia?.status === 'Lost') return 'Perdió';
    if (trivia?.status === 'Tied') return 'Empató';
    if (trivia?.status === 'Waiting') return 'Esperando';
    if (['Challenged', 'Not Started'].includes(trivia?.status ?? '')) return 'Sin empezar';
    return 'En progreso';
  };

  useEffect(() => {
    return () => {
      dispatch(api.util.invalidateTags(['StudentsProgress']));
    };
  }, []);

  if (!studentId || !studentProgress || studentProgressFetching || studentProgressLoading)
    return <Spinner />;

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          {`${student?.name} ${student?.lastname}`}
        </StyledText>
        <StyledText variant="body2">{`Participando en ${'Programa 1'}`}</StyledText>
      </StyledColumn>
      <StyledBox onClick={() => handleOnClose()} css={{ padding: 8, cursor: 'pointer' }}>
        <CloseIcon />
      </StyledBox>
    </StyledRow>
  );

  return (
    <Card
      headerComponent={cardHeader()}
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        height: 'fit-content',
        width: '568px',
        zIndex: 30,
      }}
    >
      <StyledColumn css={{ gap: '6px', marginTop: '12px', overflowY: 'scroll', maxHeight: '422' }}>
        {/* Pills */}
        {pills?.map(({ pillName, pillProgress }, index) => (
          <StyledRow
            key={index}
            css={{
              justifyContent: 'space-between',
              padding: '8px 0px 4px 0px',
              marginLeft: '6px',
              borderBottom: `1px solid ${theme.gray200}`,
            }}
          >
            <StyledRow
              style={{
                gap: '6px',
                alignItems: 'center',
              }}
            >
              <StyledBox
                css={{
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgressbar
                  styles={{
                    root: {
                      display: 'flex',
                    },
                    path: {
                      stroke: theme.primary500,
                      strokeLinecap: 'butt',
                      transition: 'none',
                    },
                    trail: {
                      stroke: '#D3DDEB',
                      strokeLinecap: 'butt',
                    },
                    text: {
                      fontFamily: 'Roboto-bold',
                      fill: '#000000',
                      fontSize: '60px',
                      fontWeight: 600,
                    },
                  }}
                  maxValue={1}
                  strokeWidth={12}
                  value={pillProgress}
                  text={String(index + 1)}
                />
              </StyledBox>
              <StyledText
                variant="h4"
                css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {pillName}
              </StyledText>
            </StyledRow>
            <StyledRow
              css={{
                padding: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10%',
              }}
            >
              <StyledText variant="body2" color="gray900">{`${pillProgress}%`}</StyledText>
            </StyledRow>
          </StyledRow>
        ))}

        {/* Cuestionario */}
        <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
          <StyledRow style={{ gap: '6px', alignItems: 'center', flex: 1 }}>
            <StyledBox
              css={{
                height: '24px',
                width: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QuestionnaireIcon
                size={18}
                color={questionnaire?.progress === 100 ? theme.primary500 : theme.gray300}
              />
            </StyledBox>
            <StyledRow css={{ flex: 1, gap: '4px' }}>
              <StyledText variant="h4" color="primary950" style={{ fontSize: 14, flex: 1 }}>
                Cuestionario {program?.name}
              </StyledText>

              <StyledRow
                css={{
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  width: '20%',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <StyledText
                  color={questionnaire?.progress === 100 ? 'primary900' : 'gray300'}
                  variant="body2"
                  style={{ fontSize: '8px', display: 'flex' }}
                >
                  ●
                </StyledText>
                <StyledText
                  variant="body2"
                  color={questionnaire?.progress === 100 ? 'primary900' : 'gray300'}
                >
                  {questionnaire?.attempts} {questionnaire?.attempts === 1 ? 'Intento' : 'Intentos'}
                </StyledText>
              </StyledRow>
            </StyledRow>
          </StyledRow>
          <StyledRow
            css={{
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10%',
            }}
          >
            <StyledText variant="body2" color="gray900">
              {questionnaire?.correctAnswers}/{questionnaire?.questionCount}
            </StyledText>
          </StyledRow>
        </StyledRow>

        {/* Trivia */}
        <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
          <StyledRow style={{ gap: '6px', alignItems: 'center' }}>
            <StyledBox
              css={{
                height: '24px',
                width: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TriviaIcon
                size={18}
                color={
                  ['Won', 'Lost', 'Tied'].includes(trivia?.status ?? '')
                    ? theme.primary500
                    : theme.gray300
                }
              />
            </StyledBox>
            <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
              Trivia
            </StyledText>
            <StyledRow css={{ alignItems: 'center', gap: '6px' }}>
              <StyledText color="gray300" variant="body2" css={{ fontSize: '8px' }}>
                ●
              </StyledText>
              <StyledText variant="body2" color="gray300">
                {renderTriviaStatusLabel()}
              </StyledText>
            </StyledRow>
          </StyledRow>
          <StyledRow
            css={{
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10%',
            }}
          >
            <StyledText variant="body2" color="gray900">
              {trivia?.correctAnswers}/{trivia?.totalQuestions}
            </StyledText>
          </StyledRow>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default StudentsStatusModal;
