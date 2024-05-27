import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import { ShowIcon } from '../../../assets/icons/ShowIcon';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { useTheme } from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import TrashIcon from '../../../assets/icons/TrashIcon';
import EllipseIcon from '../../../assets/icons/EllipseIcon';
import { QuestionnaireIcon } from '../../../assets/icons/QuestionnaireIcon';
import { useStudentsProgressQuery } from '../../../redux/service/program.service';
import { useParams } from 'react-router-dom';

type StudentsStatusModalProps = ModalProps;

const StudentsStatusModal = ({ handleOnClose }: StudentsStatusModalProps) => {
  const dispatch = useLDispatch();
  const theme = useTheme();
  const { id } = useParams();
  const studentId = useLSelector((state) => state.utils.metadata.studentId);
  const { data: program, isLoading } = useStudentsProgressQuery(id ?? '');

  const resultsToShow = program?.find((student) => student.id === studentId);
  console.log(resultsToShow);

  if (!studentId || !program || !resultsToShow) return null;

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold' }}>
          {`${resultsToShow.name} ${resultsToShow.lastname}`}
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
        {resultsToShow.pills.map(({ name, progress }, index) => (
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
                      stroke: '#18BAC8',
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
                  value={progress}
                  text={String(index + 1)}
                />
              </StyledBox>
              <StyledText
                variant="h4"
                css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {name}
              </StyledText>
            </StyledRow>
            <StyledRow
              css={{
                padding: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <StyledColumn css={{ alignItems: 'center', justifyContent: 'center' }}>
                <StyledText variant="body2" color="gray900">{`${progress}%`}</StyledText>
              </StyledColumn>
            </StyledRow>
          </StyledRow>
        ))}
        <StyledRow style={{ justifyContent: 'space-between', padding: '6px 0px 6px 6px' }}>
          <StyledRow style={{ gap: '6px', alignItems: 'center' }}>
            <QuestionnaireIcon size={18} color={theme.gray300} />
            <StyledText variant="h4" style={{ fontSize: 14, color: theme.primary950 }}>
              Cuestionario
            </StyledText>
            <StyledRow css={{ alignItems: 'center', gap: '6px' }}>
              <StyledText color="gray300" variant="body2" css={{ fontSize: '8px' }}>
                ●
              </StyledText>
              <StyledText variant="body2" color="gray300">{`${0} Intentos`}</StyledText>
            </StyledRow>
          </StyledRow>
          <StyledBox
            css={{
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <StyledText variant="body2" color="gray900">{`${0}/${10}`}</StyledText>
          </StyledBox>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default StudentsStatusModal;
