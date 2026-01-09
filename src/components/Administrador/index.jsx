const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import styles from './administrador.module.css'
import { useNavigate } from 'react-router-dom'
import { formatarDataCriacaoAtualizacao } from '../../utils/fomatters'
import { FaLockOpen, FaTrash } from "react-icons/fa";
import { BsTrash, BsTrash3Fill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";
import Swal from 'sweetalert2'
import spinner from '../../assets/spinner.gif'
import { RiErrorWarningLine } from "react-icons/ri";
import Tooltip from '@mui/material/Tooltip'

import { GraficosUsuarios } from '../Graficos/GraficosUsuarios'

export const Administrador = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const initialState = {
        nome: '',
        email: '',
        password: 'Sistema123.',
        isAdmin: false,
        isDocente: false,
        isSocial: false,
        isFinanceiro: false,
        isCoordenador: false
    }
    const [usuarios, setUsuarios] = useState([])
    const [message, setMessage] = useState('')
    const [form, setForm] = useState(initialState)
    const [admins, setAdmins] = useState(0)
    const [comuns, setComuns] = useState(0)
    const [loading, setLoading] = useState(false)

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

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Este usuário será removido permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${url}/users/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    setUsuarios(prev => {
                        const updated = prev.filter(user => user.id !== id)
                        setAdmins(updated.filter(u => u.isAdmin).length)
                        setComuns(updated.filter(u => !u.isAdmin).length)
                        return updated
                    })

                    Swal.fire('Removido!', 'O usuário foi excluído com sucesso', 'success')
                } else {
                    Swal.fire('Erro!', 'Não foi possível remover o usuário.', 'error')
                }
            }
        })
    }



    useEffect(() => {
        try {
            setLoading(true)
            const fetchApi = async () => {
                const response = await fetch(`${url}/users`, {
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
            }

            fetchApi()

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const response = await fetch(`${url}/users`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar salvar novo usuário do sistema',
                    showCloseButton: true
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Usuário do sistema salvo com sucesso',
                    showCloseButton: true
                })
            }

        } catch (err) {
            console.error(err)
        } finally {
            setForm(initialState)
            setLoading(false)
            setMessage('Cadastro realizado com sucesso.')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }



    return (
        <div className={`w-100 ${styles['scroll']}`}>
            {message && <div className='alert alert-success'>{message}</div>}
            {loading ? (
                <div className='d-flex align-items-center justify-content-center'>
                    <img src={spinner} className='mt-5' />
                </div>) :
                (
                    <div>
                        <h2 className={`${styles['title-cadastro']}`}>Administrador</h2>
                        <div className="row w-100">
                            <div className="col-12 col-md-6 border rounded bg-light p-3">
                                <h3 className={`${styles['text-cadastro']}`}>Colaboradores Cadastrados</h3>
                                {usuarios.map(el => (
                                    <div key={el.id}>
                                        <h4>{el.nome}
                                            <FaTrash
                                                size={16}
                                                className='text-danger ms-2'
                                                id={el.id}
                                                onClick={() => handleDelete(el.id)} />
                                        </h4>
                                        {el.isAdmin ? (
                                            <p className='m-0 d-flex align-items-center'> <FaLockOpen className='text-secondary' /> Possui privilégios administrativos.</p>
                                        ) : (
                                            <p className='m-0 d-flex align-items-center'> <FaLock className='text-danger' /> Colaborador não possui privilégios</p>
                                        )}
                                        <p className='m-0 d-flex align-items-center'> <MdEmail className='text-secondary' /> E-mail: {el.email}</p>
                                        <p className='d-flex align-items-center'> <FaCalendarDay className='text-secondary' /> Criado em {formatarDataCriacaoAtualizacao(el.createdAt)}</p>
                                        {formatarDataCriacaoAtualizacao(el.createdAt) !== formatarDataCriacaoAtualizacao(el.updatedAt) && <p className='d-flex align-items-center'> <FaCalendarDay className='text-secondary' /> Ultima atualização em {formatarDataCriacaoAtualizacao(el.createdAt)}</p>}
                                    </div>
                                ))}
                            </div>
                            <div className="col-12 col-md-6 border rounded bg-light p-3">
                                <div className="row  justify-content-evenly">
                                    <div className={`col-12 p-1  ${styles['card-style']}`}>
                                        <div className={`rounded text-light bg-success p-2 shadow d-flex flex-column text-center justify-content-center ${styles['card-style']}`}>
                                            <p className={`${styles['font-title']}`}><b>Colaboradores Cadastrados</b></p>
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
                            <h2 className={`${styles['title-cadastro']}`}>Fazer Cadastro de Novo Colaborador</h2>
                            <form className='mb-5' onSubmit={handleSubmit}>
                                <div className="mt-3 px-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='nome'
                                        value={form.nome}
                                        onChange={handleChange} />
                                </div>
                                <div className="mt-2 px-3">
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='email'
                                        value={form.email}
                                        onChange={handleChange} />
                                </div>
                                <div className="mt-2 px-3">
                                    <p>Senha Padrão <b>Sistema123.</b> <Tooltip
                                            className='ms-1'
                                            title='O colaborador será cadastrado com a senha padrão que poderá ser mudada pelo painel do utilizador.'>
                                            <RiErrorWarningLine />
                                        </Tooltip> </p>
                                    <input
                                        type="hidden"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange} />
                                </div>
                                <div className="p-4 border rounded shadow">
                                    <div className="text-center">
                                        <h3 className={`${styles['title-cadastro']} p-2`}>Defina os níveis de acessos deste usuário do sistema</h3>
                                        <p
                                            className={`${styles['text-cadastro']} px-2 d-flex justify-content-center align-items-center`}>
                                            Os níveis de acesso definem quais camadas do sistema poderão ser operadas por este usuário do sistema.
                                            <Tooltip
                                                className='ms-2'
                                                title='Defina um ou mais papéis a um utiizador do sistema, mas evite fazer isso para o Administrador, pois o Administrador já tem autonomia em acessar todas as camadas do sistema, tudo lhe compete.'>
                                                <RiErrorWarningLine />
                                            </Tooltip>
                                        </p>
                                    </div>
                                    <div className="m-0 px-3">
                                        <input
                                            className='me-2 my-0'
                                            type="checkbox"
                                            name="isAdmin"
                                            id="isAdmin"
                                            checked={form.isAdmin}
                                            onChange={handleChange} />
                                        <label htmlFor="isAdmin" className="form-label my-0">Administrador</label>

                                        <Tooltip
                                            className='ms-2'
                                            title='O Administrador tem poder de ver todas as outras competências, por isso seja cauteloso ao atribuir este nível de acesso ao criar um utilizador.'>
                                            <RiErrorWarningLine />
                                        </Tooltip>

                                    </div>
                                    <div className="my-0 px-3">
                                        <input
                                            className='me-2 my-0'
                                            type="checkbox"
                                            name="isCoordenador"
                                            id="isCoordenador"
                                            checked={form.isCoordenador}
                                            onChange={handleChange} />
                                        <label htmlFor="isCoordenador" className="form-label my-0">Coordenador</label>
                                        <Tooltip
                                            className='ms-2'
                                            title='O nível de acesso Coordenador é apenas de nível pedagógico.'>
                                            <RiErrorWarningLine />
                                        </Tooltip>
                                    </div>
                                    <div className="my-0 px-3">
                                        <input
                                            className='me-2 my-0'
                                            type="checkbox"
                                            name="isDocente"
                                            id="isDocente"
                                            checked={form.isDocente}
                                            onChange={handleChange} />
                                        <label htmlFor="isDocente" className="form-label my-0">Professor</label>
                                        <Tooltip
                                            className='ms-2'
                                            title='O nível de acesso Professor é apenas de nível docente.'>
                                            <RiErrorWarningLine />
                                        </Tooltip>
                                    </div>
                                    <div className="my-0 px-3">
                                        <input
                                            className='me-2 my-0'
                                            type="checkbox"
                                            name="isFinanceiro"
                                            id="isFinanceiro"
                                            checked={form.isFinanceiro}
                                            onChange={handleChange} />
                                        <label htmlFor="isFinanceiro" className="form-label my-0">Financeiro</label>
                                        <Tooltip
                                            className='ms-2'
                                            title='O nível de acesso Financeiro é apenas de nível financeiro.'>
                                            <RiErrorWarningLine />
                                        </Tooltip>
                                    </div>
                                    <div className="my-0 px-3">
                                        <input
                                            className='me-2'
                                            type="checkbox"
                                            name="isSocial"
                                            id="isSocial"
                                            checked={form.isSocial}
                                            onChange={handleChange} />
                                        <label htmlFor="isSocial" className="form-label">Serviço Social</label>
                                        <Tooltip
                                            className='ms-2'
                                            title='O nível de acesso Assistente Social é apenas de nível do serviço social.'>
                                            <RiErrorWarningLine />
                                        </Tooltip>
                                    </div>
                                </div>
                                <button type='submit' className="btn btn-sm btn-success my-3">Salvar</button>

                            </form>
                        </div>

                    </div>

                )}

        </div>
    )
}