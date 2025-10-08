import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import styles from './cadastroPessoal.module.css'

import { InputMask } from 'primereact/inputmask'
import { LuDot } from "react-icons/lu";

export const UpdateCadastroPessoal = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        nome: '',
        rg: '',
        cpf: '',
        nis: '',
        data_nascimento: '',
        orientacao_sexual: '',
        telefone: '',
        estado_civil: '',
        nacionalidade: 'Brasileiro(a)',
        naturalidade: '',
        etnia: '',
        deficiencia: '',
        tipo_deficiencia: '',
        nome_pai: '',
        nome_mae: '',
        curso: '',
        periodo: '',
        instituicao: '',
        situacao_mercado_trabalho: '',
        renda: 0,
        beneficio_seguro_social: '',
        valor_beneficio_seguro_social: '',
        apoio_renda_primaria: '',
        possui_conjuge: false,
    })

    useEffect(()=>{

        const fetchApi = async () =>{
            try {
                const response = await fetch(`http://localhost:3000/dados_pessoais/${id}`,{
                    method: 'GET',
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                const data = await response.json()
                setForm(data)

            } catch (err) {
                console.error(err)
            }
        }

        fetchApi()

    },[id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formToSend = {...form}

        formToSend.renda = parseFloat(form.renda.replace(/\./g, '').replace(',','.')) || 0
        formToSend.valor_beneficio_seguro_social = parseFloat(form.valor_beneficio_seguro_social.replace(/\./g,'').replace(',','.')) || 0

        try {

            const response = await fetch(`http://localhost:3000/dados_pessoais/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formToSend)
            })
            
                navigate(`/dashboard/cadastros`,{state:{message:'Cadastro atualizado com sucesso!'}})
        } catch (err) {
            console.error('Erro ao salvar: ', err)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Dados Pessoais</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="nome" id="nome" className={`${styles['text-cadastro']} form-label`}>Nome<span className="text-danger"><LuDot /></span></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="rg" id="rg" className={`${styles['text-cadastro']} form-label`}>RG<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="rg"
                            name="rg"
                            value={form.rg}
                            onChange={handleChange} />
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="cpf" className={`${styles['text-cadastro']} form-label`}>CPF<span className="text-danger"><LuDot /></span></label>
                        <InputMask
                            required
                            type="text"
                            mask='999.999.999-99'
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChange} ></InputMask>
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="nis" className={`${styles['text-cadastro']} form-label`}>NIS<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="text"
                            pattern='\d{11}'
                            className="form-control"
                            id="nis"
                            name="nis"
                            value={form.nis}
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 col-12">
                        <label htmlFor="data_nascimento" className={`${styles['text-cadastro']} form-label`}>Data de Nascimento<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange} />
                    </div>

                    <div className="col-md-3 col-12">
                        <label htmlFor="orientacao_sexual" className={`${styles['text-cadastro']} form-label`}>Orientação Sexual<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            className="form-control"
                            name="orientacao_sexual"
                            id="orientacao_sexual"
                            value={form.orientacao_sexual}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Hétero">Hétero</option>
                            <option value="Gay">Gay</option>
                            <option value="Lésbica">Lésbica</option>
                            <option value="Bisexual">Bisexual</option>
                            <option value="Assexual">Assexual</option>
                            <option value="Pansexual">Pansexual</option>
                        </select>
                    </div>

                    <div className="col-md-3 col-12">
                        <label htmlFor="telefone" className={`${styles['text-cadastro']} form-label`}>Telefone<span className="text-danger"><LuDot /></span></label>
                        <InputMask
                            required
                            mask='(99) 99999-9999'
                            type="text"
                            className="form-control"
                            id="telefone"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange} ></InputMask>
                    </div>

                    <div className="col-md-3 col-12">
                        <label htmlFor="estado_civil" className={`${styles['text-cadastro']} form-label`}>Estado Civil<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            className="form-control"
                            name="estado_civil"
                            id="estado_civil"
                            value={form.estado_civil}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Casado">Casado(a)</option>
                            <option value="Solteiro">Solteiro(a)</option>
                            <option value="Divorciado">Divorciado(a)</option>
                            <option value="Viúvo">Viúvo(a)</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 col-12">
                        <label htmlFor="nacionalidade" className={`${styles['text-cadastro']} form-label`}>Nacionalidade<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="nacionalidade"
                            name="nacionalidade"
                            value={form.nacionalidade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="naturalidade" className={`${styles['text-cadastro']} form-label`}>Naturalidade<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="naturalidade"
                            name="naturalidade"
                            value={form.naturalidade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="etnia" className={`${styles['text-cadastro']} form-label`}>Etnia<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            className="form-control"
                            name="etnia"
                            id="etnia"
                            value={form.etnia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Branco">Branco(a)</option>
                            <option value="Preto">Preto(a)</option>
                            <option value="Pardo">Pardo(a)</option>
                            <option value="Indígena">Indígena</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="col-md-3 col-12">
                        <label htmlFor="deficiencia" className={`${styles['text-cadastro']} form-label`}>PCD<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            className="form-control"
                            name="deficiencia"
                            id="deficiencia"
                            value={form.deficiencia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Não">Não</option>
                            <option value="Sim">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <label htmlFor="tipo_deficiencia" className={`${styles['text-cadastro']} form-label`}>Tipo de Deficiência</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tipo_deficiencia"
                            name="tipo_deficiencia"
                            value={form.tipo_deficiencia}
                            onChange={handleChange} />
                    </div>

                    <div className="col-12 col-md-6">
                        <label htmlFor="renda" className={`${styles['text-cadastro']} form-label`}>Renda<span className="text-danger"><LuDot /></span></label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="renda"
                            name="renda"
                            value={form.renda}
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor=" nome_pai" className={`${styles['text-cadastro']} form-label`}>Nome do Pai</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome_pai"
                        name="nome_pai"
                        value={form.nome_pai}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nome_mae" className={`${styles['text-cadastro']} form-label`}>Nome da Mãe<span className="text-danger"><LuDot /></span></label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="nome_mae"
                        name="nome_mae"
                        value={form.nome_mae}
                        onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <label htmlFor="curso" className={`${styles['text-cadastro']} form-label`}>Curso</label>
                        <input
                            type="text"
                            className="form-control"
                            id="curso"
                            name="curso"
                            value={form.curso}
                            onChange={handleChange} />
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="periodo" className={`${styles['text-cadastro']} form-label`}>Período</label>
                        <input
                            type="text"
                            className="form-control"
                            id="periodo"
                            name="periodo"
                            value={form.periodo}
                            onChange={handleChange} />
                    </div>

                    <div className="col-12 col-md-4">
                        <label htmlFor="instituicao" className={`${styles['text-cadastro']} form-label`}>Instituição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="instituicao"
                            name="instituicao"
                            value={form.instituicao}
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-md-3">
                        <label htmlFor="situacao_mercado_trabalho" className={`${styles['text-cadastro']} form-label`}>Situação Trabalhista<span className="text-danger"><LuDot /></span>v</label>
                        <select
                            required
                            className="form-control"
                            name="situacao_mercado_trabalho"
                            id="situacao_mercado_trabalho"
                            value={form.situacao_mercado_trabalho}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Empregado">Empregado</option>
                            <option value="Desempregado">Desempregado</option>
                            <option value="Autônomo">Autônomo</option>
                            <option value="Subemprego">Subemprego</option>
                            <option value="Estudante">Estudante</option>
                            <option value="Estágio Remunerado">Estágio Remunerado</option>
                        </select>
                    </div>

                    <div className="col-6 col-md-3">
                        <label htmlFor="beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Benefício/Seguro Social<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            name="beneficio_seguro_social"
                            id="beneficio_seguro_social"
                            value={form.beneficio_seguro_social}
                            className="form-control"
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="Nenhum">Nenhum</option>
                            <option value="Licença Médica">Licença Médica</option>
                            <option value="Aposentadoria">Aposentadoria</option>
                            <option value="Pensão Alimentícia">Pensão Alimentícia</option>
                            <option value="Seguro Desemprego">Seguro Desemprego</option>
                            <option value="Bolsa Família">Bolsa Família</option>
                            <option value="BPC">BPC</option>
                        </select>
                    </div>

                    <div className="col-6 col-md-3">
                        <label htmlFor="valor_beneficio_seguro_social" className={`${styles['text-cadastro']} form-label`}>Valor do Benefício</label>
                        <input
                            type="text"
                            className="form-control"
                            id="valor_beneficio_seguro_social"
                            name="valor_beneficio_seguro_social"
                            value={form.valor_beneficio_seguro_social}
                            onChange={handleChange} />
                    </div>

                    <div className="col-6 col-md-3">
                        <label htmlFor="apoio_renda_primaria" className={`${styles['text-cadastro']} form-label`}>Apoio na Renda Familiar<span className="text-danger"><LuDot /></span></label>
                        <select
                            required
                            className="form-control"
                            name="apoio_renda_primaria"
                            id="apoio_renda_primaria"
                            value={form.apoio_renda_primaria}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Nenhum">Nenhum</option>
                            <option value="Parentes">Parentes</option>
                            <option value="Amigos">Amigos</option>
                            <option value="Vizinhos">Vizinhos</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                </div>

                <div className="mt-2 d-flex">
                    <label htmlFor="possui_conjuge" className={`${styles['text-cadastro']} form-label me-2`}>Possui Conjuge</label>
                    <input
                        type="checkbox"
                        name="possui_conjuge"
                        id="possui_conjuge"
                        checked={form.possui_conjuge}
                        onChange={handleChange} />
                </div>
                <input type="submit" value="Salvar" className={`${styles['text-cadastro']} btn btn-success mb-4 d-block w-100`} />
            </form>
        </div>
    )
}