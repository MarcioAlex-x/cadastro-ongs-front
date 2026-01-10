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
        telefone: '',
        telefone2: '',
        email: '',
        instagram: '',
        facebook: '',
        youtube: '',
        spotify: '',
        x: '',
        tiktok: '',
        heroFrase: '',
        chavePix: '',
        nomeBanco1: '',
        nomeBanco2: '',
        tipoContaBanco1: '',
        tipoContaBanco2: '',
        contaBanco1: '',
        contaBanco2: '',
        agenciaBanco1: '',
        agenciaBanco2: '',
        operacaoBanco1: '',
        operacaoBanco2: '',
        sobre: '',
        missao: '',
        visao: '',
        valores: ''
    })

    const [arquivos, setArquivos] = useState({
        imagemInstituicao: null,
        heroImagem: null,
        qrCodePixImagem: null,
        sobreImagem: null,
        missaoImagem: null,
        visaoImagem: null,
        valoresImagem: null
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        setArquivos(prev => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        if (arquivos.imagemInstituicao) formData.append('imagemInstituicao', arquivos.imagemInstituicao)
        if (arquivos.heroImagem) formData.append('heroImagem', arquivos.heroImagem)
        if (arquivos.qrCodePixImagem) formData.append('qrCodePixImagem', arquivos.qrCodePixImagem)
        if (arquivos.sobreImagem) formData.append('sobreImagem', arquivos.sobreImagem)
        if (arquivos.missaoImagem) formData.append('missaoImagem', arquivos.missaoImagem)
        if (arquivos.visaoImagem) formData.append('visaoImagem', arquivos.visaoImagem)
        if (arquivos.valoresImagem) formData.append('valoresImagem', arquivos.valoresImagem)

        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })

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
                icon: 'error',
                title: 'Erro',
                text: `Ocorreu um erro inesperado. ${err.message}`,
                showCloseButton: true
            })
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        if (arquivos.imagemInstituicao) formData.append('imagemInstituicao', arquivos.imagemInstituicao)
        if (arquivos.heroImagem) formData.append('heroImagem', arquivos.heroImagem)
        if (arquivos.qrCodePixImagem) formData.append('qrCodePixImagem', arquivos.qrCodePixImagem)
        if (arquivos.sobreImagem) formData.append('sobreImagem', arquivos.sobreImagem)
        if (arquivos.missaoImagem) formData.append('missaoImagem', arquivos.missaoImagem)
        if (arquivos.visaoImagem) formData.append('visaoImagem', arquivos.visaoImagem)
        if (arquivos.valoresImagem) formData.append('valoresImagem', arquivos.valoresImagem)


        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })

        try {
            const response = await fetch(`${url}/instituicao/${instId}`, {
                method: 'PATCH',
                body: formData
            })

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar editar as informações.',
                    showCloseButton: true
                })
                return
            }

            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'As informações da instituição foram editadas.',
                showCloseButton: true
            })

        } catch (err) {
            Swal.fire({
                icon: 'error',
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
            setForm(prev => ({
                ...prev,
                ...infoInst[0]
            }))
        }
    }, [infoInst])


    return (
        <div className={`${styles['scroll']}`}>
            {console.log(infoInst)}
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
                    {infoInst.length > 0 && <input type="hidden" value={infoInst[0]?.id || ''} />}

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
                            <label htmlFor="" className="form-label">Logo <i>(Use imagem 80x80px)</i></label>
                            <input type="file"
                                name="imagemInstituicao"
                                onChange={handleFileChange}
                                className="form-control"
                                placeholder="Nome da cidade"
                            />
                        </div>
                    </div>

                    {/* Informaçoes do hero */}

                    <div className="my-2 row">
                        <div className="col-12">
                            <h4 className={`${styles['font-title']} text-center`}>Hero da página</h4>
                            <div className="col-6 mb-2">
                                <label className="form-label">Imagem do hero <i>(Use imagem 1000 x 300)</i></label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="heroImagem"
                                    onChange={handleFileChange} />
                            </div>
                        </div>

                        <div className="col-12 mb-2">
                            <label className="form-label">Frase breve para o hero</label>
                            <textarea
                                className="form-control"
                                name="heroFrase"
                                value={form.heroFrase || ''}
                                onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* Informações de doações */}

                    <div className="my-2 row">
                        <div className="col-6">
                            <label className="form-label">
                                QRCode Pix
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                name="qrCodePixImagem"
                                onChange={handleFileChange} />
                        </div>

                        <div className="col-6">
                            <label className="form-label">
                                Chave pix
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="chavePix"
                                value={form.chavePix || ''}
                                onChange={handleChange} />
                        </div>


                        <div className="col-6 my-4">
                            <h4 className="text-center">Banco 1</h4>

                            <label className="form-label">
                                Nome do banco
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomeBanco1"
                                value={form.nomeBanco1}
                                onChange={handleChange} />

                            <label className="form-label">
                                Tipo de conta
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="tipoContaBanco1"
                                value={form.tipoContaBanco1 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Números da conta
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="contaBanco1"
                                value={form.contaBanco1 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Agência
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="agenciaBanco1"
                                value={form.agenciaBanco1 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Operação
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="operacaoBanco1"
                                value={form.operacaoBanco1 || ''}
                                onChange={handleChange} />
                        </div>

                        <div className="col-6 my-4">
                            <h4 className="text-center">Banco 2</h4>
                            <label className="form-label">
                                Nome do banco
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomeBanco2"
                                value={form.nomeBanco2 || ""}
                                onChange={handleChange} />

                            <label className="form-label">
                                Tipo de conta
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="tipoContaBanco2"
                                value={form.tipoContaBanco2 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Números da conta
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="contaBanco2"
                                value={form.contaBanco2 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Agência
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="agenciaBanco2"
                                value={form.agenciaBanco2 || ''}
                                onChange={handleChange} />

                            <label className="form-label">
                                Operação
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="operacaoBanco2"
                                value={form.operacaoBanco2 || ''}
                                onChange={handleChange} />
                        </div>
                        {/* Sobre */}
                        <div className="row">
                            <h3 className="text-center my-2">Sobre</h3>
                            <div className="col-12">
                                <label className="form-label">Imagem do sobre</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="sobreImagem"
                                    onChange={handleFileChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Sobre</label>
                                <textarea
                                    className="form-control"
                                    name="sobre"
                                    value={form.sobre || ''}
                                    onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Imagem da área missão</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="missaoImagem"
                                    onChange={handleFileChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Missão</label>
                                <textarea
                                    className="form-control"
                                    name="missao"
                                    value={form.missao || ''}
                                    onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Imagem área visão</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="visaoImagem"
                                    onChange={handleFileChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Visão</label>
                                <textarea
                                    className="form-control"
                                    name="visao"
                                    value={form.visao || ''}
                                    onChange={handleChange}></textarea>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Imagem da área valores</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="valoresImagem"
                                    onChange={handleFileChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Valores</label>
                                <textarea
                                    className="form-control"
                                    name="valores"
                                    value={form.valores || ''}
                                    onChange={handleChange}></textarea>
                            </div>
                        </div>

                    </div>
                    {
                        infoInst.length === 0 ?
                            (<button
                                type="submit"
                                className="btn btn-primary btn-sm mb-5">Salvar</button>
                            )
                            :
                            (<button
                                className="btn btn-primary btn-sm mb-5">Editar</button>
                            )
                    }
                </form>
            </div>
        </div>
    )
}