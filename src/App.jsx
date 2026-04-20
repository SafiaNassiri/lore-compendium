import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Stub = ({ title }) => (
  <div style={{ padding: 'var(--space-xl)', fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>
    <h2 style={{ color: 'var(--color-gold)' }}>{title}</h2>
    <p style={{ fontFamily: 'var(--font-body)', marginTop: '8px' }}>Coming in a future feat branch.</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter basename="/verglas-compendium">
      <Layout>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/map"         element={<Stub title="World Map" />} />
          <Route path="/regions"     element={<Stub title="Regions" />} />
          <Route path="/gods"        element={<Stub title="Living Gods" />} />
          <Route path="/family-tree" element={<Stub title="Lineage Tree" />} />
          <Route path="/factions"    element={<Stub title="Factions" />} />
          <Route path="/articles"    element={<Stub title="Articles" />} />
          <Route path="/characters"  element={<Stub title="Characters" />} />
          <Route path="/locations"   element={<Stub title="Locations" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}