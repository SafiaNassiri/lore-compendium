import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import { getByType } from '../data/utils'
import styles from './FamilyTree.module.css'

// Tree data — define god relationships here 
const TREE_DATA = {
    id: 'origin',
    label: 'The Origin',
    type: 'concept',
    children: [
        {
        id: 'verglas',
        label: 'Verglas',
        alignment: 'dissident',
        children: [],
        },
        {
        id: 'solenne',
        label: 'Solenne',
        alignment: 'orthodox',
        children: [],
        },
    ],
}

const ALIGNMENT_COLORS = {
  dissident: '#7ec8e3',   // frost
  orthodox:  '#c9a84c',   // gold
  fallen:    '#b04040',   // crimson
  concept:   '#5a6080',   // muted
}

export default function FamilyTree() {
    const svgRef    = useRef(null)
    const navigate  = useNavigate()
    const [selected, setSelected] = useState(null)
    const deities = getByType('deity')

    useEffect(() => {
        const el = svgRef.current
        if (!el) return

        const W = el.clientWidth  || 800
        const H = el.clientHeight || 560

        // Clear previous render
        d3.select(el).selectAll('*').remove()

        const svg = d3.select(el)
            .attr('viewBox', `0 0 ${W} ${H}`)

        // Zoom layer
        const g = svg.append('g')

        svg.call(
            d3.zoom()
                .scaleExtent([0.4, 2.5])
                .on('zoom', e => g.attr('transform', e.transform))
        )

        // Build hierarchy
        const root = d3.hierarchy(TREE_DATA)
        const treeLayout = d3.tree().size([W - 80, H - 120])
        treeLayout(root)

        // Links
            g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('fill', 'none')
            .attr('stroke', '#2a3050')
            .attr('stroke-width', 1.5)
            .attr('d', d3.linkVertical()
                .x(d => d.x + 40)
                .y(d => d.y + 60)
            )

        // Node groups
        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x + 40}, ${d.y + 60})`)
            .style('cursor', d => d.data.id !== 'origin' ? 'pointer' : 'default')
            .on('click', (_, d) => {
                if (d.data.id === 'origin') return
                const deity = deities.find(e => e.id === d.data.id)
                setSelected(deity ?? null)
            })

            // Circles
            node.append('circle')
            .attr('r', d => d.data.id === 'origin' ? 10 : 22)
            .attr('fill', d => ALIGNMENT_COLORS[d.data.alignment] ?? ALIGNMENT_COLORS.concept)
            .attr('fill-opacity', 0.15)
            .attr('stroke', d => ALIGNMENT_COLORS[d.data.alignment] ?? ALIGNMENT_COLORS.concept)
            .attr('stroke-width', 1.5)

            // Labels
            node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('font-family', 'Cinzel, serif')
            .attr('font-size', d => d.data.id === 'origin' ? '9px' : '11px')
            .attr('fill', d => ALIGNMENT_COLORS[d.data.alignment] ?? ALIGNMENT_COLORS.concept)
            .text(d => d.data.label)

            // Sublabel (alignment)
            node.filter(d => d.data.id !== 'origin')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.8em')
            .attr('font-family', 'Crimson Pro, serif')
            .attr('font-size', '9px')
            .attr('fill', '#5a6080')
            .text(d => d.data.alignment ?? '')
    }, [])

    return (
        <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.title}>Living Gods — Lineage Tree</h1>
            <p className={styles.sub}>Click a node to inspect. Scroll to zoom, drag to pan.</p>
        </div>

        <div className={styles.canvas}>
            <svg ref={svgRef} className={styles.svg} />

            {selected && (
            <div className={styles.panel}>
                <button className={styles.close} onClick={() => setSelected(null)}>✕</button>
                <p className={styles.panelType}>deity</p>
                <h2 className={styles.panelTitle}>{selected.title}</h2>
                <p className={styles.panelSummary}>{selected.summary}</p>
                <button
                className={styles.panelLink}
                onClick={() => navigate(`/entry/${selected.slug}`)}
                >
                Full Entry →
                </button>
            </div>
            )}
        </div>
        </div>
    )
}