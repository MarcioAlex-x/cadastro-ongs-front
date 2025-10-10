const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatarDataCriacaoAtualizacao } from "../../utils/fomatters"
import styles from './painelUsuario.module.css'
import { GraficosCadastrosDesteUsuarios } from "../Graficos/GraficosCadastrosDesteUsuario"

export const PainelUsuario = () => {
    const { id } = useParams()
    const [usuario, setUsuario] = useState([])
    const [cadastros, setCadastros] = useState([])
    const [message, setMessage] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const initialStateFormPAssword = {
        nome: usuario.nome,
        email: usuario.email,
        password: '',
        rePassword: '',
        isAdmin: usuario.isAdmin
    }
    const [form, setForm] = useState(initialStateFormPAssword)

    useEffect(() => {
        const fetchApi = async () => {

            const response = await fetch(`${url}/users/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            setUsuario(data)
        }
        fetchApi()
    }, [id])

    const handleChangePassword = async (e) => {
        e.preventDefault()

        if (form.password !== form.rePassword) {
            setPasswordAlert('As senhas  não coincidem')
            return
        }

        const payload = {
            nome: form.nome,
            email: form.email,
            password: form.password,
            isAdmin: form.isAdmin
        }

        try {
            const response = await fetch(`${url}/users/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                setMessage('Senha atualizada')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`${url}/cadastro`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            setCadastros(data)
        }
        fetchApi()
    }, [])

    useEffect(() => {
        if (message) {
            setPasswordAlert('')
        }
    }, [message])

    const cadastrosDesteUsuario = cadastros.filter(el => (el.user_id === id)).length
    const todosCadastros = cadastros.length
    const outrosCadastros = todosCadastros - cadastrosDesteUsuario

    return (
        <div className={`${styles['scroll']} w-100`}>
            <div className="row w-100 p-3">
                {message && <div className="alert alert-success">{message}</div>}
                <div className="col-6">
                    <h2 className={`${styles['title-cadastro']}`}>Informações de {usuario.nome}</h2>
                    <p className={` mb-0 ${styles['text-cadastro']}`}>E-mail: {usuario.email}</p>
                    <p className={` mb-0 ${styles['text-cadastro']}`}>Registrado no sistema desde {formatarDataCriacaoAtualizacao(usuario.createdAt)}</p>
                    {usuario.isAdmin ? <p className={`mb-0 ${styles['text-cadastro']}`}>Você possui privilégios administrativos</p> : <p className={` mb-0 ${styles['text-cadastro']}`}>Você não possui privilégios administrativos</p>}
                    <p className={` mb-0 ${styles['text-cadastro']}`}>Realizou {cadastrosDesteUsuario} de {todosCadastros} cadastros de beneficiários realizados </p>
                </div>
                <div className="col-6 bg-light p-2 rounded">
                    <h2 className={`text-center ${styles['title-cadastro']}`}>Cadastro realizados</h2>
                    <GraficosCadastrosDesteUsuarios cadastrosDesteUsuario={cadastrosDesteUsuario} outrosCadastros={outrosCadastros} />
                </div>
            </div>
            <div className="p-5 border rounded mt-4">
                <h2 className={`${styles['title-cadastro']}`}>Alterar Senha</h2>
                {passwordAlert && <div className="alert alert-danger" >{passwordAlert}</div>}
                <form onSubmit={handleChangePassword}>
                    <label htmlFor="" className="form-label">Nova Senha</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={form.password}
                        id="password"
                        onChange={handleChange}
                    />
                    <label htmlFor="" className="form-label">Repetir Senha</label>
                    <input
                        className="form-control"
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        value={form.rePassword}
                        onChange={handleChange}
                    />
                    <button className="btn btn-sm btn-success w-100 mt-3 mb-3">Alterar Senha</button>
                </form>
            </div>
        </div>
    )
}