import { Outlet} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='App' style={{maxHeight:'100vh', overflowY:'hidden'}}>
      <Outlet />
    </div>
  )
}

export default App
