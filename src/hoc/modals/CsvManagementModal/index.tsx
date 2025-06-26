import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../../../components/styled/styles';
import Button from '../../../components/styled/Button';
import { ComponentVariantType } from '../../../utils/constants';
import { ButtonLabelSize } from '../../../components/styled/Button/styles';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CsvUpload from '../../../components/CsvUpload';
import {
  readStudentCsv,
  exportProgressToCsv,
  mergeStudentData,
  StudentCsvRow,
} from '../../../utils/csvUtils';
import { exportGradesToCsv } from '../../../utils/csvUtils';

interface CsvManagementModalProps {
  show: boolean;
  onClose: () => void;
  studentsData: any[];
  programs: any[];
  onMergeData?: (mergedData: any[]) => void;
  onFetchAllStudents?: (onProgress?: (message: string) => void) => Promise<any[]>;
}

const CsvManagementModal: React.FC<CsvManagementModalProps> = ({
  show,
  onClose,
  studentsData = [],
  programs = [],
  onMergeData,
  onFetchAllStudents,
}) => {
  const theme = useTheme();
  const [uploadedStudents, setUploadedStudents] = useState<StudentCsvRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'export'>('upload');
  const [allStudentsData, setAllStudentsData] = useState<any[]>([]);
  const [loadingAllStudents, setLoadingAllStudents] = useState(false);
  const [fetchProgress, setFetchProgress] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError('');

    try {
      const students = await readStudentCsv(file);
      setUploadedStudents(students);
      console.log('Estudiantes cargados:', students);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo');
      setUploadedStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMergeData = async () => {
    if (uploadedStudents.length === 0) {
      setError('No hay datos de Excel para hacer el merge');
      return;
    }

    setLoading(true);

    try {
      // Use allStudentsData if available, otherwise use studentsData
      const dataToMerge = allStudentsData.length > 0 ? allStudentsData : studentsData;
      console.log('🔄 Haciendo merge con', dataToMerge.length, 'estudiantes');

      const mergedData = mergeStudentData(dataToMerge, uploadedStudents);

      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `datos-mergeados-progreso-${timestamp}.csv`;

      await exportProgressToCsv(mergedData, programs, fileName, (message) => {
        setFetchProgress(message);
      });

      console.log('CSV con datos mergeados (progreso) descargado exitosamente');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al hacer el merge de datos');
    } finally {
      setLoading(false);
      setFetchProgress('');
    }
  };

  const handleMergeDataWithGrades = async () => {
    if (uploadedStudents.length === 0) {
      setError('No hay datos de Excel para hacer el merge');
      return;
    }

    setLoading(true);

    try {
      // Use allStudentsData if available, otherwise use studentsData
      const dataToMerge = allStudentsData.length > 0 ? allStudentsData : studentsData;
      console.log('🔄 Haciendo merge con notas usando', dataToMerge.length, 'estudiantes');

      const mergedData = mergeStudentData(dataToMerge, uploadedStudents);

      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `datos-mergeados-notas-${timestamp}.csv`;

      await exportGradesToCsv(mergedData, programs, fileName, (message) => {
        setFetchProgress(message);
      });

      console.log('CSV con datos mergeados (notas) descargado exitosamente');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al hacer el merge de datos');
    } finally {
      setLoading(false);
      setFetchProgress('');
    }
  };

  const handleExportData = async () => {
    setLoading(true);

    try {
      await exportProgressToCsv(
        studentsData,
        programs,
        `progreso-estudiantes-${new Date().toISOString().split('T')[0]}.csv`,
        (message) => {
          setFetchProgress(message);
        },
      );

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al exportar el archivo');
    } finally {
      setLoading(false);
      setFetchProgress('');
    }
  };

  const handleClose = () => {
    setUploadedStudents([]);
    setError('');
    setActiveTab('upload');
    setAllStudentsData([]);
    setFetchProgress('');
    onClose();
  };

  // Automatically fetch all students when modal opens
  useEffect(() => {
    if (show && onFetchAllStudents && allStudentsData.length === 0) {
      handleFetchAllStudents();
    }
  }, [show, onFetchAllStudents]);

  const handleFetchAllStudents = async () => {
    if (!onFetchAllStudents) {
      setError('Función para traer todos los estudiantes no disponible');
      return;
    }

    setLoadingAllStudents(true);
    setError('');
    setFetchProgress('Iniciando carga de todos los estudiantes...');

    try {
      console.log('🔄 Iniciando carga de todos los estudiantes...');
      const allStudents = await onFetchAllStudents((message) => {
        setFetchProgress(message);
      });
      setAllStudentsData(allStudents);
      setFetchProgress('');
      console.log('✅ Todos los estudiantes cargados:', allStudents.length);
    } catch (err) {
      console.error('❌ Error al cargar todos los estudiantes:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar todos los estudiantes');
      setFetchProgress('');
    } finally {
      setLoadingAllStudents(false);
    }
  };

  if (!show) return null;

  return (
    <StyledBox
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <StyledBox
        css={{
          backgroundColor: theme.white,
          borderRadius: '12px',
          padding: '24px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <StyledRow
          css={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}
        >
          <StyledText variant="h2" css={{ color: theme.gray900, fontWeight: 'bold' }}>
            Gestión de Archivos CSV
          </StyledText>
          <StyledBox
            css={{
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              '&:hover': { backgroundColor: theme.gray100 },
            }}
            onClick={handleClose}
          >
            <CloseIcon size={20} color={theme.gray600} />
          </StyledBox>
        </StyledRow>

        {/* Tabs */}
        <StyledRow css={{ marginBottom: '24px', borderBottom: `1px solid ${theme.gray200}` }}>
          <StyledBox
            css={{
              padding: '12px 24px',
              cursor: 'pointer',
              borderBottom: activeTab === 'upload' ? `2px solid ${theme.primary400}` : 'none',
              color: activeTab === 'upload' ? theme.primary400 : theme.gray600,
              fontWeight: activeTab === 'upload' ? 'bold' : 'normal',
            }}
            onClick={() => setActiveTab('upload')}
          >
            Merge con CSV
          </StyledBox>
          <StyledBox
            css={{
              padding: '12px 24px',
              cursor: 'pointer',
              borderBottom: activeTab === 'export' ? `2px solid ${theme.primary400}` : 'none',
              color: activeTab === 'export' ? theme.primary400 : theme.gray600,
              fontWeight: activeTab === 'export' ? 'bold' : 'normal',
            }}
            onClick={() => setActiveTab('export')}
          >
            Exportar Datos
          </StyledBox>
        </StyledRow>

        {/* Error Display */}
        {error && (
          <StyledBox
            css={{
              backgroundColor: theme.error + '20',
              border: `1px solid ${theme.error}`,
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '16px',
            }}
          >
            <StyledText variant="body3" css={{ color: theme.error }}>
              {error}
            </StyledText>
          </StyledBox>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <StyledColumn css={{ gap: '20px' }}>
            <StyledColumn css={{ gap: '8px' }}>
              <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.gray700 }}>
                Merge con archivo CSV de estudiantes
              </StyledText>
              <StyledText variant="body3" css={{ color: theme.gray600 }}>
                Carga un archivo CSV con datos de estudiantes y descarga un nuevo CSV con los datos
                mergeados. El archivo debe contener las columnas: <strong>legajo</strong>,{' '}
                <strong>nombre</strong> y <strong>email</strong>
              </StyledText>
            </StyledColumn>

            <CsvUpload
              onFileSelect={handleFileSelect}
              loading={loading}
              label="Cargar CSV de estudiantes"
              description="Debe contener: legajo, nombre, email"
            />

            {/* Fetch All Students Button */}
            <StyledBox
              css={{
                backgroundColor: theme.gray50,
                border: `1px solid ${theme.gray200}`,
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <StyledColumn css={{ gap: '12px' }}>
                <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.gray700 }}>
                  📊 Datos de estudiantes para el merge
                </StyledText>

                {loadingAllStudents ? (
                  <StyledColumn css={{ gap: '8px' }}>
                    <StyledRow css={{ alignItems: 'center', gap: '8px' }}>
                      <StyledBox
                        css={{
                          width: '16px',
                          height: '16px',
                          border: `2px solid ${theme.gray300}`,
                          borderTopColor: theme.primary400,
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      <StyledText
                        variant="body3"
                        css={{ color: theme.primary400, fontWeight: 'bold' }}
                      >
                        Cargando todos los estudiantes...
                      </StyledText>
                    </StyledRow>
                    {fetchProgress && (
                      <StyledText
                        variant="body3"
                        css={{ color: theme.gray600, fontStyle: 'italic' }}
                      >
                        {fetchProgress}
                      </StyledText>
                    )}
                  </StyledColumn>
                ) : allStudentsData.length > 0 ? (
                  <StyledText variant="body3" css={{ color: theme.success, fontWeight: 'bold' }}>
                    ✅ {allStudentsData.length} estudiantes cargados automáticamente
                  </StyledText>
                ) : (
                  <StyledText variant="body3" css={{ color: theme.gray600 }}>
                    📋 Usando {studentsData.length} estudiantes (vista actual)
                  </StyledText>
                )}

                <StyledText variant="body3" css={{ color: theme.gray600 }}>
                  Los datos se cargan automáticamente en batches de 500 estudiantes para optimizar
                  el rendimiento.
                </StyledText>
              </StyledColumn>
            </StyledBox>

            {uploadedStudents.length > 0 && (
              <StyledColumn css={{ gap: '12px' }}>
                <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.success }}>
                  {uploadedStudents.length} estudiantes cargados correctamente
                </StyledText>

                <StyledBox
                  css={{
                    backgroundColor: theme.gray50,
                    borderRadius: '6px',
                    padding: '12px',
                    maxHeight: '200px',
                    overflow: 'auto',
                  }}
                >
                  {uploadedStudents.slice(0, 5).map((student, index) => (
                    <StyledRow
                      key={index}
                      css={{ justifyContent: 'space-between', padding: '4px 0' }}
                    >
                      <StyledText variant="body3">{student.nombre}</StyledText>
                      <StyledText variant="body3" css={{ color: theme.gray600 }}>
                        {student.email}
                      </StyledText>
                    </StyledRow>
                  ))}
                  {uploadedStudents.length > 5 && (
                    <StyledText
                      variant="body3"
                      css={{ color: theme.gray500, textAlign: 'center', paddingTop: '8px' }}
                    >
                      ... y {uploadedStudents.length - 5} más
                    </StyledText>
                  )}
                </StyledBox>

                <StyledBox
                  css={{
                    backgroundColor: theme.primary400 + '10',
                    border: `1px solid ${theme.primary400}`,
                    borderRadius: '6px',
                    padding: '12px',
                  }}
                >
                  <StyledText variant="body3" css={{ color: theme.primary400, fontWeight: 'bold' }}>
                    📋 Opciones de descarga:
                  </StyledText>
                  <StyledText variant="body3" css={{ color: theme.gray700 }}>
                    • <strong>Con Progreso:</strong> Estado, Nota y Resultado por programa
                  </StyledText>
                  <StyledText variant="body3" css={{ color: theme.gray700 }}>
                    • <strong>Con Notas:</strong> Nota, Resultado y Estado por programa
                  </StyledText>
                  <StyledText variant="body3" css={{ color: theme.gray700 }}>
                    • Datos actualizados del CSV (legajo, nombre)
                  </StyledText>
                  <StyledText variant="body3" css={{ color: theme.gray700 }}>
                    • {allStudentsData.length > 0 ? allStudentsData.length : studentsData.length}{' '}
                    estudiantes totales
                  </StyledText>
                </StyledBox>
              </StyledColumn>
            )}

            <StyledRow css={{ justifyContent: 'flex-end', gap: '12px' }}>
              <Button
                variant={ComponentVariantType.GHOST}
                onClick={handleClose}
                labelSize={ButtonLabelSize.BODY2}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                variant={ComponentVariantType.PRIMARY}
                onClick={handleMergeData}
                labelSize={ButtonLabelSize.BODY2}
                disabled={loading || uploadedStudents.length === 0}
                css={{ minWidth: '140px' }}
              >
                {loading
                  ? fetchProgress
                    ? fetchProgress
                    : 'Generando...'
                  : 'Descargar con Progreso'}
              </Button>
              <Button
                variant={ComponentVariantType.DARK}
                onClick={handleMergeDataWithGrades}
                labelSize={ButtonLabelSize.BODY2}
                disabled={loading || uploadedStudents.length === 0}
                css={{ minWidth: '140px' }}
              >
                {loading ? (fetchProgress ? fetchProgress : 'Generando...') : 'Descargar con Notas'}
              </Button>
            </StyledRow>
          </StyledColumn>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <StyledColumn css={{ gap: '20px' }}>
            <StyledColumn css={{ gap: '8px' }}>
              <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.gray700 }}>
                Exportar datos de progreso
              </StyledText>
              <StyledText variant="body3" css={{ color: theme.gray600 }}>
                Descarga un archivo CSV con toda la información de progreso de los estudiantes,
                incluyendo estados, notas y resultados por programa.
              </StyledText>
            </StyledColumn>

            <StyledBox
              css={{
                backgroundColor: theme.gray50,
                borderRadius: '6px',
                padding: '16px',
              }}
            >
              <StyledColumn css={{ gap: '8px' }}>
                <StyledText variant="body3" css={{ fontWeight: 'bold' }}>
                  El archivo incluirá:
                </StyledText>
                <StyledText variant="body3">• Datos básicos: Legajo, Nombre, Email</StyledText>
                <StyledText variant="body3">
                  • Por cada programa: Estado, Nota, Resultado
                </StyledText>
                <StyledText variant="body3">• {studentsData.length} estudiantes</StyledText>
                <StyledText variant="body3">• {programs.length} programas</StyledText>
              </StyledColumn>
            </StyledBox>

            <StyledRow css={{ justifyContent: 'flex-end', gap: '12px' }}>
              <Button
                variant={ComponentVariantType.GHOST}
                onClick={handleClose}
                labelSize={ButtonLabelSize.BODY2}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                variant={ComponentVariantType.PRIMARY}
                onClick={handleExportData}
                labelSize={ButtonLabelSize.BODY2}
                disabled={loading || studentsData.length === 0}
              >
                {loading ? 'Exportando...' : 'Descargar CSV'}
              </Button>
            </StyledRow>
          </StyledColumn>
        )}
      </StyledBox>
    </StyledBox>
  );
};

export default CsvManagementModal;
