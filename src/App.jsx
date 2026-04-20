import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Articles from './pages/Articles'
import EntryDetail from './pages/EntryDetail'
import FamilyTree from './pages/FamilyTree'
import WorldMap from './pages/WorldMap'
import NotFound from './pages/NotFound'
import Gods from './pages/Gods'
import Factions from './pages/Factions'
import Characters from './pages/Characters'
import Locations from './pages/Locations'
import Regions from './pages/Regions'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Search from './pages/Search'
import TagPage from './pages/TagPage'
import TagsIndex from './pages/TagsIndex'
import Timeline from './pages/Timeline'

export default function App() {
  return (
    <BrowserRouter basename="/verglas-compendium">
      <Layout>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/articles"    element={<Articles />} />
          <Route path="/entry/:slug" element={<EntryDetail />} />
          <Route path="/map"         element={<WorldMap />} />
          <Route path="/regions"     element={<Regions />} />
          <Route path="/gods"        element={<Gods />} />
          <Route path="/family-tree" element={<FamilyTree />} />
          <Route path="/factions"    element={<Factions />} />
          <Route path="/characters"  element={<Characters />} />
          <Route path="/locations"   element={<Locations />} />
          <Route path="/admin"       element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/tags"     element={<TagsIndex />} />
          <Route path="/tag/:tag" element={<TagPage />} />  
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/search" element={<Search />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}