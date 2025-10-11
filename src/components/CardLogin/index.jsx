import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'

export const CardLogin = ({ logo }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
      Swal.fire({
        icon:'success',
        title:'Login bem sucessido',
        timer:1500,
        showCancelButton:false
      })
      navigate("/dashboard/inicio")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <img
        src={logo}
        alt="ADMONG, Sistema Administrativo para Organizações e Institutos"
        className="img-fluid"
      />

      <form
        onSubmit={handleSubmit}
        className="border rounded p-2 w-100 p-sm-5 bg-light"
      >
        <div className="d-flex flex-column justify-content-center">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column justify-content-center" 
            style={{
              position:'relative'
            }}>
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type={showPassword ? "text":"password"}
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={()=>setShowPassword(!showPassword)}
            style={{
              position:'absolute',
              right:'10px',
              top:'36px',
              cursor:'pointer',
              fontSize:'1.2rem'
            }}>
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </span>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="d-flex flex-column justify-content-center">
          <button type="submit" className="mt-4 btn btn-dark">
            Entrar
          </button>
          <Link to='/forgot-password' className="text-dark align-self-center text-center mt-4 d-block w-25" style={{textDecoration:'none'}}>Esqueci a senha</Link>
        </div>
      </form>
    </div>
  )
}
