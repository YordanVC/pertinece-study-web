import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { ResultadosPage } from './pages/Resultados/ResultadosPage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Página de Inicio / Mis Encuestas</div>} />
            <Route path="create" element={<div>Constructor de Encuestas</div>} />
            <Route path="resultados" element={<ResultadosPage />} />
            {/* Ruta catch-all para páginas no encontradas - dentro del layout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
