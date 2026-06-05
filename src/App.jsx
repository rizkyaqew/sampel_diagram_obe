import { useMemo, useState } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ObeNode from './components/ObeNode.jsx';
import {
  assessmentTraceWeights,
  course,
  finalGradeWeights,
  obeHierarchy
} from './data/obeData.js';
import { buildObeFlow } from './utils/buildFlow.js';

const nodeTypes = { obeNode: ObeNode };

function percent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '-';
  return `${Number(value).toLocaleString('id-ID', { maximumFractionDigits: 4 })}%`;
}

function NodeDetail({ selectedNode }) {
  if (!selectedNode) {
    return (
      <aside className="detail-panel empty">
        <h2>Detail Node</h2>
        <p>Klik salah satu node pada diagram untuk melihat jalur, bobot, dan kontribusinya.</p>
      </aside>
    );
  }

  const data = selectedNode.data;

  return (
    <aside className="detail-panel">
      <div className="detail-kicker">{data.level}</div>
      <h2>{data.code}</h2>
      <p className="detail-label">{data.label}</p>

      <dl>
        <dt>Bobot langsung</dt>
        <dd>{data.weightLabel ?? '-'}</dd>

        <dt>Kontribusi hirarki OBE</dt>
        <dd>{data.obeProduct ? percent(data.obeProduct) : '-'}</dd>

        <dt>Jalur</dt>
        <dd>{data.path?.join(' → ')}</dd>
      </dl>

      {data.level === 'Asesmen' ? (
        <div className="detail-box">
          <strong>Konversi ke telusur nilai</strong>
          <span>
            {data.code} masuk ke komponen {data.traceType} sebesar {percent(data.traceWeight)}.
          </span>
          <span>
            Komponen {data.traceType} memiliki bobot {percent(data.finalWeight)} terhadap nilai akhir.
          </span>
          <span>
            Kontribusi langsung asesmen ini terhadap nilai akhir adalah {percent(data.finalContribution)}.
          </span>
        </div>
      ) : null}
    </aside>
  );
}

function WeightTables() {
  const rows = Object.entries(assessmentTraceWeights).map(([type, weights]) => ({
    type,
    weights
  }));

  return (
    <div className="tables-panel">
      <div className="table-card">
        <h3>Bobot Asesmen → Telusur Nilai</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.type}>
                <th>{row.type}</th>
                {[1, 2, 3, 4].map((number) => (
                  <td key={number}>{row.weights[number] ? percent(row.weights[number]) : '-'}</td>
                ))}
                <td>100%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card compact">
        <h3>Telusur Nilai → Nilai Akhir</h3>
        <table>
          <tbody>
            {Object.entries(finalGradeWeights).map(([type, weight]) => (
              <tr key={type}>
                <th>{type}</th>
                <td>{percent(weight)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const flow = useMemo(
    () =>
      buildObeFlow({
        course,
        hierarchy: obeHierarchy,
        assessmentTraceWeights,
        finalGradeWeights
      }),
    []
  );

  const [nodes, , onNodesChange] = useNodesState(flow.nodes);
  const [edges, , onEdgesChange] = useEdgesState(flow.edges);
  const [selectedNode, setSelectedNode] = useState(flow.nodes.find((node) => node.id === 'course-root'));

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Visualisasi OBE Mata Kuliah</p>
          <h1>Diagram CPL → CPMK → SCPMK → Asesmen → Telusur Nilai</h1>
          <p>
            Contoh ini merepresentasikan tabel hirarki bobot OBE seperti format Excel, tetapi divisualkan
            sebagai diagram interaktif. Layout dibuat otomatis berdasarkan posisi asesmen paling bawah,
            sehingga tampilan awal tidak saling menempel dan langsung nyaman dilihat dengan fitur fit view.
          </p>
        </div>
      </section>

      <section className="workspace">
        <div className="flow-card">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => setSelectedNode(node)}
            fitView
            fitViewOptions={{ padding: 0.18, includeHiddenNodes: false }}
            minZoom={0.12}
            maxZoom={1.8}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable
          >
            <Background gap={28} size={1} />
            <Controls position="bottom-left" />
            <MiniMap
              position="bottom-right"
              pannable
              zoomable
              nodeStrokeWidth={3}
              nodeColor={(node) => {
                switch (node.data?.level) {
                  case 'CPL':
                    return '#69b94d';
                  case 'CPMK':
                    return '#71c6a1';
                  case 'SCPMK':
                    return '#6ea8fe';
                  case 'Asesmen':
                    return '#f7b267';
                  case 'Telusur':
                    return '#c084fc';
                  case 'Final':
                    return '#f87171';
                  default:
                    return '#94a3b8';
                }
              }}
            />
          </ReactFlow>
        </div>
        <NodeDetail selectedNode={selectedNode} />
      </section>

      <WeightTables />
    </main>
  );
}
