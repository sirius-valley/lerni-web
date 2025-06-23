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
  const batchSize = 100;
  const loadMoreTriggeredRef = useRef(false);
  const listRef = useRef<any>(null);
  const scrollTopRef = useRef(0);
  const preserveScrollRef = useRef(false);

  // Debounce para el término de búsqueda
  useEffect(() => {
    // Si el campo está vacío, actualizar inmediatamente
    if (!searchTerm || searchTerm.trim() === '') {
      console.log('🔍 Campo vacío - actualizando inmediatamente');
      setDebouncedSearchTerm('');
      return;
    }

    // Para texto no vacío, aplicar debounce
    console.log('⏱️ Aplicando debounce para:', searchTerm);
    const timer = setTimeout(() => {
      console.log('🚀 Ejecutando búsqueda para:', searchTerm);
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Log para ver cuando cambia el debouncedSearchTerm
  useEffect(() => {
    console.log('📡 debouncedSearchTerm cambió a:', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
    ...(debouncedSearchTerm.trim() && { search: debouncedSearchTerm.trim() }),
  };

  console.log('🔎 Query params:', queryParams);

  const shouldSkipQuery = !collectionId || isLoadingMore;
  console.log('🚫 shouldSkipQuery:', shouldSkipQuery, { collectionId, isLoadingMore });

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
    console.log('📊 studentsData recibido:', studentsData);
    console.log('📊 studentsData?.students length:', studentsData?.students?.length);
    console.log('📊 studentsData?.total:', studentsData?.total);
    if (studentsData?.students) {
      console.log('✅ Datos válidos recibidos, currentOffset:', currentOffset);
      console.log('✅ Cantidad de estudiantes en respuesta:', studentsData.students.length);

      // Crear un nuevo array con IDs únicos para forzar re-render
      const newStudents = studentsData.students.map((student) => ({ ...student }));

      if (currentOffset === 0) {
        // Primera carga o nueva búsqueda - siempre reemplazar
        console.log(
          '🔄 Primera carga - reemplazando array completo con',
          newStudents.length,
          'estudiantes',
        );
        console.log(
          '🔄 Datos que se van a mostrar:',
          newStudents.map((s) => `${s.name} ${s.lastname}`).slice(0, 3),
        );
        setAllStudents(newStudents);
      } else {
        // Cargar más datos (infinite scroll)
        console.log('➕ Agregando más datos al array existente');
        setAllStudents((prev) => {
          console.log('➕ Array anterior tenía:', prev.length, 'estudiantes');
          console.log('➕ Agregando:', newStudents.length, 'estudiantes más');
          return [...prev, ...newStudents];
        });
      }

      // Verificar si hay más páginas
      const hasMore =
        studentsData.students.length === batchSize &&
        currentOffset + batchSize < (studentsData.total || 0);
      console.log(
        '📄 hasMore:',
        hasMore,
        'batchSize:',
        batchSize,
        'currentOffset + batchSize:',
        currentOffset + batchSize,
        'total:',
        studentsData.total,
      );
      setHasNextPage(hasMore);
      setIsLoadingMore(false);

      // Reset the trigger flag when data is loaded
      loadMoreTriggeredRef.current = false;

      // Restore scroll position for infinite scroll
      if (preserveScrollRef.current && listRef.current) {
        const targetRow = Math.floor(scrollTopRef.current / 60);
        console.log(
          '📍 Restoring scroll to row:',
          targetRow,
          'from position:',
          scrollTopRef.current,
        );

        // Use multiple strategies to ensure scroll is preserved
        setTimeout(() => {
          if (listRef.current && targetRow > 0) {
            console.log('🎯 Scrolling to row:', targetRow);
            listRef.current.scrollToRow(targetRow);
          }
        }, 50);

        setTimeout(() => {
          if (listRef.current) {
            console.log('🎯 Fine-tuning scroll position to:', scrollTopRef.current);
            listRef.current.scrollToPosition(scrollTopRef.current);
          }
        }, 150);

        preserveScrollRef.current = false;
      }
    } else {
      console.log('❌ No hay datos válidos en studentsData');
    }
  }, [studentsData, currentOffset, batchSize]);

  // Log adicional para ver cuando cambia allStudents
  useEffect(() => {
    console.log('👥 allStudents actualizado:', allStudents.length, 'estudiantes');
  }, [allStudents]);

  // Reset cuando cambia la búsqueda o colección
  useEffect(() => {
    console.log('🔄 Reset por cambio de búsqueda o colección');
    console.log('🔄 Reset - reseteando offset y estados');
    setCurrentOffset(0);
    setHasNextPage(true);
    setIsLoadingMore(false);
    loadMoreTriggeredRef.current = false; // Reset infinite scroll trigger
    scrollTopRef.current = 0; // Reset scroll position for new search
    preserveScrollRef.current = false; // Reset preserve scroll flag
    // No limpiar allStudents aquí - dejar que se limpie cuando lleguen nuevos datos
  }, [debouncedSearchTerm, collectionId]);

  useEffect(() => {
    if (collectionError) {
      errorToast('Error al cargar los datos de la colección');
      navigate('/');
    }
    if (studentsError) {
      console.error('Error loading students:', studentsErrorData);
      errorToast('Error al cargar los datos de estudiantes');
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

      // Crear mapas por programId Y por programName para mayor flexibilidad
      const studentProgramsByIdMap = student.programs.reduce(
        (acc, program) => {
          acc[program.programId] = program;
          return acc;
        },
        {} as Record<string, CollectionStudent['programs'][0]>,
      );

      const studentProgramsByNameMap = student.programs.reduce(
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
    console.log('🔄 Recalculando progressData con', allStudents.length, 'estudiantes');
    console.log('🔄 collectionData?.programs length:', collectionData?.programs?.length);
    const result = convertApiDataToTableFormat();
    console.log('🔄 progressData calculado:', result.length, 'estudiantes procesados');
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
    console.log('Opening certificate:', certificateId);

    // URL del certificado en S3
    const certificateUrl = `https://lerni-assets.s3.us-east-1.amazonaws.com/certificates/${certificateId}.pdf`;
    window.open(certificateUrl, '_blank');
  };

  // Función para guardar la posición de scroll
  const handleScroll = useCallback(({ scrollTop }: { scrollTop: number }) => {
    scrollTopRef.current = scrollTop;
    // Calculate current visible row
    const currentRow = Math.floor(scrollTop / 60); // 60 is rowHeight
    console.log('📍 Current scroll position:', scrollTop, 'Current row:', currentRow);
  }, []);

  // Función para cargar más estudiantes (infinite scroll)
  const loadMoreStudents = useCallback(() => {
    console.log('🚀 loadMoreStudents called', {
      hasNextPage,
      isLoadingMore,
      studentsLoading,
      triggered: loadMoreTriggeredRef.current,
    });

    if (hasNextPage && !isLoadingMore && !studentsLoading && !loadMoreTriggeredRef.current) {
      console.log('✅ Conditions met - loading more students');
      const currentRow = Math.floor(scrollTopRef.current / 60);
      console.log('📍 Saving scroll position:', scrollTopRef.current, 'Current row:', currentRow);

      preserveScrollRef.current = true; // Mark that we should preserve scroll
      loadMoreTriggeredRef.current = true;
      setIsLoadingMore(true);
      setCurrentOffset((prev) => {
        const newOffset = prev + batchSize;
        console.log('📈 Setting new offset:', newOffset);
        return newOffset;
      });
    } else {
      console.log('❌ Conditions not met for loading more');
    }
  }, [hasNextPage, isLoadingMore, studentsLoading, batchSize]);

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
        {/* Results Counter */}
        {(debouncedSearchTerm || allStudents.length > 0) && (
          <Card css={{ padding: '12px 16px' }}>
            <StyledRow css={{ justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <StyledText variant="body3" css={{ color: theme.gray600 }}>
                {debouncedSearchTerm ? (
                  <>
                    Mostrando {allStudents.length} estudiante{allStudents.length !== 1 ? 's' : ''}{' '}
                    para &quot;{debouncedSearchTerm}&quot;
                  </>
                ) : (
                  <>
                    Mostrando {allStudents.length} estudiante{allStudents.length !== 1 ? 's' : ''}
                  </>
                )}
                {studentsData?.total && studentsData.total > allStudents.length && (
                  <> de {studentsData.total} totales</>
                )}
              </StyledText>
              {hasNextPage && !studentsLoading && (
                <StyledText variant="body3" css={{ color: theme.primary400, fontWeight: 'bold' }}>
                  • Scroll para cargar más
                </StyledText>
              )}
              {studentsLoading && currentOffset === 0 && (
                <StyledText variant="body3" css={{ color: theme.primary400, fontWeight: 'bold' }}>
                  • Buscando...
                </StyledText>
              )}
            </StyledRow>
          </Card>
        )}

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

              {/* View Mode Switch - Right */}
              <StyledRow css={{ gap: '16px', alignItems: 'center' }}>
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
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        ref={listRef}
                        key={`${debouncedSearchTerm}`} // Only re-render on search change, not on data change
                        height={height}
                        rowCount={progressData.length + (hasNextPage ? 1 : 0)} // +1 para el loader
                        rowHeight={60}
                        onScroll={handleScroll}
                        rowRenderer={({ index, key, style }) => {
                          // Si es la última fila y hay más páginas, mostrar loader
                          if (index === progressData.length && hasNextPage) {
                            // Trigger load more cuando se renderiza esta fila (solo una vez)
                            if (!isLoadingMore && !loadMoreTriggeredRef.current) {
                              console.log('🎯 Triggering load more from row renderer');
                              loadMoreStudents();
                            }

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

export default StudentProgress;
