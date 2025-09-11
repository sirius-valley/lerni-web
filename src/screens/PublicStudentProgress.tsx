import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { StyledBox, StyledColumn, StyledRow, StyledText } from '../components/styled/styles';
import {
  usePublicCollectionDetailsQuery,
  usePublicCollectionStudentsQuery,
} from '../redux/service/public-collection.service';
import { CollectionStudent } from '../redux/service/types/students.response';
import { errorToast } from '../components/Toasts';
import Card from '../components/Card';
import Loader from '../components/styled/Loader';
import Button from '../components/styled/Button';
import { ComponentVariantType } from '../utils/constants';
import { ButtonLabelSize } from '../components/styled/Button/styles';

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

const PublicStudentProgress = () => {
  const theme = useTheme();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('progress');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [allStudents, setAllStudents] = useState<CollectionStudent[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const batchSize = 100;
  const listRef = useRef<any>(null);
  const scrollTopRef = useRef(0);
  const lastProcessedDataRef = useRef<string>('');
  const [loadRequestInProgress, setLoadRequestInProgress] = useState(false);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const globalQueryLockRef = useRef(false);

  // Debounce para el término de búsqueda
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setDebouncedSearchTerm('');
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // PUBLIC API: Cambiar solo esta parte para usar la API pública
  const {
    data: collectionData,
    isError: collectionError,
    isLoading: collectionLoading,
  } = usePublicCollectionDetailsQuery(collectionId as string);

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
  } = usePublicCollectionStudentsQuery(queryParams, {
    skip: shouldSkipQuery,
    refetchOnMountOrArgChange: true,
  });

  // Efecto para manejar la carga de datos
  useEffect(() => {
    if (studentsData?.students) {
      const dataKey = `${currentOffset}-${studentsData.students.length}-${
        studentsData.students[0]?.id || 'empty'
      }`;
      if (lastProcessedDataRef.current === dataKey) {
        return;
      }
      lastProcessedDataRef.current = dataKey;
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
      const hasMore =
        studentsData.students.length === batchSize &&
        currentOffset + batchSize < (studentsData.total || 0);
      setHasNextPage(hasMore);
      setIsLoadingMore(false);
      setLoadRequestInProgress(false);
      globalQueryLockRef.current = false;
    }
  }, [studentsData, currentOffset, batchSize]);

  // Reset cuando cambia la búsqueda o colección
  useEffect(() => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
      scrollDebounceRef.current = null;
    }
    globalQueryLockRef.current = false;
    setCurrentOffset(0);
    setHasNextPage(true);
    setIsLoadingMore(false);
    setLoadRequestInProgress(false);
    scrollTopRef.current = 0;
    lastProcessedDataRef.current = '';
  }, [debouncedSearchTerm, collectionId]);

  useEffect(() => {
    if (collectionError) {
      errorToast('Error al cargar los datos de la colección');
    }
    if (studentsError) {
      errorToast('Error al cargar los datos de estudiantes');
      globalQueryLockRef.current = false;
    }
  }, [collectionError, studentsError, studentsErrorData]);

  // Mapear estados de la API a nuestros tipos locales
  const mapApiStatusToLocal = (apiStatus: string): ProgressStatus => {
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

      const studentPrograms = Array.isArray(student.programs) ? student.programs : [];

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

      collectionData.programs.forEach((collectionProgram) => {
        let studentProgram = studentProgramsByIdMap[collectionProgram.id];
        if (!studentProgram) {
          studentProgram = studentProgramsByNameMap[collectionProgram.program.name];
        }

        if (studentProgram) {
          const mappedStatus = mapApiStatusToLocal(studentProgram.status);

          programs[collectionProgram.id] = {
            status: mappedStatus,
            grade: studentProgram.grade,
            passed: studentProgram.passed,
            progress: studentProgram.progress,
          };
        } else {
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
    const fixedColumnsWidth = 60 + 200 + 250;
    const programColumnsWidth = (collectionData?.programs.length || 0) * 180;
    return fixedColumnsWidth + programColumnsWidth;
  }, [collectionData?.programs.length]);

  // Función para verificar si un estudiante completó todos sus programas asignados
  const hasCompletedAllAssignedPrograms = (
    studentPrograms: StudentProgressData['programs'],
  ): boolean => {
    const assignedPrograms = Object.values(studentPrograms).filter(
      (program) => program.status !== 'No asignado',
    );
    if (assignedPrograms.length === 0) return false;
    return assignedPrograms.every((program) => program.status === 'Terminado');
  };

  // Función para abrir el certificado
  const handleOpenCertificate = (certificateId: string) => {
    const certificateUrl = `https://lerni-assets.s3.us-east-1.amazonaws.com/certificates/${certificateId}.pdf`;
    window.open(certificateUrl, '_blank');
  };

  // Función para cargar más estudiantes (infinite scroll)
  const loadMoreStudents = useCallback(() => {
    if (globalQueryLockRef.current) {
      return;
    }
    if (!hasNextPage) {
      return;
    }
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
      if (globalQueryLockRef.current) {
        return;
      }
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
        scrollDebounceRef.current = null;
      }
      if (isNearBottom && hasNextPage && !globalQueryLockRef.current) {
        scrollDebounceRef.current = setTimeout(() => {
          loadMoreStudents();
          scrollDebounceRef.current = null;
        }, 200);
      }
    },
    [hasNextPage, loadMoreStudents],
  );

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
        scrollDebounceRef.current = null;
      }
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

  if (collectionError) {
    return (
      <StyledBox css={{ padding: '24px', alignItems: 'center', justifyContent: 'center' }}>
        <StyledText css={{ color: theme.error }}>Error cargando la colección</StyledText>
      </StyledBox>
    );
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

              {/* View Mode Controls - Right */}
              <StyledRow css={{ gap: '16px', alignItems: 'center' }}>
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
                            key={`${debouncedSearchTerm}`}
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
    </StyledBox>
  );
};

export default PublicStudentProgress;
