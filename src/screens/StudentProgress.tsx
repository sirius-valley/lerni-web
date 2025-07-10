import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import { useCollectionDetailsQuery } from '../redux/service/collection.service';
import { useCollectionStudentsQuery } from '../redux/service/students.service';
import { CollectionStudent } from '../redux/service/types/students.response';
import { errorToast } from '../components/Toasts';
import Card from '../components/Card';
import Loader from '../components/styled/Loader';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';
import CsvManagementModal from '../hoc/modals/CsvManagementModal';
import { store } from '../redux/store';
import { studentsApi } from '../redux/service/students.service';

type ViewMode = 'progress' | 'grade';

type ProgressStatus = 'No comenzado' | 'Progreso' | 'Terminado' | 'No asignado';

interface StudentProgressData {
  student: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    certificateId?: string;
  };
  programs: {
    [programId: string]: {
      status: ProgressStatus;
      grade?: number;
      passed?: boolean;
      progress?: number;
    };
  };
}

const StudentProgress = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('progress');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [allStudents, setAllStudents] = useState<CollectionStudent[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const batchSize = 100;
  const listRef = useRef<any>(null);
  const scrollTopRef = useRef(0);
  const lastProcessedDataRef = useRef<string>(''); // Track last processed data to prevent duplicates
  const [loadRequestInProgress, setLoadRequestInProgress] = useState(false); // Track if a load request is in progress
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null); // Debounce for scroll events
  const globalQueryLockRef = useRef(false); // Global lock to prevent any query from running

  // Debounce para el término de búsqueda
  useEffect(() => {
    // Si el campo está vacío, actualizar inmediatamente
    if (!searchTerm || searchTerm.trim() === '') {
      setDebouncedSearchTerm('');
      return;
    }

    // Para texto no vacío, aplicar debounce
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: collectionData,
    isError: collectionError,
    isLoading: collectionLoading,
  } = useCollectionDetailsQuery(collectionId as string);

  // Query RTK para cargar estudiantes con paginación
  const queryParams = {
    collectionId: collectionId as string,
    limit: batchSize,
    offset: currentOffset,
    ...(debouncedSearchTerm.trim() && { search: debouncedSearchTerm.trim().toLowerCase() }),
  };

  const shouldSkipQuery = !collectionId || globalQueryLockRef.current;

  const {
    data: studentsData,
    isLoading: studentsLoading,
    isError: studentsError,
    error: studentsErrorData,
    refetch,
  } = useCollectionStudentsQuery(queryParams, {
    skip: shouldSkipQuery,
    refetchOnMountOrArgChange: true, // This will refetch when query params change
  });

  // Efecto para manejar la carga de datos
  useEffect(() => {
    if (studentsData?.students) {
      // Crear una clave única para estos datos
      const dataKey = `${currentOffset}-${studentsData.students.length}-${
        studentsData.students[0]?.id || 'empty'
      }`;
      // Verificar si ya procesamos estos datos exactos
      if (lastProcessedDataRef.current === dataKey) {
        return;
      }
      // Marcar estos datos como procesados
      lastProcessedDataRef.current = dataKey;
      // Crear un nuevo array con IDs únicos para forzar re-render
      const newStudents = studentsData.students.map((student) => ({ ...student }));
      if (currentOffset === 0) {
        setAllStudents(newStudents);
      } else {
        setAllStudents((prev) => {
          const existingIds = new Set(prev.map((student) => student.id));
          const uniqueNewStudents = newStudents.filter((student) => !existingIds.has(student.id));
          return [...prev, ...uniqueNewStudents];
        });
      }
      // Verificar si hay más páginas
      const hasMore =
        studentsData.students.length === batchSize &&
        currentOffset + batchSize < (studentsData.total || 0);
      setHasNextPage(hasMore);
      setIsLoadingMore(false);
      setLoadRequestInProgress(false); // Reset the load request flag
      globalQueryLockRef.current = false; // Release global lock
      // Restore scroll position for infinite scroll
      if (listRef.current) {
        const targetRow = Math.floor(scrollTopRef.current / 60);
      }
    }
  }, [studentsData, currentOffset, batchSize]);

  // Log adicional para ver cuando cambia allStudents

  // Reset cuando cambia la búsqueda o colección
  useEffect(() => {
    // Clear any pending scroll debounce
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
      scrollDebounceRef.current = null;
    }
    // Release global lock
    globalQueryLockRef.current = false;
    setCurrentOffset(0);
    setHasNextPage(true);
    setIsLoadingMore(false);
    setLoadRequestInProgress(false); // Reset load request flag
    scrollTopRef.current = 0; // Reset scroll position for new search
    lastProcessedDataRef.current = ''; // Reset processed data tracking
    // No limpiar allStudents aquí - dejar que se limpie cuando lleguen nuevos datos
  }, [debouncedSearchTerm, collectionId]);

  useEffect(() => {
    if (collectionError) {
      errorToast('Error al cargar los datos de la colección');
      navigate('/');
    }
    if (studentsError) {
      errorToast('Error al cargar los datos de estudiantes');
      // Release global lock on error
      globalQueryLockRef.current = false;
      navigate('/');
    }
  }, [collectionError, studentsError, studentsErrorData, navigate]);

  // Mapear estados de la API a nuestros tipos locales
  const mapApiStatusToLocal = (apiStatus: string): ProgressStatus => {
    // Normalizar el estado (trim y lowercase para ser más tolerante)
    const normalizedStatus = apiStatus?.toString().trim().toLowerCase();

    switch (normalizedStatus) {
      case 'completed':
        return 'Terminado';
      case 'in_progress':
      case 'in progress':
      case 'progress':
        return 'Progreso';
      case 'not_started':
      case 'not started':
      case 'not_begin':
        return 'No comenzado';
      case 'not_assigned':
      case 'not assigned':
      case 'unassigned':
        return 'No asignado';
      default:
        return 'No asignado';
    }
  };

  // Convertir datos de la API al formato de la tabla
  const convertApiDataToTableFormat = (): StudentProgressData[] => {
    if (!allStudents || !collectionData?.programs) return [];

    return allStudents.map((student: CollectionStudent) => {
      const programs: {
        [key: string]: {
          status: ProgressStatus;
          grade?: number;
          passed?: boolean;
          progress?: number;
        };
      } = {};

      // Safety check: ensure student.programs is an array
      const studentPrograms = Array.isArray(student.programs) ? student.programs : [];

      // Crear mapas por programId Y por programName para mayor flexibilidad
      const studentProgramsByIdMap = studentPrograms.reduce(
        (acc, program) => {
          acc[program.programId] = program;
          return acc;
        },
        {} as Record<string, CollectionStudent['programs'][0]>,
      );

      const studentProgramsByNameMap = studentPrograms.reduce(
        (acc, program) => {
          acc[program.programName] = program;
          return acc;
        },
        {} as Record<string, CollectionStudent['programs'][0]>,
      );

      // Mapear cada programa de la colección
      collectionData.programs.forEach((collectionProgram) => {
        // Intentar mapear por ID primero, luego por nombre
        let studentProgram = studentProgramsByIdMap[collectionProgram.id];
        if (!studentProgram) {
          studentProgram = studentProgramsByNameMap[collectionProgram.program.name];
        }

        if (studentProgram) {
          // El estudiante tiene este programa asignado
          const mappedStatus = mapApiStatusToLocal(studentProgram.status);

          programs[collectionProgram.id] = {
            status: mappedStatus,
            grade: studentProgram.grade,
            passed: studentProgram.passed,
            progress: studentProgram.progress,
          };
        } else {
          // El estudiante no tiene este programa asignado
          programs[collectionProgram.id] = {
            status: 'No asignado',
            grade: undefined,
            passed: undefined,
            progress: undefined,
          };
        }
      });

      return {
        student: {
          id: student.id,
          name: student.name,
          lastname: student.lastname,
          email: student.email,
          certificateId: student.certificateId,
        },
        programs,
      };
    });
  };

  const progressData = useMemo(() => {
    const result = convertApiDataToTableFormat();
    return result;
  }, [allStudents, collectionData?.programs]);

  // Calcular el ancho total de la tabla
  const tableWidth = useMemo(() => {
    const fixedColumnsWidth = 60 + 200 + 250; // # + Estudiante + Email
    const programColumnsWidth = (collectionData?.programs.length || 0) * 180;
    return fixedColumnsWidth + programColumnsWidth; // Sin padding extra
  }, [collectionData?.programs.length]);

  // Función para verificar si un estudiante completó todos sus programas asignados
  const hasCompletedAllAssignedPrograms = (
    studentPrograms: StudentProgressData['programs'],
  ): boolean => {
    const assignedPrograms = Object.values(studentPrograms).filter(
      (program) => program.status !== 'No asignado',
    );
    if (assignedPrograms.length === 0) return false; // Si no tiene programas asignados, no está "completado"
    return assignedPrograms.every((program) => program.status === 'Terminado');
  };

  // Función para abrir el certificado
  const handleOpenCertificate = (certificateId: string) => {
    // URL del certificado en S3
    const certificateUrl = `https://lerni-assets.s3.us-east-1.amazonaws.com/certificates/${certificateId}.pdf`;
    window.open(certificateUrl, '_blank');
  };

  // Función para cargar más estudiantes (infinite scroll)
  const loadMoreStudents = useCallback(() => {
    // Check if global lock is active
    if (globalQueryLockRef.current) {
      return;
    }
    if (!hasNextPage) {
      return;
    }
    // Set global lock to prevent any other queries
    globalQueryLockRef.current = true;
    setCurrentOffset((prev) => {
      const newOffset = prev + batchSize;
      return newOffset;
    });
  }, [hasNextPage, batchSize, currentOffset]);

  // Función para detectar cuando el usuario llega al final del scroll
  const handleScroll = useCallback(
    ({
      scrollTop,
      scrollHeight,
      clientHeight,
    }: {
      scrollTop: number;
      scrollHeight: number;
      clientHeight: number;
    }) => {
      scrollTopRef.current = scrollTop;
      // Si hay una query ejecutándose (lock global), no procesar scroll events
      if (globalQueryLockRef.current) {
        return;
      }
      // Detectar cuando estamos cerca del final (con un margen de 200px para ser más permisivo)
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;
      // Clear any existing debounce timer
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
        scrollDebounceRef.current = null;
      }
      // Only set up debounce if we're near bottom and conditions are met
      if (isNearBottom && hasNextPage && !globalQueryLockRef.current) {
        scrollDebounceRef.current = setTimeout(() => {
          loadMoreStudents();
          scrollDebounceRef.current = null;
        }, 200); // 200ms debounce
      }
    },
    [hasNextPage, loadMoreStudents],
  );

  // Debug: Log when handleScroll is recreated
  useEffect(() => {}, [hasNextPage, isLoadingMore, studentsLoading, loadRequestInProgress]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clear any pending timers when component unmounts
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
        scrollDebounceRef.current = null;
      }
      // Release global lock
      globalQueryLockRef.current = false;
    };
  }, []);

  // Componente de fila virtualizada para react-virtualized
  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const studentData = progressData[index];
    if (!studentData || !collectionData) return null;

    const isAllCompleted = hasCompletedAllAssignedPrograms(studentData.programs);

    return (
      <div key={key} style={style}>
        <StyledRow
          css={{
            padding: '12px 16px',
            borderBottom: `1px solid ${theme.gray200}`,
            background: index % 2 === 0 ? theme.white : theme.gray50,
            minWidth: tableWidth,
            width: '100%',
            height: '60px',
            alignItems: 'center',
            '&:hover': {
              background: theme.gray100,
            },
          }}
        >
          <StyledBox
            css={{ width: '60px', minWidth: '60px', padding: '0 8px', textAlign: 'center' }}
          >
            <StyledText variant="body2" css={{ fontWeight: 'bold', color: theme.gray600 }}>
              {index + 1}
            </StyledText>
          </StyledBox>
          <StyledBox css={{ width: '200px', minWidth: '200px', padding: '0 8px' }}>
            {isAllCompleted && studentData.student.certificateId ? (
              <StyledText
                variant="body2"
                css={{
                  color: theme.success,
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => handleOpenCertificate(studentData.student.certificateId!)}
              >
                {studentData.student.name || ''} {studentData.student.lastname || ''}
              </StyledText>
            ) : (
              <StyledText
                variant="body2"
                css={{
                  color: isAllCompleted ? theme.success : 'inherit',
                  fontWeight: isAllCompleted ? 'bold' : 'normal',
                }}
              >
                {studentData.student.name || ''} {studentData.student.lastname || ''}
              </StyledText>
            )}
          </StyledBox>
          <StyledBox css={{ width: '250px', minWidth: '250px', padding: '0 8px' }}>
            <StyledText variant="body3" css={{ color: theme.gray600 }}>
              {studentData.student.email || ''}
            </StyledText>
          </StyledBox>
          {collectionData.programs.map((program) => {
            const programProgress = studentData.programs[program.id];
            return (
              <StyledBox
                key={program.id}
                css={{
                  width: '180px',
                  minWidth: '180px',
                  padding: '0 8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {viewMode === 'progress' ? (
                  <StyledBox
                    css={{
                      padding: '6px 12px',
                      borderRadius: '16px',
                      background: getStatusBackground(programProgress.status),
                      border: `1px solid ${getStatusColor(programProgress.status)}`,
                      minWidth: '100px',
                      textAlign: 'center',
                    }}
                  >
                    <StyledText
                      variant="body3"
                      css={{
                        color: getStatusColor(programProgress.status),
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {programProgress.status}
                    </StyledText>
                  </StyledBox>
                ) : (
                  <StyledColumn css={{ alignItems: 'center', gap: '4px' }}>
                    <StyledText
                      variant="body2"
                      css={{
                        textAlign: 'center',
                        color:
                          programProgress.status === 'Terminado' &&
                          programProgress.grade !== undefined
                            ? programProgress.passed
                              ? theme.success
                              : theme.error
                            : theme.gray400,
                        fontWeight:
                          programProgress.status === 'Terminado' &&
                          programProgress.grade !== undefined
                            ? 'bold'
                            : 'normal',
                        fontSize: '16px',
                      }}
                    >
                      {programProgress.status === 'Terminado' && programProgress.grade !== undefined
                        ? `${programProgress.grade}`
                        : programProgress.status === 'No asignado'
                          ? '-'
                          : 'Sin nota'}
                    </StyledText>
                    {programProgress.status === 'Terminado' &&
                      programProgress.grade !== undefined && (
                        <StyledText
                          variant="body3"
                          css={{
                            textAlign: 'center',
                            color: programProgress.passed ? theme.success : theme.error,
                            fontSize: '10px',
                            fontWeight: '500',
                          }}
                        >
                          {programProgress.passed ? 'Aprobado' : 'Reprobado'}
                        </StyledText>
                      )}
                  </StyledColumn>
                )}
              </StyledBox>
            );
          })}
        </StyledRow>
      </div>
    );
  };

  const getStatusColor = (status: ProgressStatus) => {
    switch (status) {
      case 'Terminado':
        return theme.success;
      case 'Progreso':
        return theme.primary400;
      case 'No comenzado':
        return theme.warning;
      case 'No asignado':
        return theme.gray400;
      default:
        return theme.gray400;
    }
  };

  const getStatusBackground = (status: ProgressStatus) => {
    switch (status) {
      case 'Terminado':
        return `${theme.success}20`;
      case 'Progreso':
        return `${theme.primary400}20`;
      case 'No comenzado':
        return `${theme.warning}20`;
      case 'No asignado':
        return `${theme.gray200}`;
      default:
        return theme.gray200;
    }
  };

  // Función para traer todos los estudiantes sin límites de paginación
  const fetchAllStudents = useCallback(
    async (onProgress?: (message: string) => void): Promise<any[]> => {
      onProgress?.('Iniciando carga de todos los estudiantes...');
      // Set global lock to prevent other queries
      globalQueryLockRef.current = true;
      try {
        const allStudents: any[] = [];
        let offset = 0;
        const batchSize = 500;
        let hasMore = true;
        let batchCount = 0;
        while (hasMore) {
          batchCount++;
          onProgress?.(
            `Cargando batch ${batchCount} (${allStudents.length} estudiantes cargados hasta ahora)...`,
          );
          // Query parameters for this batch
          const batchParams = {
            collectionId: collectionId as string,
            limit: batchSize,
            offset: offset,
            ...(debouncedSearchTerm.trim() && { search: debouncedSearchTerm.trim().toLowerCase() }),
          };
          // Use RTK Query service directly to fetch this batch
          const result = await store.dispatch(
            studentsApi.endpoints.collectionStudents.initiate(batchParams),
          );
          if (result.error) {
            throw new Error(`Error fetching students batch: ${result.error}`);
          }
          const batchStudents = result.data?.students || [];
          // Add students to the total array
          allStudents.push(...batchStudents);
          // Check if there are more students
          hasMore = batchStudents.length === batchSize;
          offset += batchSize;
          // Small delay to avoid overwhelming the server
          if (hasMore) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }
        onProgress?.(
          `✅ Carga completada: ${allStudents.length} estudiantes cargados en ${batchCount} batches`,
        );
        return allStudents;
      } catch (error) {
        onProgress?.('❌ Error al cargar los estudiantes');
        throw error;
      } finally {
        // Release global lock
        globalQueryLockRef.current = false;
      }
    },
    [collectionId, debouncedSearchTerm],
  );

  // Si hay error de colección, navegar hacia atrás
  if (collectionError) {
    navigate('/');
    return null;
  }

  return (
    <StyledBox css={{ height: '100vh', background: theme.gray200 }}>
      {/* Header */}
      <StyledRow
        css={{
          width: '100%',
          height: '66px',
          background: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.gray200}`,
        }}
      >
        <StyledText variant="h2">
          Progreso de Estudiantes -{' '}
          {collectionData?.name || (collectionLoading ? 'Cargando...' : 'Sin datos')}
        </StyledText>
      </StyledRow>

      <StyledColumn css={{ padding: '24px', gap: '24px', height: 'calc(100vh - 66px)' }}>
        {/* Progress Table */}
        <Card
          css={{
            padding: 0,
            width: '100%',
            maxWidth: '100vw',
            overflow: 'visible',
            borderRadius: '16px',
          }}
          headerComponent={
            <StyledRow
              css={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '16px 16px',
              }}
            >
              {/* Search Bar - Left */}
              <StyledBox css={{ width: '350px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    paddingRight: '40px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.gray300}`,
                    fontSize: '14px',
                    fontFamily: 'Roboto, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.primary400;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.gray300;
                  }}
                />
                {/* Indicador de búsqueda activa */}
                {(searchTerm !== debouncedSearchTerm ||
                  (studentsLoading && debouncedSearchTerm)) && (
                  <StyledBox
                    css={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '16px',
                      height: '16px',
                      border: `2px solid ${theme.gray300}`,
                      borderTopColor: theme.primary400,
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                )}
              </StyledBox>

              {/* Excel and View Mode Controls - Right */}
              <StyledRow css={{ gap: '16px', alignItems: 'center' }}>
                {/* CSV Management Button */}
                <Button
                  variant={ComponentVariantType.PRIMARY}
                  onClick={() => setShowCsvModal(true)}
                  labelSize={ButtonLabelSize.BODY3}
                  css={{
                    height: '32px',
                    padding: '6px 12px',
                    fontSize: '12px',
                  }}
                >
                  Gestionar CSV
                </Button>

                {/* Separator */}
                <StyledBox css={{ width: '1px', height: '24px', background: theme.gray300 }} />

                {/* View Mode Switch */}
                <StyledText variant="body3" css={{ color: theme.gray600 }}>
                  Vista:
                </StyledText>
                <StyledText
                  variant="body2"
                  css={{
                    color: viewMode === 'progress' ? theme.primary400 : theme.gray500,
                    fontWeight: viewMode === 'progress' ? 'bold' : 'normal',
                  }}
                >
                  Progreso
                </StyledText>
                <StyledBox
                  css={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: viewMode === 'grade' ? theme.primary400 : theme.gray300,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => setViewMode(viewMode === 'progress' ? 'grade' : 'progress')}
                >
                  <StyledBox
                    css={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: theme.white,
                      position: 'absolute',
                      top: '2px',
                      left: viewMode === 'grade' ? '22px' : '2px',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </StyledBox>
                <StyledText
                  variant="body2"
                  css={{
                    color: viewMode === 'grade' ? theme.primary400 : theme.gray500,
                    fontWeight: viewMode === 'grade' ? 'bold' : 'normal',
                  }}
                >
                  Notas
                </StyledText>
              </StyledRow>
            </StyledRow>
          }
        >
          <StyledBox css={{ width: '100%', overflowX: 'auto' }}>
            <StyledColumn css={{ minWidth: `${tableWidth}px`, width: '100%' }}>
              {/* Table Header */}
              <StyledRow
                css={{
                  background: theme.gray100,
                  padding: '16px',
                  borderBottom: `1px solid ${theme.gray200}`,
                  fontWeight: 'bold',
                  minWidth: `${tableWidth}px`,
                  width: 'calc(100% + 32px)',
                  margin: '0 -16px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                }}
              >
                <StyledBox
                  css={{ width: '60px', minWidth: '60px', padding: '0 8px', textAlign: 'center' }}
                >
                  <StyledText variant="body2" css={{ fontWeight: 'bold' }}></StyledText>
                </StyledBox>
                <StyledBox css={{ width: '200px', minWidth: '200px', padding: '0 8px' }}>
                  <StyledText variant="body2" css={{ fontFamily: 'Roboto-Bold' }}>
                    Nombre y Apellido
                  </StyledText>
                </StyledBox>
                <StyledBox css={{ width: '250px', minWidth: '250px', padding: '0 8px' }}>
                  <StyledText variant="body2" css={{ fontFamily: 'Roboto-Bold' }}>
                    Correo Electrónico
                  </StyledText>
                </StyledBox>
                {collectionData?.programs?.map((program) => (
                  <StyledBox
                    key={program.id}
                    css={{
                      width: '180px',
                      minWidth: '180px',
                      padding: '0 8px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <StyledText
                      variant="body2"
                      css={{
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                        wordBreak: 'break-word',
                        lineHeight: '1.2',
                      }}
                    >
                      {program.program.name}
                    </StyledText>
                  </StyledBox>
                ))}
              </StyledRow>

              {/* Virtualized Table Body */}
              <StyledBox css={{ height: '70vh', minWidth: tableWidth }}>
                {progressData.length > 0 ? (
                  <StyledColumn css={{ height: '100%' }}>
                    <StyledBox css={{ flex: 1 }}>
                      <AutoSizer>
                        {({ height, width }) => (
                          <List
                            ref={listRef}
                            key={`${debouncedSearchTerm}`} // Only re-render on search change, not on data change
                            height={height}
                            rowCount={
                              progressData.length +
                              (hasNextPage && (isLoadingMore || studentsLoading) ? 1 : 0)
                            }
                            rowHeight={60}
                            onScroll={handleScroll}
                            scrollToAlignment="start"
                            overscanRowCount={5}
                            rowRenderer={({ index, key, style }) => {
                              // Si es la última fila y hay más páginas cargando, mostrar loader
                              if (
                                index === progressData.length &&
                                hasNextPage &&
                                (isLoadingMore || studentsLoading)
                              ) {
                                return (
                                  <div key={key} style={style}>
                                    <StyledRow
                                      css={{
                                        padding: '12px 16px',
                                        borderBottom: `1px solid ${theme.gray200}`,
                                        background: theme.white,
                                        minWidth: tableWidth,
                                        width: '100%',
                                        height: '60px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <StyledBox
                                        css={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                      >
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
                                        <StyledText variant="body3" css={{ color: theme.gray600 }}>
                                          Cargando más estudiantes...
                                        </StyledText>
                                      </StyledBox>
                                    </StyledRow>
                                  </div>
                                );
                              }

                              // Renderizar fila normal de estudiante
                              return rowRenderer({ index, key, style });
                            }}
                            width={Math.max(width, tableWidth)}
                            style={{
                              outline: 'none',
                              scrollbarWidth: 'thin',
                            }}
                          />
                        )}
                      </AutoSizer>
                    </StyledBox>
                  </StyledColumn>
                ) : studentsLoading ? (
                  <StyledBox
                    css={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '200px',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <StyledBox
                      css={{
                        width: '24px',
                        height: '24px',
                        border: `3px solid ${theme.gray300}`,
                        borderTopColor: theme.primary400,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    <StyledText variant="body2" css={{ color: theme.gray600 }}>
                      {debouncedSearchTerm ? 'Buscando...' : 'Cargando estudiantes...'}
                    </StyledText>
                  </StyledBox>
                ) : (
                  <StyledBox
                    css={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '200px',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <StyledText variant="h3" css={{ color: theme.gray500 }}>
                      {debouncedSearchTerm
                        ? 'No se encontraron resultados'
                        : 'No hay estudiantes disponibles'}
                    </StyledText>
                    <StyledText variant="body2" css={{ color: theme.gray400 }}>
                      {debouncedSearchTerm
                        ? 'Intenta con otro término de búsqueda'
                        : 'No hay estudiantes registrados en esta colección'}
                    </StyledText>
                  </StyledBox>
                )}
              </StyledBox>
            </StyledColumn>
          </StyledBox>
        </Card>
      </StyledColumn>

      {/* CSV Management Modal */}
      <CsvManagementModal
        show={showCsvModal}
        onClose={() => setShowCsvModal(false)}
        studentsData={progressData}
        programs={collectionData?.programs || []}
        onFetchAllStudents={fetchAllStudents}
      />
    </StyledBox>
  );
};

export default StudentProgress;
