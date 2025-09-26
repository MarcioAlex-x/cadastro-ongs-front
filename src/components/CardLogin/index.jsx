import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const CardLogin = ({ logo }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
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
        <div className="d-flex flex-column justify-content-center">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="d-flex flex-column justify-content-center">
          <button type="submit" className="mt-4 btn btn-dark">
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}
