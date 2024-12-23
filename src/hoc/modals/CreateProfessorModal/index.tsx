import React, { useEffect, useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { TextInput } from '../../../components/styled/TextInput';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useCreateProfessorMutation } from '../../../redux/service/professor.service';
import { errorToast, successToast } from '../../../components/Toasts';
import { useTheme } from 'styled-components';

interface CreateProfessorModalProps extends ModalProps {
  openModal?: boolean;
}

const CreateProfessorModal = ({ handleOnClose }: CreateProfessorModalProps) => {
  const [createProfessor, { data: isLoading, error: createError, isSuccess }] =
    useCreateProfessorMutation();

  const theme = useTheme();

  const [inputValues, setInputValues] = useState<{
    name: string;
    lastname: string;
    profession: string;
    description: string;
    image: any;
  }>({
    name: '',
    lastname: '',
    profession: '',
    description: '',
    image: null,
  });

  const isConfirmButtonDisabled =
    !inputValues.name ||
    !inputValues.lastname ||
    !inputValues.description ||
    !inputValues.profession ||
    !inputValues.image;

  const handleChange = (att: keyof typeof inputValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [att]: value,
    }));
  };

  const handleCreateProfessor = () => {
    createProfessor(inputValues);
  };

  useEffect(() => {
    if (isSuccess) {
      successToast('El profesor se ha creado con exito!');
      handleOnClose();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (createError) errorToast('Algo salió mal, revisa los campos nuevamente');
  }, [createError]);

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
          Crear Profesor
        </StyledText>
        <StyledText variant="body2">
          En esta sección se deberá cargar los datos para crear un profesor.
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
      <StyledColumn css={{ height: '400px', width: '100%', gap: '16px' }}>
        <StyledRow
          css={{
            width: '100%',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <TextInput
            placeholder="Nombre del profesor"
            title="Nombre"
            value={inputValues.name}
            onChange={(value) => handleChange('name', value)}
            required
            disabled={isLoading}
          />
          <TextInput
            placeholder="Apellido del profesor"
            title="Apellido"
            value={inputValues.lastname}
            onChange={(value) => handleChange('lastname', value)}
            disabled={isLoading}
            required
          />
        </StyledRow>
        <TextInput
          placeholder="Profesión del profesor"
          title="Profesión"
          value={inputValues.profession}
          onChange={(value) => handleChange('profession', value)}
          maxLength={50}
          disabled={isLoading}
          required
        />
        <TextInput
          placeholder="Descripción del profesor"
          title="Descripción"
          value={inputValues.description}
          onChange={(value) => handleChange('description', value)}
          maxLength={50}
          disabled={isLoading}
          required
        />

        <StyledRow css={{ gap: '12px', height: '70px' }}>
          {inputValues.image ? (
            <img
              src={inputValues.image}
              style={{
                height: '70px',
                width: '70px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <StyledBox
              css={{
                height: '70px',
                width: '70px',
                borderRadius: '8px',
                background: theme.gray300,
              }}
            />
          )}
          <StyledRow css={{ width: '440px' }}>
            <TextInput
              placeholder="Link de la foto"
              title="Link de imagen"
              value={inputValues.image}
              onChange={(value) => handleChange('image', value)}
              disabled={isLoading}
              required
            />
          </StyledRow>
        </StyledRow>
        <StyledRow
          css={{
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
            onClick={handleCreateProfessor}
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

export default CreateProfessorModal;
