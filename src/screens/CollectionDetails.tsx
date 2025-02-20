import React, { useEffect } from 'react';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import Button from '../components/styled/Button';
import CollectionDetailsComponent from '../components/collection/CollectionDetails';
import { ComponentVariantType } from '../utils/constants';
import { useTheme } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLDispatch, useLSelector } from '../redux/hooks';
import { api } from '../redux/service/api';
import {
  useAddStudentsToCollectionMutation,
  useCollectionDetailsQuery,
  useCreateCollectionMutation,
  useDeleteStudentsFromCollectionMutation,
  useUpdateCollectionMutation,
} from '../redux/service/collection.service';
import { resetCollectionSlice } from '../redux/slices/collection.slice';
import CollectionPrograms from '../components/collection/CollectionPrograms';
import { CollectionStudents } from '../components/collection/CollectionStudents';
import {
  transformDeleteStudentsRequest,
  transformAddStudentsRequest,
  getUpdatedAndDeletedStudents,
} from '../utils/transformBody';
import { errorToast, successToast } from '../components/Toasts';
import { useMeQuery } from '../redux/service/auth.service';
import { usePermissions } from '../utils/permissions';
import { closeModal, setModalOpen } from '../redux/slices/utils.slice';
import { isLoading } from '../redux/slices/collection.slice';
import CollectionStatistics from '../components/collection/CollectionStatistics';

const CollectionDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useLDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const collection = useLSelector((state) => state.collection);
  const { data: meData, isError: meError } = useMeQuery();

  const { canOnlyReadCollection } = usePermissions();
  const canOnlyRead = canOnlyReadCollection();

  const [updateCollection, { isError, error, isSuccess }] = useUpdateCollectionMutation();
  const [
    addStudents,
    {
      isError: isStudentError,
      error: studentsError,
      data: studentData,
      isSuccess: studentsSuccess,
      isLoading: studentsLoading,
    },
  ] = useAddStudentsToCollectionMutation();

  const [
    deleteStudents,
    {
      isError: isDeleteStudentError,
      error: deleteStudentError,
      data: deleteStudentData,
      isSuccess: deleteStudentSuccess,
      isLoading: deleteLoading,
    },
  ] = useDeleteStudentsFromCollectionMutation();

  const {
    data,
    isError: collectionError,
    isLoading: collectionLoading,
  } = useCollectionDetailsQuery(id as string);

  useEffect(() => {
    dispatch(isLoading(collectionLoading));
  }, []);

  const handleSave = () => {
    if (!id) return;
    console.log('saving...');
    dispatch(setModalOpen({ modalType: 'LOADER', closable: false }));

    const studentsUpdates = getUpdatedAndDeletedStudents(
      collection.studentsState.initial,
      collection.studentsState.current,
    );

    console.log('studentsUpdates', studentsUpdates);

    const promises = [];

    if (studentsUpdates.updated.length > 0) {
      promises.push(
        addStudents({
          id,
          body: transformAddStudentsRequest(collection, studentsUpdates.updated),
        }),
      );
    }

    if (studentsUpdates.deleted.length > 0) {
      promises.push(
        deleteStudents({
          id,
          emails: transformDeleteStudentsRequest(studentsUpdates.deleted),
        }),
      );
    }

    if (promises.length === 0) {
      successfulReturn();
      return;
    }

    Promise.all(promises)
      .then(() => {
        successfulReturn();
      })
      .catch(() => {
        errorToast('Hubo un problema al modificar la colección.');
        dispatch(closeModal());
      });
  };

  const successfulReturn = () => {
    navigate('/');
    dispatch(closeModal());
    dispatch(resetCollectionSlice());
    successToast('Colección modificada exitosamente!');
  };

  useEffect(() => {
    if (collectionError) {
      errorToast('La colección no existe');
      navigate('/');
    }
  }, [collectionError]);

  return (
    <StyledBox css={{ height: '100%' }}>
      <StyledRow
        css={{
          width: '100%',
          height: '66px',
          background: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledText variant="h2">Detalles de la colección</StyledText>
      </StyledRow>

      <StyledColumn
        css={{
          background: theme.gray200,
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <StyledColumn
          css={{
            marginTop: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '32px',
          }}
        >
          <CollectionDetailsComponent />
          <CollectionStatistics />
          <CollectionPrograms />
          <CollectionStudents collectionId={id} />
          {!canOnlyRead && (
            <Button
              variant={ComponentVariantType.PRIMARY}
              onClick={handleSave}
              labelSize={'body3'}
              css={{
                marginTop: '8px',
                width: 'auto',
                height: '30px',
                padding: '8px 16px 8px 16px',
                fontFamily: 'Roboto-Bold',
                cursor: 'pointer',
              }}
            >
              Guardar
            </Button>
          )}
        </StyledColumn>
      </StyledColumn>
    </StyledBox>
  );
};

export default CollectionDetails;
