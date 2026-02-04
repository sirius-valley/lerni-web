export interface StudentCsvRow {
  legajo: string;
  nombre: string;
  email: string;
}

export interface StudentProgressRow extends StudentCsvRow {
  [programName: string]: string | number; // Para las columnas dinámicas de programas
}

// Parsear CSV y convertir a array de objetos
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  const result: string[][] = [];

  for (const line of lines) {
    if (line.trim() === '') continue;

    // Manejo básico de CSV con comillas
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    // Agregar el último campo
    fields.push(current.trim());
    result.push(fields);
  }

  return result;
};

// Leer archivo CSV y extraer datos de estudiantes
export const readStudentCsv = (file: File): Promise<StudentCsvRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;

        if (!csvText || csvText.trim() === '') {
          reject(new Error('El archivo está vacío'));
          return;
        }

        // Parsear CSV
        const csvData = parseCSV(csvText);

        if (csvData.length < 2) {
          reject(
            new Error('El archivo debe tener al menos una fila de encabezados y una fila de datos'),
          );
          return;
        }

        const headers = csvData[0].map((h) => h?.toLowerCase().trim().replace(/"/g, ''));
        const rows = csvData.slice(1);

        // Verificar que tenga las columnas requeridas
        const requiredColumns = ['legajo', 'nombre', 'email'];
        const missingColumns = requiredColumns.filter((col) => !headers.includes(col));

        if (missingColumns.length > 0) {
          reject(new Error(`Faltan las siguientes columnas: ${missingColumns.join(', ')}`));
          return;
        }

        // Mapear datos
        const students: StudentCsvRow[] = rows
          .filter((row) => row && row.length > 0 && row.some((cell) => cell)) // Filtrar filas vacías
          .map((row) => {
            const student: any = {};
            headers.forEach((header, index) => {
              if (requiredColumns.includes(header)) {
                student[header] = row[index]?.toString().trim().replace(/"/g, '') || '';
              }
            });
            return student;
          })
          .filter((student) => student.legajo && student.nombre && student.email); // Filtrar estudiantes incompletos

        resolve(students);
      } catch (error) {
        reject(
          new Error(
            `Error al leer el archivo: ${
              error instanceof Error ? error.message : 'Error desconocido'
            }`,
          ),
        );
      }
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsText(file, 'UTF-8');
  });
};

// Convertir array de objetos a CSV
const convertToCSV = (data: any[]): string => {
  if (data.length === 0) {
    return '';
  }

  // Obtener headers
  const headers = Object.keys(data[0]);

  // Función para escapar valores CSV
  const escapeCSVValue = (value: any): string => {
    const str = String(value || '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Crear CSV
  const csvRows = [
    // Headers
    headers.map(escapeCSVValue).join(','),
    // Data rows
    ...data.map((row) => {
      return headers.map((header) => escapeCSVValue(row[header])).join(',');
    }),
  ];

  const result = csvRows.join('\n');

  return result;
};

// Exportar datos de progreso a CSV
export const exportProgressToCsv = async (
  studentsProgress: any[],
  programs: any[],
  fileName = 'progreso-estudiantes.csv',
  onProgress?: (message: string) => void,
) => {
  try {
    // Validar estructura de datos
    if (!Array.isArray(studentsProgress) || studentsProgress.length === 0) {
      throw new Error('Datos de estudiantes inválidos');
    }

    if (!Array.isArray(programs) || programs.length === 0) {
      throw new Error('Datos de programas inválidos');
    }

    // Verificar estructura del primer estudiante
    const firstStudent = studentsProgress[0];
    if (!firstStudent || !firstStudent.programs) {
      throw new Error('Estructura de datos de estudiantes inválida');
    }

    onProgress?.('Preparando datos para exportación...');

    // Preparar datos para export en chunks para evitar bloqueo
    const chunkSize = 100;
    const exportData: any[] = [];

    for (let i = 0; i < studentsProgress.length; i += chunkSize) {
      const chunk = studentsProgress.slice(i, i + chunkSize);
      onProgress?.(
        `Procesando estudiantes ${i + 1} a ${Math.min(i + chunkSize, studentsProgress.length)} de ${
          studentsProgress.length
        }...`,
      );

      const chunkData = chunk.map((studentData) => {
        const row: any = {
          Legajo: studentData.id || '',
          Nombre: `${studentData.name || ''} ${studentData.lastname || ''}`.trim(),
          Email: studentData.email || '',
        };

        // Agregar columnas de cada programa
        programs.forEach((program) => {
          const programProgress = studentData.programs[program.id];
          if (programProgress) {
            const programName = program.program.name;
            // Columna de estado
            row[`${programName} - Estado`] = programProgress.status;
            // Columna de nota (solo si está terminado)
            if (programProgress.status === 'Terminado' && programProgress.grade !== undefined) {
              row[`${programName} - Nota`] = programProgress.grade;
              row[`${programName} - Resultado`] = programProgress.passed ? 'Aprobado' : 'Reprobado';
            } else {
              row[`${programName} - Nota`] =
                programProgress.status === 'No asignado' ? '-' : 'Sin nota';
              row[`${programName} - Resultado`] = '-';
            }
            // Columna de porcentaje de progreso
            if (typeof programProgress.progress === 'number') {
              row[`${programName} - Progreso`] =
                programProgress.progress === 100 ? '100%' : `${programProgress.progress}%`;
            } else {
              row[`${programName} - Progreso`] = 'N/A';
            }
          } else {
            // Si no hay datos del programa
            const programName = program.program.name;
            row[`${programName} - Estado`] = 'No asignado';
            row[`${programName} - Nota`] = '-';
            row[`${programName} - Resultado`] = '-';
            row[`${programName} - Progreso`] = 'N/A';
          }
        });

        return row;
      });

      exportData.push(...chunkData);

      // Pequeña pausa para permitir que el navegador responda
      if (i + chunkSize < studentsProgress.length) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 10); // 10ms delay
        });
      }
    }

    onProgress?.('Generando archivo CSV...');

    // Convertir a CSV
    const csvContent = convertToCSV(exportData);

    onProgress?.('Descargando archivo...');

    // Crear blob y descargar
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    onProgress?.('✅ Archivo descargado exitosamente');

    return true;
  } catch (error) {
    onProgress?.('❌ Error al generar el archivo CSV');
    return false;
  }
};

// Exportar datos de notas a CSV
export const exportGradesToCsv = async (
  studentsProgress: any[],
  programs: any[],
  fileName = 'notas-estudiantes.csv',
  onProgress?: (message: string) => void,
) => {
  try {
    // Validar estructura de datos
    if (!Array.isArray(studentsProgress) || studentsProgress.length === 0) {
      throw new Error('Datos de estudiantes inválidos');
    }

    if (!Array.isArray(programs) || programs.length === 0) {
      throw new Error('Datos de programas inválidos');
    }

    // Verificar estructura del primer estudiante
    const firstStudent = studentsProgress[0];
    if (!firstStudent || !firstStudent.programs) {
      throw new Error('Estructura de datos de estudiantes inválida');
    }

    onProgress?.('Preparando datos de notas para exportación...');

    // Definir los títulos específicos de las columnas en el orden requerido
    const programColumnTitles = [
      'Atención centrada en la persona',
      'Evacuación e incendio',
      // 'Higiene de manos',
      'Ciberseguridad',
      'Calidad y seguridad del paciente',
      // 'RCP',
      'Seguridad e higiene',
      'Reporte de accidentes e incidentes',
      'Cuidado del Medio Ambiente',
    ];

    // Preparar datos para export con enfoque en notas en chunks
    const chunkSize = 100;
    const exportData: any[] = [];

    for (let i = 0; i < studentsProgress.length; i += chunkSize) {
      const chunk = studentsProgress.slice(i, i + chunkSize);
      onProgress?.(
        `Procesando notas de estudiantes ${i + 1} a ${Math.min(
          i + chunkSize,
          studentsProgress.length,
        )} de ${studentsProgress.length}...`,
      );

      const chunkData = chunk.map((studentData) => {
        const row: any = {
          Legajo: studentData.id || '',
          Nombre: `${studentData.name || ''} ${studentData.lastname || ''}`.trim(),
          Email: studentData.email || '',
        };

        // Agregar columnas de notas usando los títulos específicos
        programColumnTitles.forEach((columnTitle) => {
          // Buscar el programa correspondiente por nombre (case-insensitive)
          const program = programs.find(
            (p) =>
              p.program.name.toLowerCase().includes(columnTitle.toLowerCase()) ||
              columnTitle.toLowerCase().includes(p.program.name.toLowerCase()),
          );

          if (program) {
            const programProgress = studentData.programs.find(
              (p: any) => p.programId === program.programId,
            );

            if (programProgress) {
              // Solo columna de nota
              if (programProgress.status === 'completed' && programProgress.grade !== undefined) {
                row[columnTitle] = `${programProgress.grade}`;
              } else {
                row[columnTitle] = programProgress.status === 'No asignado' ? 'N/A' : '"0"';
              }
            } else {
              // Si no hay datos del programa
              row[columnTitle] = 'N/A';
            }
          } else {
            // Si no se encuentra el programa, poner N/A
            row[columnTitle] = 'N/A';
          }
        });

        return row;
      });

      exportData.push(...chunkData);

      // Pequeña pausa para permitir que el navegador responda
      if (i + chunkSize < studentsProgress.length) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 10); // 10ms delay
        });
      }
    }

    onProgress?.('Generando archivo CSV de notas...');

    // Convertir a CSV
    const csvContent = convertToCSV(exportData);

    onProgress?.('Descargando archivo de notas...');

    // Crear blob y descargar
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    onProgress?.('✅ Archivo de notas descargado exitosamente');

    return true;
  } catch (error) {
    onProgress?.('❌ Error al generar el archivo CSV de notas');
    return false;
  }
};

// Mergear datos de CSV con datos existentes por email
export const mergeStudentData = (existingStudents: any[], csvStudents: StudentCsvRow[]): any[] => {
  // Filtrar estudiantes inválidos antes del merge
  const invalidStudents = existingStudents.filter((s) => !s || typeof s.email !== 'string');

  const validStudents = existingStudents.filter((s) => typeof s.email === 'string');

  let matchedCount = 0;
  let unmatchedCount = 0;

  const mergedData = validStudents.map((studentData, index) => {
    try {
      const email = studentData.email?.toLowerCase().trim();

      if (!email) {
        return studentData;
      }

      const csvStudent = csvStudents.find((s) => s.email.toLowerCase().trim() === email);

      if (csvStudent) {
        matchedCount++;
        return {
          ...studentData,
          // Actualizar con datos del CSV si están disponibles
          id: csvStudent.legajo || studentData.id,
          name: csvStudent.nombre.split(' ')[0] || studentData.name,
          lastname: csvStudent.nombre.split(' ').slice(1).join(' ') || studentData.lastname,
          // Mantener email original
        };
      } else {
        unmatchedCount++;
        return studentData;
      }
    } catch (err) {
      return studentData;
    }
  });

  return mergedData;
};
