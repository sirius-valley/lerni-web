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
import { useConvertToLerniPillMutation } from '../../../redux/service/program.service';
import { useLDispatch, useLSelector } from '../../../redux/hooks';
import { addNewPill } from '../../../redux/slices/program.slice';
import { ConvertTypeResponse } from '../../../redux/service/types/program.types';
import { nanoid } from '@reduxjs/toolkit';
import { errorToast, successToast } from '../../../components/Toasts';
import { Dropdown } from '../../../components/Dropdown';
import {
  useGetProfessorsQuery,
  useLazyGetProfessorsQuery,
} from '../../../redux/service/professor.service';
import { AutocompleteComponent } from '../../../components/Autocomplete';

interface CreatePillModalProps extends ModalProps {
  openModal?: boolean;
}

const mockedGroups = [
  { id: 'g1', text: 'Frontend Masters' },
  { id: 'g2', text: 'Backend Gurus' },
  { id: 'g3', text: 'UI Designers' },
  { id: 'g4', text: 'Chess Club' },
  { id: 'g5', text: 'Science Club' },
  { id: 'g6', text: 'Robotics Team' },
  { id: 'g7', text: 'Art Enthusiasts' },
  { id: 'g8', text: 'Sports Club' },
  { id: 'g9', text: 'Music Band' },
  { id: 'g10', text: 'Debate Team' },
  { id: 'g11', text: 'Literature Club' },
  { id: 'g12', text: 'Gaming Club' },
];

const CreatePillModal = ({ handleOnClose }: CreatePillModalProps) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [selectedGroups, setSelectedGroups] = useState<{ id: string; text: string }[]>([]);
  const [inputValues, setInputValues] = useState<{
    name: string;
    file: any;
  }>({
    name: '',
    file: null,
  });
  const [errors, setErrors] = useState({
    name: false,
    file: false,
  });

  const [refetch, { data: profData, isLoading: isLoadingProf }] = useLazyGetProfessorsQuery();

  useEffect(() => {
    refetch({ page: 1 });
  }, []);

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
    errors.file ||
    selectedGroups.length === 0 ||
    !inputValues.name ||
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
    // const response = (await convertQuery({ thread: JSON })) as { data: ConvertTypeResponse };
    // if (response?.data !== undefined) {
    dispatch(
      addNewPill({
        id: nanoid(),
        title: inputValues.name,
        lerniPill: JSON,
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
      <StyledColumn css={{ height: 'fit-content', width: '100%', gap: '16px' }}>
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
        </StyledRow>
        <AutocompleteComponent
          label={'Grupos'}
          value={selectedGroups}
          placeholder={'Seleccione grupo objetivo'}
          content={mockedGroups}
          multiple
          allowNewOptions
          setMultipleValues={(values) => setSelectedGroups(values)}
          css={{ fontSize: 14 }}
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
