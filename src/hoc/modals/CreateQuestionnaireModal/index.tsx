import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { fileToJSONText } from '../../../utils/utils';
import { useConvertToLerniPillMutation } from '../../../redux/service/program.service';
import { useLDispatch } from '../../../redux/hooks';
import { addNewPill } from '../../../redux/slices/program.slice';
import { ConvertTypeResponse } from '../../../redux/service/types/program.types';
import { nanoid } from '@reduxjs/toolkit';
import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';
import { updatePillInfo } from '../../../redux/slices/program.slice';
import { TextInput } from '../../../components/styled/TextInput';

interface CreateQuestionnaireModalProps extends ModalProps {
  openModal?: boolean;
}

const CreateQuestionnaireModal = ({ handleOnClose }: CreateQuestionnaireModalProps) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [inputValues, setInputValues] = useState<{
    file: any;
    passsingScore: string;
    cooldownInMinutes: string;
    completionTimeMinutes: string;
  }>({
    file: null,
    passsingScore: '25',
    cooldownInMinutes: '10',
    completionTimeMinutes: '8',
  });
  const [errors, setErrors] = useState(false);
  const dispatch = useLDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (convertError) errorToast('Algo salió mal, revisa el formato del JSON');
  }, [convertError]);
  useEffect(() => {
    if (isSuccess) successToast('El archivo JSON se ha cargado con exito!');
  }, [isSuccess]);

  const handleInputFileChange = (value: any) => {
    if (value?.type !== 'application/json') setErrors(true);
    else setErrors(false);
    setInputValues((prev) => ({
      ...prev,
      file: value,
    }));
  };

  const handleChange = (att: keyof typeof inputValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [att]: value,
    }));
  };

  const handleSavePill = async () => {
    const JSON = await fileToJSONText(inputValues.file);
    // const response = (await convertQuery({ thread: JSON })) as { data: ConvertTypeResponse };
    // if (response?.data !== undefined) {
    dispatch(
      updatePillInfo({
        questionnaire: {
          questionnaire: JSON,
          passsingScore: inputValues.passsingScore,
          cooldownInMinutes: inputValues.cooldownInMinutes,
          completionTimeMinutes: inputValues.completionTimeMinutes,
        },
      }),
    );

    handleOnClose();
    // }
  };

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
          Cargar cuestionario
        </StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar el cuestionario del programa
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
        <TextInput
          placeholder="Cantidad de puntos (5 por pregunta)"
          title="Puntos para aprobar"
          value={inputValues.passsingScore}
          onChange={(value) => handleChange('passsingScore', value)}
          // error={errors.passsingScore}
          disabled={isLoading}
          required
        />
        <TextInput
          placeholder="Tiempo de penalizacion"
          title="Tiempo de penalizacion (minutos)"
          value={inputValues.cooldownInMinutes}
          onChange={(value) => handleChange('cooldownInMinutes', value)}
          // error={errors.completionTimeMinutes}
          disabled={isLoading}
          required
        />
        <TextInput
          placeholder="Duración en minutos"
          title="Duración del cuestionario (minutos)"
          value={inputValues.completionTimeMinutes}
          onChange={(value) => handleChange('completionTimeMinutes', value)}
          // error={errors.completionTimeMinutes}
          disabled={isLoading}
          required
        />
        <FileUpload
          title="Cargar JSON"
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
            disabled={errors || isLoading || !inputValues.file}
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

export default CreateQuestionnaireModal;
