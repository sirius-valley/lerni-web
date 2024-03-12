import React, { useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { TextInput } from '../../../components/styled/TextInput';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import FileUpload from '../../../components/styled/FileUpload';

interface CreatePillModalProps extends ModalProps {
  openModal?: boolean;
}

const CreatePillModal = ({ handleOnClose }: CreatePillModalProps) => {
  const [inputValues, setInputValues] = useState<{
    name: string;
    instructor: string;
    description: string;
    studentMessage: string;
    file: any;
  }>({
    name: '',
    instructor: '',
    description: '',
    studentMessage: '',
    file: null,
  });
  const [errors, setErrors] = useState({
    name: false,
    instructor: false,
    description: false,
    studentMessage: false,
    file: false,
  });

  const isConfirmButtonDisabled =
    errors.name ||
    errors.instructor ||
    errors.description ||
    errors.studentMessage ||
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

  const cardHeader = () => (
    <StyledRow
      css={{
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <StyledColumn css={{ marginTop: '8px', gap: '12px' }}>
        <StyledText variant="h1" css={{ fontFamily: 'Roboto' }}>
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
      <StyledColumn css={{ height: '530px', width: '100%', gap: '16px' }}>
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
          />
          <TextInput
            placeholder="Nombre del instructor"
            title="Instructor"
            value={inputValues.instructor}
            onChange={(value) => handleChange('instructor', value)}
            error={errors.instructor}
            required
          />
        </StyledRow>
        <TextInput
          placeholder="Descripcion de la píldora"
          title="Descripcion"
          value={inputValues.description}
          onChange={(value) => handleChange('description', value)}
          error={errors.description}
          css={{ height: '100px' }}
          multiline
          required
        />
        <TextInput
          placeholder="Mensaje del profesor para los alumnos"
          title="Mensaje para el alumno"
          value={inputValues.studentMessage}
          onChange={(value) => handleChange('studentMessage', value)}
          error={errors.studentMessage}
          css={{ height: '80px' }}
          multiline
          required
        />
        <FileUpload
          title="Subir Json"
          value={inputValues.file}
          onChange={(value) => handleInputFileChange(value)}
          error={errors.file}
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
            css={{
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            Cancelar
          </Button>
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={() => alert(JSON.stringify(inputValues, null, 3))}
            disabled={isConfirmButtonDisabled}
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
