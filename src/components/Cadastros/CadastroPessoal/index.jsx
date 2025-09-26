import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import styles from './cadastroPessoal.module.css'

export const CadastroPessoal = () => {

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
        nacionalidade: '',
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
        valor_beneficio_seguro_social: null,
        apoio_renda_primaria:'',
        possui_conjuge: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({
            ...form,
            [name]:type === 'checkbox'? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await fetch(`http://localhost:3000/dados_pessoais/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...form,
                })
            })
            const data = await response.json()
            
            if(data.possui_conjuge === true){
                navigate(`/dashboard/cadastro-conjuge/${data.id}`)
            }else{
                navigate(`/dashboard/cadastro-endereco/${data.id}`)
            }
        } catch (err) {
            console.error('Erro ao salvar: ', err)
        }
    }

    return (
        <div className={`ps-3 ${styles['scroll']}`}>
            <h2 className={`${styles['title-cadastro']}`}>Novo Cadastro de Beneficiário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome" id="nome">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-md-4 col-12">
                        <label htmlFor="" className="form-label">RG</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rg"
                            name="rg"
                            value={form.rg}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="nis" className="form-label">NIS</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nis"
                            name="nis"
                            value={form.nis}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="row"> 
                    <div className="col-md-3 col-12">
                        <label htmlFor="data_nascimento" className="form-label">Data de Nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="data_nascimento"
                            name="data_nascimento"
                            value={form.data_nascimento}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="orientacao_sexual" className="form-label">Orientação Sexual</label>
                        <select
                            className="form-control"
                            name="orientacao_sexual"
                            id="orientacao_sexual"
                            value={form.orientacao_sexual}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="hetero">Hétero</option>
                            <option value="gay">Gay</option>
                            <option value="lesbica">Lésbica</option>
                            <option value="bissexual">Bisexual</option>
                            <option value="assexual">Assexual</option>
                            <option value="pansexual">Pansexual</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefone"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                    <label htmlFor="estado_civil" className="form-label">Estado Civil</label>
                    <select
                        className="form-control"
                        name="estado_civil"
                        id="estado_civil"
                        value={form.estado_civil}
                        onChange={handleChange}>
                        <option value="">Selecione</option>
                        <option value="casado">Casado(a)</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viuvo">Viúvo(a)</option>
                    </select>
                </div>
                </div>
                
                <div className="row">
                    <div className="col-md-3 col-12">
                        <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nacionalidade"
                            name="nacionalidade"
                            value={form.nacionalidade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="naturalidade" className="form-label">Naturalidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="naturalidade"
                            name="naturalidade"
                            value={form.naturalidade}
                            onChange={handleChange} />
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="etnia" className="form-label">Etnia</label>
                        <select
                            className="form-control"
                            name="etnia"
                            id="etnia"
                            value={form.etnia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="branco">Branco(a)</option>
                            <option value="preto">Preto(a)</option>
                            <option value="pardo">Pardo(a)</option>
                            <option value="indigena">Indígena</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-12">
                        <label htmlFor="deficiencia" className="form-label">PCD</label>
                        <select
                            className="form-control"
                            name="deficiencia"
                            id="deficiencia"
                            value={form.deficiencia}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nao">Não</option>
                            <option value="sim">Sim</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label htmlFor="tipo_deficiencia" className="form-label">Tipo de Deficiência</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tipo_deficiencia"
                            name="tipo_deficiencia"
                            value={form.tipo_deficiencia}
                            onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="renda" className="form-label">Renda</label>
                        <input
                            type="number"
                            className="form-control"
                            id="renda"
                            name="renda"
                            value={form.renda}
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor=" nome_pai" className="form-label">Nome do Pai</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome_pai"
                        name="nome_pai"
                        value={form.nome_pai}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nome_mae" className="form-label">Nome da Mãe</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome_mae"
                        name="nome_mae"
                        value={form.nome_mae}
                        onChange={handleChange} />
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <label htmlFor="curso" className="form-label">Curso</label>
                        <input
                            type="text"
                            className="form-control"
                            id="curso"
                            name="curso"
                            value={form.curso}
                            onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-4">
                        <label htmlFor="periodo" className="form-label">Período</label>
                        <input
                            type="text"
                            className="form-control"
                            id="periodo"
                            name="periodo"
                            value={form.periodo}
                            onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-4">
                        <label htmlFor="instituicao" className="form-label">Instituição</label>
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
                        <label htmlFor="situacao_mercado_trabalho" className="form-label">Situação Trabalhista</label>
                        <select
                            className="form-control"
                            name="situacao_mercado_trabalho"
                            id="situacao_mercado_trabalho"
                            value={form.situacao_mercado_trabalho}
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="empregado">Empregado</option>
                            <option value="desempregado">Desempregado</option>
                            <option value="autonomo">Autônomo</option>
                            <option value="subemprego">Subemprego</option>
                            <option value="estudante">Estudante</option>
                            <option value="estagio_remunerado">Estágio Remunerado</option>
                        </select>
                    </div>
                    
                    <div className="col-6 col-md-3">
                        <label htmlFor="beneficio_seguro_social" className="form-label">Benefício/Seguro Social</label>
                        <select
                            name="beneficio_seguro_social"
                            id="beneficio_seguro_social"
                            value={form.beneficio_seguro_social}
                            className="form-control"
                            onChange={handleChange}>
                            <option value="">Selecione</option>
                            <option value="nenhum">Nenhum</option>
                            <option value="licenca_medica">Licença Médica</option>
                            <option value="aposentadoria">Aposentadoria</option>
                            <option value="pensao_alimenticia">Pensão Alimentícia</option>
                            <option value="seguro_desemprego">Seguro Desemprego</option>
                            <option value="bolsa_familia">Bolsa Família</option>
                            <option value="bpc">BPC</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-3">
                        <label htmlFor="valor_beneficio_seguro_social" className="form-label">Valor do Benefício</label>
                        <input
                            type="number"
                            className="form-control"
                            id="valor_beneficio_seguro_social"
                            name="valor_beneficio_seguro_social"
                            value={form.valor_beneficio_seguro_social}
                            onChange={handleChange} />
                    </div>
                    <div className="col-6 col-md-3">
                        <label htmlFor="apoio_renda_primaria" className="form-label">Poio na Renda Familiar</label>
                        <select
                            className="form-control"
                            name="apoio_renda_primaria"
                            id="apoio_renda_primaria"
                            value={form.apoio_renda_primaria}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="nenhum">Nenhum</option>
                            <option value="parentes">Parentes</option>
                            <option value="amigos">Amigos</option>
                            <option value="vizinhos">Vizinhos</option>
                            <option value="outros">Outros</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 d-flex">
                    <label htmlFor="possui_conjuge" className="form-label me-2">Possui Conjuge</label>
                    <input 
                    type="checkbox" 
                    name="possui_conjuge" 
                    id="possui_conjuge"
                    checked={form.possui_conjuge}
                    onChange={handleChange} />
                </div>
                <input type="submit" value="Salvar" className="btn btn-success mb-4 d-block w-100" />
            </form>
        </div>
    )
}