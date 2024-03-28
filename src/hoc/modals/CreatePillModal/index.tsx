import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { TextInput } from '../../../components/styled/TextInput';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';
import { fileToJSONText } from '../../../utils/utils';
import { useConvertToLerniPillMutation } from '../../../redux/api/program.service';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { addNewPill } from '../../../redux/slices/program.slice';
import { ConvertTypeResponse } from '../../../redux/api/types/program.types';
import { nanoid } from '@reduxjs/toolkit';
import { errorToast, successToast } from '../../../components/Toasts';

interface CreatePillModalProps extends ModalProps {
  openModal?: boolean;
}

const CreatePillModal = ({ handleOnClose }: CreatePillModalProps) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [inputValues, setInputValues] = useState<{
    name: string;
    instructor: string;
    description: string;
    file: any;
  }>({
    name: '',
    instructor: '',
    description: '',
    file: null,
  });
  const [errors, setErrors] = useState({
    name: false,
    instructor: false,
    description: false,
    file: false,
  });
  const dispatch = useLDispatch();
  useEffect(() => {
    if (convertError) errorToast('Algo salió mal, revisa el formato del csv/xlsx');
  }, [convertError]);
  useEffect(() => {
    if (isSuccess) {
      successToast('El archivo csv/xlsx se ha cargado con exito!');
    }
  }, [isSuccess]);

  const isConfirmButtonDisabled =
    errors.name ||
    errors.instructor ||
    errors.description ||
    errors.file ||
    !inputValues.name ||
    !inputValues.description ||
    !inputValues.instructor ||
    !inputValues.file;

  const handleChange = (att: keyof typeof inputValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [att]: value,
    }));
  };

  const handleInputFileChange = (value: any) => {
    if (value?.type !== 'application/json') setErrors((prev) => ({ ...prev, file: true }));
    else setErrors((prev) => ({ ...prev, file: false }));
    setInputValues((prev) => ({
      ...prev,
      file: value,
    }));
  };

  const handleSavePill = async () => {
    const JSON = await fileToJSONText(inputValues.file);
    const response = (await convertQuery({ thread: JSON })) as { data: ConvertTypeResponse };
    if (response?.data !== undefined) {
      dispatch(
        addNewPill({
          id: nanoid(),
          title: inputValues.name,
          description: inputValues.description,
          lerniPill: response.data?.pillBlock,
        }),
      );
      handleOnClose();
    }
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
          Cargar píldora
        </StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar la píldora del programa
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
        // this prevents the card to intefere with the onClose modal functionality
        event.stopPropagation();
      }}
      css={{
        height: 'fit-content',
        width: '568px',
        zIndex: 30,
      }}
    >
      <StyledColumn css={{ height: '400px', width: '100%', gap: '16px' }}>
        <StyledRow
          css={{
            width: '100%',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <TextInput
            placeholder="Nombre de la píldora"
            title="Nombre"
            value={inputValues.name}
            onChange={(value) => handleChange('name', value)}
            error={errors.name}
            required
            disabled={isLoading}
          />
          <TextInput
            placeholder="Nombre del instructor"
            title="Instructor"
            value={inputValues.instructor}
            onChange={(value) => handleChange('instructor', value)}
            error={errors.instructor}
            disabled={isLoading}
            required
          />
        </StyledRow>
        <TextInput
          placeholder="Descripción de la píldora"
          title="Descripción"
          value={inputValues.description}
          onChange={(value) => handleChange('description', value)}
          error={errors.description}
          css={{ height: '100px' }}
          multiline
          disabled={isLoading}
          required
        />
        <FileUpload
          title="Cargar JSON"
          value={inputValues.file}
          onChange={(value) => handleInputFileChange(value)}
          error={errors.file}
          fileExtensionAllowed=".json"
          required
        />
        <StyledRow
          css={{
            marginTop: '16px',
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
            disabled={isConfirmButtonDisabled || isLoading}
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

export default CreatePillModal;
