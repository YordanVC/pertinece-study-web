import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { ResultadosPage } from './pages/Resultados/ResultadosPage'
import { NotFoundPage } from './pages/NotFound/NotFoundPage'
import LoginPage from './pages/Login/LoginPage'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta de Login sin Layout */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas con Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Página de Inicio / Mis Encuestas</div>} />
            <Route path="create" element={<div>Constructor de Encuestas</div>} />
            <Route path="resultados" element={<ResultadosPage />} />
            {/* Ruta catch-all para páginas no encontradas - dentro del layout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
