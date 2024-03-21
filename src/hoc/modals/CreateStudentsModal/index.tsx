import React, { useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { fileToJSONText } from '../../../utils/utils';
import { useConvertToLerniPillMutation } from '../../../redux/api/program.service';
import { useLDispatch } from '../../../redux/hooks';
import { addNewPill } from '../../../redux/slices/program.slice';
import { ConvertTypeResponse } from '../../../redux/api/types/program.types';
import { nanoid } from '@reduxjs/toolkit';
import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';

interface CreateStudentsModal extends ModalProps {
  openModal?: boolean;
}

const CreateStudentsModal = ({ handleOnClose }: CreateStudentsModal) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [inputValues, setInputValues] = useState<{
    file: any;
  }>({
    file: null,
  });
  const [errors, setErrors] = useState(false);

  const dispatch = useLDispatch();
  const theme = useTheme();

  const handleInputFileChange = (value: any) => {
    if (value?.type === 'application/csv' || value?.type === 'application/xlsx') setErrors(false);
    else setErrors(true);
    setInputValues({
      file: value,
    });
  };

  const handleSavePill = async () => {
    const JSON = await fileToJSONText(inputValues.file);
    const response = (await convertQuery({ thread: JSON })) as { data: ConvertTypeResponse };
    if (response?.data !== undefined) {
      dispatch(
        addNewPill({
          id: nanoid(),
          lerniPill: response.data?.pillBlock,
        }),
      );
      handleOnClose();
    }
  };

  if (convertError) errorToast('Algo salió mal, revisa el formato del csv/xlsx');
  if (isSuccess) successToast('El archivo csv/xlsx se ha cargado con exito!');

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
          Cargar Estudiantes
        </StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar los estudiantes del programa
        </StyledText>
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
      <StyledColumn css={{ width: '100%' }}>
        <StyledText
          variant="body2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            color: theme.gray600,
            fontFamily: 'Roboto-Bold',
          }}
        >
          Subir CSV o XLSX
        </StyledText>
        <FileUpload
          value={inputValues.file}
          onChange={(value) => handleInputFileChange(value)}
          error={errors}
          fileExtensionAllowed=".json"
        />
        <StyledRow
          css={{
            marginTop: '24px',
            width: '100%',
            gap: '16px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            disabled={isLoading}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={handleSavePill}
            disabled={errors || isLoading}
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Agregar
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default CreateStudentsModal;
