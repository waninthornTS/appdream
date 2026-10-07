import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { CategoryPage, LearnHome, NotFound, TopicPage } from './pages/Learn'
import { ChordDetail, ChordsHome } from './pages/Chords'
import Saved from './pages/Saved'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<LearnHome />} />
          <Route path="learn/:cat" element={<CategoryPage />} />
          <Route path="learn/:cat/:topic" element={<TopicPage />} />
          <Route path="chords" element={<ChordsHome />} />
          <Route path="chords/:k/:s" element={<ChordDetail />} />
          <Route path="saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
