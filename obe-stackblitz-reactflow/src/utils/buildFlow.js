import { MarkerType } from '@xyflow/react';

const NODE_WIDTH = 176;
const LEAF_STEP_X = 220;
const LEVEL_STEP_Y = 175;
const LEFT_PADDING = 80;

const levelIndex = {
  ROOT: 0,
  CPL: 1,
  CPMK: 2,
  SCPMK: 3,
  Asesmen: 4,
  Telusur: 5,
  Final: 6
};

const edgeBase = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
  labelBgPadding: [8, 4],
  labelBgBorderRadius: 6,
  labelBgStyle: { fill: 'rgba(255,255,255,.88)', color: '#102030' },
  style: { strokeWidth: 1.35 }
};

function formatWeight(value) {
  if (value === null || value === undefined) return '';
  return `${String(value).replace('.', ',')}%`;
}

function getAssessmentInfo(code, assessmentTraceWeights, finalGradeWeights) {
  const [traceType, rawNumber] = code.split('-');
  const number = Number(rawNumber);
  const traceWeight = assessmentTraceWeights?.[traceType]?.[number] ?? 0;
  const finalWeight = finalGradeWeights?.[traceType] ?? 0;

  return {
    traceType,
    number,
    traceWeight,
    finalWeight,
    finalContribution: (traceWeight * finalWeight) / 100
  };
}

export function buildObeFlow({ course, hierarchy, assessmentTraceWeights, finalGradeWeights }) {
  const layoutNodes = [];
  const edges = [];
  const assessmentPositions = new Map();
  let leafIndex = 0;

  function walk(item, parentId, path, product) {
    const isAssessment = item.level === 'Asesmen';
    const nextPath = [...path, item.code];
    const nextProduct = product * ((item.weight ?? 100) / 100);

    let x;
    if (item.children?.length) {
      const childPositions = item.children.map((child) => walk(child, item.id, nextPath, nextProduct));
      x = childPositions.reduce((sum, child) => sum + child.x, 0) / childPositions.length;
    } else {
      x = LEFT_PADDING + leafIndex * LEAF_STEP_X;
      leafIndex += 1;
    }

    const y = levelIndex[item.level] * LEVEL_STEP_Y;
    const assessmentInfo = isAssessment
      ? getAssessmentInfo(item.code, assessmentTraceWeights, finalGradeWeights)
      : null;

    const data = {
      level: item.level,
      code: item.code,
      label: item.label,
      weight: item.weight,
      weightLabel: formatWeight(item.weight),
      path: nextPath,
      obeProduct: nextProduct * 100,
      ...assessmentInfo
    };

    layoutNodes.push({
      id: item.id,
      type: 'obeNode',
      position: { x: x - NODE_WIDTH / 2, y },
      data
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${item.id}`,
        source: parentId,
        target: item.id,
        label: formatWeight(item.weight),
        ...edgeBase
      });
    }

    if (isAssessment) {
      assessmentPositions.set(item.code, { id: item.id, x, y, ...assessmentInfo });
    }

    return { id: item.id, x, y };
  }

  const cplPositions = hierarchy.map((item) => walk(item, 'course-root', [course.code], 1));
  const minX = Math.min(...cplPositions.map((node) => node.x));
  const maxX = Math.max(...cplPositions.map((node) => node.x));
  const centerX = (minX + maxX) / 2;

  layoutNodes.push({
    id: 'course-root',
    type: 'obeNode',
    position: { x: centerX - NODE_WIDTH / 2, y: levelIndex.ROOT * LEVEL_STEP_Y },
    data: {
      level: 'ROOT',
      code: course.code,
      label: course.title,
      description: course.description,
      path: [course.code]
    }
  });

  const traceTypes = Object.keys(finalGradeWeights);
  const traceNodes = traceTypes.map((traceType, index) => {
    const relatedAssessments = [...assessmentPositions.values()].filter(
      (item) => item.traceType === traceType
    );
    const relatedAverageX = relatedAssessments.length
      ? relatedAssessments.reduce((sum, item) => sum + item.x, 0) / relatedAssessments.length
      : centerX + index * LEAF_STEP_X;

    const node = {
      id: `trace-${traceType.toLowerCase()}`,
      type: 'obeNode',
      position: {
        x: relatedAverageX - NODE_WIDTH / 2,
        y: levelIndex.Telusur * LEVEL_STEP_Y + 18
      },
      data: {
        level: 'Telusur',
        code: traceType,
        label: `Komponen ${traceType}`,
        weight: finalGradeWeights[traceType],
        weightLabel: formatWeight(finalGradeWeights[traceType]),
        path: [course.code, 'Nilai Akhir', traceType]
      }
    };

    relatedAssessments.forEach((assessment) => {
      edges.push({
        id: `${assessment.id}-${node.id}`,
        source: assessment.id,
        target: node.id,
        label: formatWeight(assessment.traceWeight),
        ...edgeBase,
        style: { strokeWidth: 1.1, strokeDasharray: '5 4' }
      });
    });

    return node;
  });

  const traceCenterX =
    traceNodes.reduce((sum, node) => sum + node.position.x + NODE_WIDTH / 2, 0) / traceNodes.length;

  const finalNode = {
    id: 'final-grade',
    type: 'obeNode',
    position: {
      x: traceCenterX - NODE_WIDTH / 2,
      y: levelIndex.Final * LEVEL_STEP_Y + 36
    },
    data: {
      level: 'Final',
      code: 'NA',
      label: 'Nilai Akhir Mata Kuliah',
      path: [course.code, 'Nilai Akhir']
    }
  };

  traceNodes.forEach((node) => {
    edges.push({
      id: `${node.id}-final-grade`,
      source: node.id,
      target: 'final-grade',
      label: node.data.weightLabel,
      ...edgeBase,
      style: { strokeWidth: 1.8 }
    });
  });

  return {
    nodes: [...layoutNodes, ...traceNodes, finalNode],
    edges
  };
}
