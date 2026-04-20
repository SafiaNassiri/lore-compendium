import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBySlug } from '../data/utils'
import styles from './WorldMap.module.css'

// ── Region definitions ─────────────────────────────────────
// points: SVG polygon points string (x,y pairs)
// slug: matches a location entry in entries.js (or null)
// alignment: dissident | orthodox | neutral | unknown
const REGIONS = [
    {
        id: 'verglas-reach',
        label: 'The Verglas Reach',
        slug: 'verglas-reach',
        alignment: 'dissident',
        // Northern frozen expanse
        points: '200,40 420,40 460,140 380,200 240,200 160,140',
    },
    {
        id: 'threshold-zone',
        label: 'The Threshold',
        slug: 'the-threshold',
        alignment: 'unknown',
        // Thin band — border territory
        points: '240,200 380,200 400,240 220,240',
    },
    {
        id: 'orthodox-heartland',
        label: 'Orthodox Heartland',
        slug: null,
        alignment: 'orthodox',
        // Central inhabited region
        points: '160,260 440,260 480,380 340,440 120,420 80,320',
    },
    {
        id: 'eastern-reaches',
        label: 'Eastern Reaches',
        slug: null,
        alignment: 'neutral',
        // Eastern frontier
        points: '440,260 560,220 600,360 520,440 480,380',
    },
    {
        id: 'southern-wastes',
        label: 'Southern Wastes',
        slug: null,
        alignment: 'neutral',
        // Southern uninhabited
        points: '80,420 340,440 360,520 200,560 60,520',
    },
    {
        id: 'deep-south',
        label: 'The Deep South',
        slug: null,
        alignment: 'unknown',
        points: '360,520 520,440 560,540 380,600 200,580',
    },
]

const ALIGNMENT_FILLS = {
    dissident: { fill: '#7ec8e3', opacity: 0.15, stroke: '#7ec8e3' },
    orthodox:  { fill: '#c9a84c', opacity: 0.12, stroke: '#c9a84c' },
    neutral:   { fill: '#9aa0b8', opacity: 0.08, stroke: '#5a6080' },
    unknown:   { fill: '#b04040', opacity: 0.10, stroke: '#b04040' },
}

const LABEL_POSITIONS = {
    'verglas-reach':      { x: 310, y: 115 },
    'threshold-zone':     { x: 310, y: 222 },
    'orthodox-heartland': { x: 280, y: 350 },
    'eastern-reaches':    { x: 510, y: 330 },
    'southern-wastes':    { x: 210, y: 490 },
    'deep-south':         { x: 390, y: 540 },
}

export default function WorldMap() {
    const [hovered,  setHovered]  = useState(null)
    const [selected, setSelected] = useState(null)
    const [tooltip,  setTooltip]  = useState({ x: 0, y: 0 })
    const navigate = useNavigate()

    const handleClick = (region) => {
        const entry = region.slug ? getBySlug(region.slug) : null
        setSelected({ region, entry })
    }

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>World Map</h1>
            <p className={styles.sub}>Click a region to inspect. Hover for name.</p>
        </div>

        <div className={styles.layout}>
            <div className={styles.mapWrap}>
            {/* Tooltip */}
            {hovered && (
                <div
                className={styles.tooltip}
                style={{ left: tooltip.x + 12, top: tooltip.y - 28 }}
                >
                {hovered}
                </div>
            )}

            <svg
                viewBox="0 0 680 640"
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Ocean background */}
                <rect width="680" height="640" fill="#0a0c12" />

                {/* Grid lines — subtle cartographic feel */}
                {[...Array(7)].map((_, i) => (
                <line
                    key={`h${i}`}
                    x1="0" y1={i * 100}
                    x2="680" y2={i * 100}
                    stroke="#1f2640" strokeWidth="0.5"
                />
                ))}
                {[...Array(7)].map((_, i) => (
                <line
                    key={`v${i}`}
                    x1={i * 100} y1="0"
                    x2={i * 100} y2="640"
                    stroke="#1f2640" strokeWidth="0.5"
                />
                ))}

                {/* Regions */}
                {REGIONS.map(region => {
                const style = ALIGNMENT_FILLS[region.alignment]
                const isHov = hovered === region.label
                const isSel = selected?.region.id === region.id
                const pos   = LABEL_POSITIONS[region.id]

                return (
                    <g key={region.id}>
                    <polygon
                        points={region.points}
                        fill={style.fill}
                        fillOpacity={isSel ? 0.3 : isHov ? 0.22 : style.opacity}
                        stroke={style.stroke}
                        strokeWidth={isSel ? 2 : isHov ? 1.5 : 1}
                        strokeOpacity={isSel ? 1 : 0.6}
                        style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => {
                        setHovered(region.label)
                        const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                        setTooltip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                        })
                        }}
                        onMouseMove={e => {
                        const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                        setTooltip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                        })
                        }}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleClick(region)}
                    />
                    {/* Region label */}
                    {pos && (
                        <text
                        x={pos.x} y={pos.y}
                        textAnchor="middle"
                        fontFamily="Cinzel, serif"
                        fontSize="10"
                        fill={style.stroke}
                        fillOpacity={0.7}
                        pointerEvents="none"
                        >
                        {region.label}
                        </text>
                    )}
                    </g>
                )
                })}

                {/* Compass rose */}
                <g transform="translate(620, 60)">
                <text textAnchor="middle" y="-18" fontFamily="Cinzel, serif" fontSize="8" fill="#5a6080">N</text>
                <text textAnchor="middle" y="28"  fontFamily="Cinzel, serif" fontSize="8" fill="#5a6080">S</text>
                <text textAnchor="middle" x="-18" y="6" fontFamily="Cinzel, serif" fontSize="8" fill="#5a6080">W</text>
                <text textAnchor="middle" x="18"  y="6" fontFamily="Cinzel, serif" fontSize="8" fill="#5a6080">E</text>
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#2a3050" strokeWidth="1" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#2a3050" strokeWidth="1" />
                </g>
            </svg>
            </div>

            {/* Side panel */}
            <div className={styles.sidebar}>
            {!selected ? (
                <div className={styles.sidebarEmpty}>
                <p>Select a region to view lore.</p>
                <div className={styles.legend}>
                    <p className={styles.legendTitle}>Alignment</p>
                    {Object.entries(ALIGNMENT_FILLS).map(([key, val]) => (
                    <div key={key} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: val.fill }} />
                        <span>{key}</span>
                    </div>
                    ))}
                </div>
                </div>
            ) : (
                <div className={styles.sidebarContent}>
                <button className={styles.close} onClick={() => setSelected(null)}>✕</button>
                <p className={styles.regionAlignment}>{selected.region.alignment}</p>
                <h2 className={styles.regionTitle}>{selected.region.label}</h2>

                {selected.entry ? (
                    <>
                    <p className={styles.regionSummary}>{selected.entry.summary}</p>
                    <button
                        className={styles.entryLink}
                        onClick={() => navigate(`/entry/${selected.entry.slug}`)}
                    >
                        Full Entry →
                    </button>
                    </>
                ) : (
                    <p className={styles.regionSummary} style={{ fontStyle: 'italic' }}>
                    No lore entry yet. Add one in entries.js.
                    </p>
                )}
                </div>
            )}
            </div>
        </div>
        </div>
    )
}