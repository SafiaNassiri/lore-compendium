import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

// Placeholder pages — filled in subsequent feature commits
const Placeholder = ({ title }) => (
  <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--clr-silver)' }}>
    <h2 style={{ color: 'var(--clr-divine)', marginBottom: '1rem' }}>{title}</h2>
    <p>Coming in a future commit.</p>
  </div>
)

function App() {
  return (
    <BrowserRouter basename="/verglas-compendium">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Placeholder title="Lore Articles" />} />
        <Route path="/articles/:slug" element={<Placeholder title="Article" />} />
        <Route path="/characters" element={<Placeholder title="Characters" />} />
        <Route path="/characters/:slug" element={<Placeholder title="Character" />} />
        <Route path="/locations" element={<Placeholder title="Locations" />} />
        <Route path="/factions" element={<Placeholder title="Factions" />} />
        <Route path="/family-tree" element={<Placeholder title="Living Gods — Family Tree" />} />
        <Route path="/world-map" element={<Placeholder title="World Map" />} />
        <Route path="*" element={<Placeholder title="404 — Lost in the Void" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
