import { Handle, Position } from '@xyflow/react';

const levelNames = {
  ROOT: 'Mata Kuliah',
  CPL: 'CPL',
  CPMK: 'CPMK',
  SCPMK: 'SCPMK',
  Asesmen: 'Asesmen',
  Telusur: 'Telusur Nilai',
  Final: 'Nilai Akhir'
};

export default function ObeNode({ data, selected }) {
  return (
    <div className={`obe-node level-${data.level.toLowerCase()} ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="node-meta">
        <span>{levelNames[data.level] ?? data.level}</span>
        {data.weightLabel ? <strong>{data.weightLabel}</strong> : null}
      </div>
      <div className="node-code">{data.code}</div>
      <div className="node-label">{data.label}</div>
      {data.level === 'Asesmen' ? (
        <div className="node-foot">
          {data.traceType}: {String(data.traceWeight).replace('.', ',')}% · NA:{' '}
          {String(data.finalContribution).replace('.', ',')}%
        </div>
      ) : null}
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
}
