const url = import.meta.env.VITE_API_URL
import Swal from 'sweetalert2'

import { useState } from "react"

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${url}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'E-mail enviado!',
                    text: 'Verifique a sua caixa de entrada para redefinir a sua senha.'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: data.message || 'Não foi possível enviar o e-mail.'
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocorreu um problema ao enviar o e-mail.'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
            <form onSubmit={handleSubmit} className="border rounded p-4 w-100 p-sm-5 bg-light">
                <h2>Esqueci minha senha</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar link de redefinição"}
                </button>
            </form>
        </div>
    )
}