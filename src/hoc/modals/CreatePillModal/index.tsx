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
import { Autocomplete } from '../../../components/Autocomplete';

interface CreatePillModalProps extends ModalProps {
  openModal?: boolean;
}
interface Professor {
  name: string;
  lastname: string;
  profession: string;
  description: string;
  image: string;
}

const CreatePillModal = ({ handleOnClose }: CreatePillModalProps) => {
  const [convertQuery, { data, isLoading, error: convertError, isSuccess }] =
    useConvertToLerniPillMutation();
  const [professor, setProfessor] = useState<string>('');
  const [inputValues, setInputValues] = useState<{
    name: string;
    description: string;
    file: any;
    completionTimeMinutes: string;
  }>({
    name: '',
    description: '',
    file: null,
    completionTimeMinutes: '5',
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    file: false,
    completionTimeMinutes: false,
  });

  const [refetch, { data: profData, isLoading: isLoadingProf }] = useLazyGetProfessorsQuery();
  const [professorsList, setProfessorsList] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    refetch({ page: 1 });
  }, []);

  useEffect(() => {
    if (profData?.total) {
      [...Array(profData.total - 1)].forEach((_, index) => {
        refetch({ page: index + 1 }).then((res) => {
          if (res.data?.result) {
            setProfessorsList((prev) => [
              ...prev,
              ...res.data.result.map((prof: any) => ({
                id: prof.id,
                text: `${prof.name} ${prof.lastname}`,
              })),
            ]);
          }
        });
      });
    }
  }, [profData?.total]);

  const { data: professors } = useGetProfessorsQuery(
    { page: 1 },
    {
      selectFromResult: (res: any) => {
        return {
          ...res,
          data: {
            ...res.data,
            result: res?.data?.result.map((prof: any) => ({
              id: prof.id,
              text: `${prof.name} ${prof.lastname}`,
            })),
          },
        };
      },
    },
  );
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
    errors.description ||
    errors.file ||
    !inputValues.name ||
    !inputValues.description ||
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
        description: inputValues.description,
        teacherId: professor,
        lerniPill: JSON,
        completionTimeMinutes: Number(inputValues.completionTimeMinutes),
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
      <StyledColumn css={{ height: '580px', width: '100%', gap: '16px' }}>
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
        <Autocomplete
          label={'Profesor'}
          value={professor}
          placeholder={'Profesor del programa'}
          content={professorsList ?? []}
          onChange={(val) => {
            setProfessor(val);
          }}
          css={{ fontSize: 14 }}
        />
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
        <TextInput
          placeholder="Duración en minutos"
          title="Duración de la píldora"
          value={inputValues.completionTimeMinutes}
          onChange={(value) => handleChange('completionTimeMinutes', value)}
          error={errors.completionTimeMinutes}
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
