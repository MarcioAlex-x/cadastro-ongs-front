import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

import { PagesLogin } from './pages/PagesLogin/index.jsx'
import { PagesDashboard } from './pages/PagesDashboard'
import { Inicio } from './components/Inicio'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Cadastro } from './components/Cadastros/Cadasto'
import { CadastroPessoal } from './components/Cadastros/CadastroPessoal/index.jsx'
import { CadastroConjuge } from './components/Cadastros/CadastroConjuge/index.jsx'
import { CadastroEndereco } from './components/Cadastros/CadastroEndereco/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <PagesLogin /> },
      {
        element: <ProtectedRoute />,
        children:[
          { path:'/dashboard' , element: <PagesDashboard />,
            children:[
              {path:'inicio', element: <Inicio />},
              {path: 'cadastro', element:<Cadastro />},
              {path:'cadastro-pessoal/:id', element:<CadastroPessoal />},
              {path: 'cadastro-conjuge/:id', element: <CadastroConjuge />},
              {path: 'cadastro-endereco/:id', element: <CadastroEndereco />}
            ]
           },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
