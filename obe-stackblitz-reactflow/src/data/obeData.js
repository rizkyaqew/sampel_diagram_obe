export const course = {
  id: 'mk-obgyn-001',
  code: 'MK-CONTOH',
  title: 'Mata Kuliah Contoh OBE',
  description:
    'Contoh representasi hirarki OBE dari CPL sampai Asesmen, lalu dihubungkan ke telusur nilai dan nilai akhir.'
};

export const obeHierarchy = [
  {
    id: 'cpl-3',
    level: 'CPL',
    code: 'CPL3',
    label: 'Capaian Pembelajaran Lulusan 3',
    weight: 7,
    children: [
      {
        id: 'cpmk-3-1',
        level: 'CPMK',
        code: 'CPMK 3.1',
        label: 'Capaian Pembelajaran Mata Kuliah 3.1',
        weight: 70,
        children: [
          {
            id: 'scpmk-3-1-1',
            level: 'SCPMK',
            code: 'SCPMK 3.1.1',
            label: 'Sub-CPMK 3.1.1',
            weight: 50,
            children: [
              { id: 'quiz-1', level: 'Asesmen', code: 'QUIZ-1', label: 'Quiz 1', weight: 100 },
              { id: 'uts-1', level: 'Asesmen', code: 'UTS-1', label: 'UTS 1', weight: 100 }
            ]
          },
          {
            id: 'scpmk-3-1-2',
            level: 'SCPMK',
            code: 'SCPMK 3.1.2',
            label: 'Sub-CPMK 3.1.2',
            weight: 25,
            children: [{ id: 'uts-2', level: 'Asesmen', code: 'UTS-2', label: 'UTS 2', weight: 100 }]
          },
          {
            id: 'scpmk-3-1-3',
            level: 'SCPMK',
            code: 'SCPMK 3.1.3',
            label: 'Sub-CPMK 3.1.3',
            weight: 25,
            children: [{ id: 'uts-3', level: 'Asesmen', code: 'UTS-3', label: 'UTS 3', weight: 100 }]
          }
        ]
      },
      {
        id: 'cpmk-3-2',
        level: 'CPMK',
        code: 'CPMK 3.2',
        label: 'Capaian Pembelajaran Mata Kuliah 3.2',
        weight: 15,
        children: [
          {
            id: 'scpmk-3-2-1',
            level: 'SCPMK',
            code: 'SCPMK 3.2.1',
            label: 'Sub-CPMK 3.2.1',
            weight: 50,
            children: [{ id: 'tugas-1', level: 'Asesmen', code: 'TUGAS-1', label: 'Tugas 1', weight: 100 }]
          },
          {
            id: 'scpmk-3-2-2',
            level: 'SCPMK',
            code: 'SCPMK 3.2.2',
            label: 'Sub-CPMK 3.2.2',
            weight: 50,
            children: [{ id: 'tugas-2', level: 'Asesmen', code: 'TUGAS-2', label: 'Tugas 2', weight: 100 }]
          }
        ]
      },
      {
        id: 'cpmk-3-3',
        level: 'CPMK',
        code: 'CPMK 3.3',
        label: 'Capaian Pembelajaran Mata Kuliah 3.3',
        weight: 15,
        children: [
          {
            id: 'scpmk-3-3-1',
            level: 'SCPMK',
            code: 'SCPMK 3.3.1',
            label: 'Sub-CPMK 3.3.1',
            weight: 60,
            children: [
              { id: 'tugas-3', level: 'Asesmen', code: 'TUGAS-3', label: 'Tugas 3', weight: 100 },
              { id: 'quiz-2', level: 'Asesmen', code: 'QUIZ-2', label: 'Quiz 2', weight: 100 }
            ]
          },
          {
            id: 'scpmk-3-3-2',
            level: 'SCPMK',
            code: 'SCPMK 3.3.2',
            label: 'Sub-CPMK 3.3.2',
            weight: 20,
            children: [{ id: 'uas-1', level: 'Asesmen', code: 'UAS-1', label: 'UAS 1', weight: 100 }]
          },
          {
            id: 'scpmk-3-3-4',
            level: 'SCPMK',
            code: 'SCPMK 3.3.4',
            label: 'Sub-CPMK 3.3.4',
            weight: 20,
            children: [{ id: 'uas-2', level: 'Asesmen', code: 'UAS-2', label: 'UAS 2', weight: 100 }]
          }
        ]
      }
    ]
  },
  {
    id: 'cpl-4',
    level: 'CPL',
    code: 'CPL4',
    label: 'Capaian Pembelajaran Lulusan 4',
    weight: 2.5,
    children: [
      {
        id: 'cpmk-4-1',
        level: 'CPMK',
        code: 'CPMK 4.1',
        label: 'Capaian Pembelajaran Mata Kuliah 4.1',
        weight: 50,
        children: [
          {
            id: 'scpmk-4-1-1',
            level: 'SCPMK',
            code: 'SCPMK 4.1.1',
            label: 'Sub-CPMK 4.1.1',
            weight: 70,
            children: [{ id: 'uas-3', level: 'Asesmen', code: 'UAS-3', label: 'UAS 3', weight: 100 }]
          },
          {
            id: 'scpmk-4-1-2',
            level: 'SCPMK',
            code: 'SCPMK 4.1.2',
            label: 'Sub-CPMK 4.1.2',
            weight: 30,
            children: [{ id: 'quiz-3', level: 'Asesmen', code: 'QUIZ-3', label: 'Quiz 3', weight: 100 }]
          }
        ]
      },
      {
        id: 'cpmk-4-2',
        level: 'CPMK',
        code: 'CPMK 4.2',
        label: 'Capaian Pembelajaran Mata Kuliah 4.2',
        weight: 50,
        children: [
          {
            id: 'scpmk-4-2-1',
            level: 'SCPMK',
            code: 'SCPMK 4.2.1',
            label: 'Sub-CPMK 4.2.1',
            weight: 20,
            children: [{ id: 'uts-4', level: 'Asesmen', code: 'UTS-4', label: 'UTS 4', weight: 100 }]
          },
          {
            id: 'scpmk-4-2-2',
            level: 'SCPMK',
            code: 'SCPMK 4.2.2',
            label: 'Sub-CPMK 4.2.2',
            weight: 20,
            children: [{ id: 'uas-4', level: 'Asesmen', code: 'UAS-4', label: 'UAS 4', weight: 100 }]
          },
          {
            id: 'scpmk-4-2-3',
            level: 'SCPMK',
            code: 'SCPMK 4.2.3',
            label: 'Sub-CPMK 4.2.3',
            weight: 60,
            children: [{ id: 'tugas-4', level: 'Asesmen', code: 'TUGAS-4', label: 'Tugas 4', weight: 100 }]
          }
        ]
      }
    ]
  }
];

export const assessmentTraceWeights = {
  QUIZ: { 1: 20, 2: 20, 3: 60 },
  UTS: { 1: 30, 2: 20, 3: 30, 4: 20 },
  UAS: { 1: 40, 2: 10, 3: 25, 4: 25 },
  TUGAS: { 1: 10, 2: 10, 3: 40, 4: 40 }
};

export const finalGradeWeights = {
  QUIZ: 15,
  UTS: 20,
  UAS: 30,
  TUGAS: 35
};
