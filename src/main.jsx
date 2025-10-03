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
import { CadastroDomiciliar } from './components/Cadastros/CadastroDomiciliar/index.jsx'
import { CadastroAcesso } from './components/Cadastros/CadastroAcesso/index.jsx'
import { ComposicaoFamiliar } from './components/Cadastros/ComposicaoFamiliar/index.jsx'
import { CadastroComposicaoFamiliar } from './components/Cadastros/CadastroComposicaoFamiliar/index.jsx'
import { ListaCadastros } from './components/Listas/ListaCadastros/index.jsx'
import { CadastroId } from './components/Listas/cadastroId/index.jsx'

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
              {path: 'cadastro-endereco/:id', element: <CadastroEndereco />},
              {path: 'cadastro-domiciliar/:id', element: <CadastroDomiciliar />},
              {path: 'acesso/:id', element: <CadastroAcesso />},
              {path: 'composicao/:id', element: <ComposicaoFamiliar />},
              {path: 'cadastro-composicao-familiar/:id', element: <CadastroComposicaoFamiliar />},
              {path: 'cadastros', element: <ListaCadastros />},
              {path: 'cadastro/:id', element: <CadastroId />}
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
