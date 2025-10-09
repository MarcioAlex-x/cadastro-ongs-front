import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './administrador.module.css'
import { useNavigate } from 'react-router-dom'
import { formatarDataCriacaoAtualizacao } from '../../utils/fomatters'
import { FaLockOpen } from "react-icons/fa";
import { BsTrash, BsTrash3Fill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { GraficosUsuarios } from '../Graficos/GraficosUsuarios'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const Administrador = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const initialState = {
        nome: '',
        email: '',
        password: 'Sistema123.',
        isAdmin: false
    }
    const [usuarios, setUsuarios] = useState([])
    const [message, setMessage] = useState('')
    const [form, setForm] = useState(initialState)
    const [admins, setAdmins] = useState(0)
    const [comuns, setComuns] = useState(0)

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    useEffect(() => {
        if (!user.isAdmin) navigate('/dasboard/cadastros')
    }, [user, navigate])

    useEffect(() => {
        try {

            const fetchApi = async () => {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                setUsuarios(data)

                const qtdAdmins = data.filter(usuario => usuario.isAdmin === true).length
                const qtdComuns = data.filter(usuario => usuario.isAdmin === false).length

                setAdmins(qtdAdmins)
                setComuns(qtdComuns)
                console.log(admins)
                console.log(comuns)
            }

            fetchApi()

        } catch (err) {
            console.error(err)
        }
    }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

        } catch (err) {
            console.error(err)
        } finally {
            setForm(initialState)
            setMessage('Cadastro realizado com sucesso.')
        }
    }

    

    return (
        <div className={` w-100 ${styles['scroll']}`}>
            {message && <p>{message}</p>}
            <h2 className={`${styles['title-cadastro']}`}>Administrador</h2>
            <div className="row w-100">
                <div className="col-12 col-md-6 border rounded bg-light p-3">
                    <h3 className={`${styles['text-cadastro']}`}>Usuários Cadastrados</h3>
                    {usuarios.map(el => (
                        <div key={el.id}>
                            <h4>{el.nome} </h4>
                            {el.isAdmin ? (
                                <p className='m-0 d-flex align-items-center'> <FaLockOpen  className='text-primary'/> Possui privilégios administrativos.</p>
                            ) : (
                                <p className='m-0 d-flex align-items-center'> <FaLock className='text-danger' /> Usuário não possui privilégios</p>
                            )}
                            <p className='m-0 d-flex align-items-center'> <MdEmail className='text-success' /> E-mail: {el.email}</p>
                            <p className='d-flex align-items-center'> <FaCalendarDay className='text-secondary' /> Criado em {formatarDataCriacaoAtualizacao(el.createdAt)}</p>
                            {formatarDataCriacaoAtualizacao(el.createdAt) !== formatarDataCriacaoAtualizacao(el.updatedAt) && <p className='d-flex align-items-center'> <FaCalendarDay className='text-secondary' /> Ultima atualização em {formatarDataCriacaoAtualizacao(el.createdAt)}</p>}
                        </div>
                    ))}
                </div>
                <div className="col-12 col-md-6 border rounded bg-light p-3">
                    <div className="row  justify-content-evenly">
                        <div className={`col-12 p-1  ${styles['card-style']}`}>
                            <div className={`rounded text-light bg-success p-2 shadow d-flex flex-column text-center justify-content-center ${styles['card-style']}`}>
                                    <p className={`${styles['font-title']}`}><b>Usuários Cadastrados</b></p>
                                <p className={`${styles['font-text']} display-6 me-2 `}><b>{usuarios.length}</b></p>
                            </div>
                        </div>
                        <div className={`col-12 p-1 ${styles['card-style']}`}>
                            <GraficosUsuarios admins={admins} comuns={comuns} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4'>

                <h2 className={`${styles['title-cadastro']}`}>Fazer Cadastro de Usuário do Sistema</h2>
                <form className='' onSubmit={handleSubmit}>
                    <div className="p-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name='nome'
                            value={form.nome}
                            onChange={handleChange} />
                    </div>
                    <div className="p-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            type="text"
                            className="form-control"
                            name='email'
                            value={form.email}
                            onChange={handleChange} />
                    </div>
                    <div className="p-3">
                        <p>Senha Padrão <b>Sistema123.</b> </p>
                        <input
                            type="hidden"
                            name="password"
                            value={form.password}
                            onChange={handleChange} />
                    </div>
                    <div className="p-3">
                        <input
                            className='me-2'
                            type="checkbox"
                            name="isAdmin"
                            id="isAdmin"
                            checked={form.isAdmin}
                            onChange={handleChange} />
                        <label htmlFor="isAdmin" className="form-label">Privilégios de Administrador do Sistema</label>
                    </div>
                    <button type='submit' className="btn btn-sm btn-success">Salvar</button>
                </form>
            </div>
        </div>
    )
}