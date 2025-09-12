import React, { useState } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import { ModalProps } from '../interfaces';
import Card from '../../../components/Card';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { TextInput } from '../../../components/styled/TextInput';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { useTheme } from 'styled-components';
import { successToast, errorToast } from '../../../components/Toasts';
import { useCreateInstitutionMutation } from '../../../redux/service/institution.service';
import { usePermissions } from '../../../utils/permissions';

type CreateInstitutionModalProps = ModalProps;

const CreateInstitutionModal = ({ handleOnClose }: CreateInstitutionModalProps) => {
  const theme = useTheme();
  const { canCreateInstitution } = usePermissions();
  const [createInstitution, { isLoading, isError, isSuccess }] = useCreateInstitutionMutation();

  const [inputValues, setInputValues] = useState<{
    name: string;
    studentLimit: string;
    picture: string;
  }>({
    name: '',
    studentLimit: '',
    picture: '',
  });

  const isConfirmButtonDisabled =
    !inputValues.name ||
    !inputValues.studentLimit ||
    isNaN(Number(inputValues.studentLimit)) ||
    isLoading ||
    !canCreateInstitution();

  const handleChange = (att: keyof typeof inputValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [att]: value,
    }));
  };

  const handleCreateInstitution = async () => {
    try {
      await createInstitution({
        name: inputValues.name,
        studentLimit: Number(inputValues.studentLimit),
        picture: inputValues.picture,
      }).unwrap();
    } catch (e) {
      // Error is handled by isError state
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      successToast('La institución se ha creado con éxito!');
      handleOnClose();
    }
  }, [isSuccess, handleOnClose]);

  React.useEffect(() => {
    if (isError) {
      errorToast('Algo salió mal, revisa los campos nuevamente');
    }
  }, [isError]);

  // Don't render if user doesn't have permission to create institutions
  if (!canCreateInstitution()) {
    return null;
  }

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
          Crear Institución
        </StyledText>
        <StyledText variant="body2">
          Completa los datos para crear una nueva institución.
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
      <StyledColumn css={{ height: 'auto', width: '100%', gap: '16px' }}>
        <TextInput
          placeholder="Nombre de la institución"
          title="Nombre"
          value={inputValues.name}
          onChange={(value) => handleChange('name', value)}
          required
        />
        <TextInput
          placeholder="Límite de estudiantes"
          title="Límite de estudiantes"
          value={inputValues.studentLimit}
          onChange={(value) => handleChange('studentLimit', value.replace(/\D/g, ''))}
          required
        />

        <StyledRow css={{ gap: '12px', alignItems: 'center' }}>
          {inputValues.picture ? (
            <img
              src={inputValues.picture}
              style={{ height: '70px', width: '70px', borderRadius: '8px', objectFit: 'cover' }}
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
          <StyledRow css={{ flex: 1 }}>
            <TextInput
              placeholder="Link de la foto (opcional)"
              title="Link de imagen"
              value={inputValues.picture}
              onChange={(value) => handleChange('picture', value)}
            />
          </StyledRow>
        </StyledRow>

        <StyledRow css={{ width: '100%', gap: '16px', justifyContent: 'flex-end' }}>
          <Button
            variant={ComponentVariantType.GHOST}
            onClick={handleOnClose}
            css={{ paddingLeft: '50px', paddingRight: '50px' }}
          >
            Cancelar
          </Button>
          <Button
            variant={ComponentVariantType.PRIMARY}
            onClick={handleCreateInstitution}
            disabled={isConfirmButtonDisabled}
            css={{ paddingLeft: '50px', paddingRight: '50px' }}
          >
            {isLoading ? 'Creando...' : 'Agregar'}
          </Button>
        </StyledRow>
      </StyledColumn>
    </Card>
  );
};

export default CreateInstitutionModal;
