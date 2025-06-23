import React from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useTheme } from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ConfirmStudentsChangesModalProps extends ModalProps {
  addedStudents: any[];
  deletedStudents: any[];
  onConfirm: () => void;
}

const ConfirmStudentsChangesModal = ({
  handleOnClose,
  addedStudents,
  deletedStudents,
  onConfirm,
}: ConfirmStudentsChangesModalProps) => {
  const theme = useTheme();

  const accordionStyles = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      padding: 0,
      minHeight: '32px',
    },
    '& .MuiAccordionDetails-root': {
      padding: '8px 0 0 0',
    },
    '&.Mui-expanded': {
      margin: 0,
    },
  };

  const accordionSummaryStyles = {
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(0deg)',
      marginRight: '-8px',
    },
    '& .Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(180deg)',
    },
  };

  return (
    <Card
      headerComponent={
        <StyledRow
          css={{
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '24px',
            borderBottom: `1px solid ${theme.gray300}`,
            paddingBottom: '16px',
          }}
        >
          <StyledColumn css={{ gap: '8px' }}>
            <StyledText variant="h1" css={{ fontFamily: 'Roboto-Bold', color: theme.gray900 }}>
              Confirmar cambios
            </StyledText>
            <StyledText variant="body2" css={{ color: theme.gray600 }}>
              Se han realizado los siguientes cambios en la lista de estudiantes
            </StyledText>
          </StyledColumn>
          <StyledBox
            onClick={handleOnClose}
            css={{
              padding: 8,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.gray200,
                borderRadius: '4px',
              },
            }}
          >
            <CloseIcon />
          </StyledBox>
        </StyledRow>
      }
      onClick={(event) => {
        event.stopPropagation();
      }}
      css={{
        width: '600px',
        zIndex: 30,
        padding: '32px',
        maxHeight: '80vh',
        overflowY: 'auto',
        gap: '0px',
      }}
      height={'min-content'}
    >
      <StyledColumn css={{ width: '100%', gap: '16px' }}>
        {addedStudents.length > 0 && (
          <Accordion defaultExpanded sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={accordionSummaryStyles}>
              <StyledRow css={{ gap: '8px', alignItems: 'center' }}>
                <StyledBox
                  css={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: theme.success,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StyledText
                    variant="body3"
                    css={{ color: theme.white, fontFamily: 'Roboto-Bold' }}
                  >
                    +
                  </StyledText>
                </StyledBox>
                <StyledText variant="h3" css={{ color: theme.gray900, fontFamily: 'Roboto-Bold' }}>
                  Estudiantes a agregar ({addedStudents.length})
                </StyledText>
              </StyledRow>
            </AccordionSummary>
            <AccordionDetails>
              <StyledColumn
                css={{
                  gap: '8px',
                  backgroundColor: theme.gray100,
                  padding: '16px',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {addedStudents.map((student, index) => (
                  <StyledText key={index} variant="body2" css={{ color: theme.gray700 }}>
                    • {student.email}
                  </StyledText>
                ))}
              </StyledColumn>
            </AccordionDetails>
          </Accordion>
        )}

        {deletedStudents.length > 0 && (
          <Accordion defaultExpanded sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={accordionSummaryStyles}>
              <StyledRow css={{ gap: '8px', alignItems: 'center' }}>
                <StyledBox
                  css={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: theme.error,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StyledText
                    variant="body3"
                    css={{ color: theme.white, fontFamily: 'Roboto-Bold' }}
                  >
                    -
                  </StyledText>
                </StyledBox>
                <StyledText variant="h3" css={{ color: theme.gray900, fontFamily: 'Roboto-Bold' }}>
                  Estudiantes a eliminar ({deletedStudents.length})
                </StyledText>
              </StyledRow>
            </AccordionSummary>
            <AccordionDetails>
              <StyledColumn
                css={{
                  gap: '8px',
                  backgroundColor: theme.gray100,
                  padding: '16px',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {deletedStudents.map((student, index) => (
                  <StyledText key={index} variant="body2" css={{ color: theme.gray700 }}>
                    • {student.email}
                  </StyledText>
                ))}
              </StyledColumn>
            </AccordionDetails>
          </Accordion>
        )}

        <StyledRow
          css={{
            gap: '16px',
            justifyContent: 'flex-end',
            marginTop: '8px',
            borderTop: `1px solid ${theme.gray300}`,
            paddingTop: '24px',
          }}
        >
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={() => {
              onConfirm();
            }}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Confirmar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default ConfirmStudentsChangesModal;
