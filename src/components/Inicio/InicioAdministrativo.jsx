const url = import.meta.env.VITE_API_URL

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext"
import styles from './inicio.module.css'
import Swal from "sweetalert2"

export const InicioAdministrativo = () => {

    const { user } = useAuth()

    const [infoInst, setInfoInst] = useState([])
    const [instId, setInstId] = useState('')
    const [form, setForm] = useState({
        nome: '',
        logradouro: '',
        numero: '',
        cep: '',
        bairro: '',
        cidade: '',
        uf: '',
        cnpj: '',
        telefone:'',
        telefone2:'',
        email:'',
        instagram:'',
        facebook:'',
        youtube:'',
        spotify:'',
        x:'',
        tiktok:'',
        imagemInstituicao: null
    })


    const handleChange = (e) => {
        const { name, value, files } = e.target
        setForm({
            ...form,
            [name]: files ? files[0] : value
        })
    }
    const handleCreate = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        for (let key in form) {
            formData.append(key, form[key])
        }

        try {
            const response = await fetch(`${url}/instituicao`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar salvar as informações.',
                    showCloseButton: true
                })
                return {}
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'As informações da instituição foram salvas.',
                    showCloseButton: true
                })
            }

        } catch (err) {
            Swal.fire({
                icon: 'Error',
                title: 'Erro',
                text: `Ocorreu um erro inesperado. ${err.message}`,
                showCloseButton: true
            })
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        for (let key in form) {
            if (key === "imagemInstituicao" && !(form[key] instanceof File)) continue
            formData.append(key, form[key])
        }

        try {
            const response = await fetch(`${url}/instituicao/${instId}`, {
                method: 'PUT',
                body: formData
            })

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar editar as informações.',
                    showCloseButton: true
                })
                return {}
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'As informações da instituição foram editadas.',
                    showCloseButton: true
                })
            }

        } catch (err) {
            Swal.fire({
                icon: 'Error',
                title: 'Erro',
                text: `Ocorreu um erro inesperado. ${err.message}`,
                showCloseButton: true
            })
        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`${url}/instituicao`)
            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar ler as informações da instituição',
                    showCloseButton: true,
                    time: 3000
                })
            }
            const data = await response.json()
            setInfoInst(data)
        }
        fetchApi()
    }, [])

    useEffect(() => {
        if (infoInst.length > 0) {
            setInstId(infoInst[0].id)
            setForm(infoInst[0])
        }
    }, [infoInst])


    return (
        <div className={`${styles['scroll']}`}>
            <div>
                <h1 className={`text-center mb-4 ${styles['font-title']}`}>Painel Administrativo de {user.nome}</h1>
                <div className=" p-4 rounded">
                    <h3 className={`${styles['font-title']} my-3 text-center`}>Acompanhe o paineis dos profissionais da instituição</h3>
                    <div className="border rounded p-3 bg-light mb-3">
                        <h4 className={`${styles['font-title']} mt-4 text-center`}>Painel Social</h4>
                        <p className={`${styles['font-text']}`} >
                            Acompanhe os número referentes ao serviço social desta instituição como cadastros de usuários realizados no mês vigente, cadastros de usuários realizados no mês passado, cadastros de usuários realizados de usuários no ano vigente, cadastros de usuários realizados no ano passado de usuários, relatórios e gráficos de análises de riscos dos usuários cadastrados.
                        </p>
                        <Link to='/dashboard/inicio-social' className={`${styles['link']}`}>
                            <button className="btn btn-primary btn-sm m-auto d-block mb-3" >Acesse</button>
                        </Link>
                    </div>

                    <div className="border rounded p-3 bg-light mb-3">
                        <h4 className={`${styles['font-title']} mt-4 text-center`}></h4>
                        <p className={`${styles['font-text']}`}>
                            Acompanhe os dados referentes a coordenação
                        </p>
                        <Link to='/dashboard/inicio-coordenador' className={`${styles['link']}`}>
                            <button className="btn btn-primary btn-sm m-auto d-block mb-3" >Acesse</button>
                        </Link>
                    </div>

                    <div className="border rounded p-3 bg-light mb-3">
                        <h4 className={`${styles['font-title']} mt-4 text-center`}></h4>
                        <p className={`${styles['font-text']}`}>
                            Acompanhe os dados referentes a docencia
                        </p>
                        <Link to='/dashboard/inicio-docente' className={`${styles['link']}`}>
                            <button className="btn btn-primary btn-sm m-auto d-block mb-3" >Acesse</button>
                        </Link>
                    </div>

                    <div className="border rounded p-3 bg-light">
                        <h4 className={`${styles['font-title']} mt-4 text-center mb-3`}></h4>
                        <p className={`${styles['font-text']}`}>
                            Acompanhe os dados referentes a financeiro
                        </p>
                        <Link to='/dashboard/inicio-financeiro' className={`${styles['link']}`}>
                            <button className="btn btn-primary btn-sm m-auto d-block mb-3" >Acesse</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-4">

                <h4 className={`${styles['font-title']} text-center`}>
                    {infoInst.length === 0 ?
                        'Adicione as '
                        :
                        'Edite as '}
                    Informações da Instituição</h4>

                <form onSubmit={infoInst.length === 0 ? handleCreate : handleUpdate}>
                    {infoInst > 0 && <input type="hidden" value={infoInst[0]?.id || ''} />}

                    <div className="mb-2">
                        <label htmlFor="" className="form-label">Nome</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Informe o nome da instituição"
                            name="nome"
                            onChange={handleChange}
                            value={form.nome || ''}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="" className="form-label">Logradouro</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Informe a rua, avenida ou outro tipo de localidade"
                            name="logradouro"
                            onChange={handleChange}
                            value={form.logradouro || ''} />
                    </div>

                    <div className="mb-2 row">
                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Número</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Ex: 200 ou 200-A"
                                name="numero"
                                onChange={handleChange}
                                value={form.numero || ''} />
                        </div>

                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">CEP</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Apenas números"
                                name="cep"
                                onChange={handleChange}
                                value={form.cep || ''} />
                        </div>

                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Bairro</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nome do bairro"
                                name="bairro"
                                onChange={handleChange}
                                value={form.bairro || ''} />
                        </div>

                        <div className="col-3 mb-2">
                            <label htmlFor="" className="form-label">Cidade</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nome da cidade"
                                name="cidade"
                                onChange={handleChange}
                                value={form.cidade || ''} />
                        </div>


                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">UF</label>
                            <div className="">
                                <select name="uf"
                                    onChange={handleChange}
                                    className="form-control"
                                    value={form.uf || ''}>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Telefone</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="telefone"
                                onChange={handleChange}
                                value={form.telefone || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Telefone2</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="telefone2"
                                onChange={handleChange}
                                value={form.telefone2 || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">E-mail</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="email"
                                onChange={handleChange}
                                value={form.email || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Instagram</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="instagram"
                                onChange={handleChange}
                                value={form.instagram || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Facebook</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="facebook"
                                onChange={handleChange}
                                value={form.facebook || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">YouTube</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="youtube"
                                onChange={handleChange}
                                value={form.youtube || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Spotify</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="spotify"
                                onChange={handleChange}
                                value={form.spotify || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">X (Antigo Twitter)</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="x"
                                onChange={handleChange}
                                value={form.x || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">TikTok</label>
                            <input type="text"
                                className="form-control"
                                placeholder=""
                                name="tiktok"
                                onChange={handleChange}
                                value={form.tiktok || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">CNPJ</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nome do bairro"
                                name="cnpj"
                                onChange={handleChange}
                                value={form.cnpj || ''} />
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="" className="form-label">Imagem</label>
                            <input type="file"
                                name="imagemInstituicao"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Nome da cidade"
                            />
                        </div>
                    </div>
                    {
                        infoInst.length === 0 ?
                            (<button
                                type="submit"
                                className="btn btn-primary btn-sm">Salvar</button>
                            )
                            :
                            (<button
                                className="btn btn-primary btn-sm">Editar</button>
                            )
                    }
                </form>
            </div>
        </div>
    )
}