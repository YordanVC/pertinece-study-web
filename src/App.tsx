import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<div>Página de Inicio / Mis Encuestas</div>} />
            <Route path="create" element={<div>Constructor de Encuestas</div>} />
            <Route path="prueba" element={<div>Prueba</div>} />

            {/* Añadir más rutas aquí */}

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
